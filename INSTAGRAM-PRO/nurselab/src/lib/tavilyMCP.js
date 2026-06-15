/**
 * Tavily MCP Client
 * A robust Model Context Protocol client for Tavily with HTTP transport
 * support, retry logic, and fallback mechanisms.
 * 
 * Compatible with Node.js, Next.js (API routes), and browser environments.
 */

const TAVILY_API_BASE = 'https://api.tavily.com';

// Custom error classes for better error handling
class TavilyAPIError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = 'TavilyAPIError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

class TavilyTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TavilyTimeoutError';
  }
}

// Utility: wait for a specified number of milliseconds
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Allowed HTTP methods for the fetch call
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

/**
 * TavilyMCPClient
 * Handles communication with the Tavily API over HTTP.
 * Includes configurable retries, exponential backoff, timeout handling, and per-request fallback mechanisms.
 * 
 * ## Usage Example:
 * ```js
 * const { TavilyMCPClient } = require('./tavilyMCP');
 * 
 * const client = new TavilyMCPClient({
 *   apiKey: process.env.TAVILY_API_KEY,
 *   maxRetries: 3,
 *   timeout: 30000,
 * });
 * 
 * // Search
 * const results = await client.search({
 *   query: 'enfermagem Brasil regulamentação',
 *   searchDepth: 'advanced',
 *   maxResults: 10,
 * });
 * 
 * // Analyze
 * const analysis = await client.analyze({
 *   query: 'impacto da inteligência artificial na enfermagem brasileira',
 * });
 * 
 * // Extract
 * const extraction = await client.extract({
 *   urls: ['https://example.com/article'],
 * });
 * ```
 */
class TavilyMCPClient {
  /**
   * @param {Object} options - Configuration options.
   * @param {string} options.apiKey - The Tavily API key (required).
   * @param {string} [options.baseURL] - Optional base URL for the Tavily API (defaults to TAVILY_API_BASE).
   * @param {number} [options.timeout] - Timeout in milliseconds for each request (default: 30000).
   * @param {number} [options.maxRetries] - Maximum number of retry attempts for transient errors (default: 3).
   * @param {Object} [options.defaultHeaders] - Additional default headers to include in every request.
   * @param {string} [options.transport] - Transport type ('http' or 'stdio') — currently only 'http' is fully supported.
   */
  constructor({ apiKey, baseURL, timeout = 30000, maxRetries = 3, defaultHeaders = {}, transport = 'http' }) {
    if (!apiKey) {
      throw new Error('Tavily API key is required. Get one at https://app.tavily.com');
    }
    this.apiKey = apiKey;
    this.baseURL = baseURL || TAVILY_API_BASE;
    this.timeout = timeout;
    this.maxRetries = maxRetries;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'NurseLab-TavilyMCP/1.0',
      ...defaultHeaders,
    };
    this.transport = transport;
  }

  // ============================================================
  // Internal helpers
  // ============================================================

  /**
   * Performs a fetch with AbortController timeout support.
   * @param {string} url - The full URL to fetch.
   * @param {Object} options - Options to pass to fetch.
   * @returns {Promise<Response>}
   */
  async _fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new TavilyTimeoutError(`Request timed out after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Handles HTTP response and maps non-OK status codes to typed errors.
   * @param {Response} response - The fetch Response object.
   * @returns {Promise<Object|Array|null>} - Parsed response body.
   */
  async _handleResponse(response) {
    if (!response.ok) {
      let errorBody = {};
      const contentType = response.headers.get('content-type') || '';
      
      try {
        if (contentType.includes('application/json')) {
          errorBody = await response.json();
        } else {
          errorBody = { detail: await response.text() || response.statusText };
        }
      } catch {
        errorBody = { detail: `HTTP ${response.status}: ${response.statusText}` };
      }

      const message = errorBody.detail || errorBody.error || errorBody.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new TavilyAPIError(message, response.status, errorBody.code);
    }

    // Handle empty or no-content responses gracefully
    if (response.status === 204) {
      return null;
    }

    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  /**
   * Determines if an error is worth retrying.
   * @param {Error} error 
   * @returns {boolean}
   */
  _isRetryableError(error) {
    if (error instanceof TavilyTimeoutError) return true;
    if (error instanceof TavilyAPIError && (error.statusCode === 429 || error.statusCode >= 500)) return true;
    if (error.message && /(ETIMEDOUT|ECONNREFUSED|ECONNRESET|ENOTFOUND|EAI_AGAIN|socket hang up|network error)/i.test(error.message)) {
      return true;
    }
    return false;
  }

  /**
   * Core request method with exponential backoff and optional fallback.
   * @param {string} endpoint - API endpoint (e.g., '/search').
   * @param {Object} [options={}] - fetch options (method, body, headers).
   * @param {number} [attempt=0] - Current retry attempt (internal).
   * @param {Object|null} [fallback=null] - Optional fallback configuration { handler: Function }.
   * @returns {Promise<any>}
   */
  async _request(endpoint, options = {}, attempt = 0, fallback = null) {
    const url = `${this.baseURL}${endpoint}`;
    const { method = 'GET', body, headers = {} } = options;

    if (!ALLOWED_METHODS.includes(method.toUpperCase())) {
      throw new Error(`Invalid HTTP method: ${method}. Allowed: ${ALLOWED_METHODS.join(', ')}`);
    }

    const fetchOptions = {
      method: method.toUpperCase(),
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await this._fetchWithTimeout(url, fetchOptions);
      return await this._handleResponse(response);
    } catch (error) {
      const isRetryable = this._isRetryableError(error);

      if (isRetryable && attempt < this.maxRetries) {
        // Exponential backoff: 1s, 2s, 4s... + jitter (max 30s)
        const baseDelay = Math.pow(2, attempt) * 1000;
        const jitter = Math.random() * 1000;
        const backoffMs = Math.min(baseDelay + jitter, 30000);

        console.warn(
          `[TavilyMCP] Retry ${attempt + 1}/${this.maxRetries} for ${method.toUpperCase()} ${endpoint} in ${backoffMs.toFixed(0)}ms: ${error.message}`
        );

        await delay(backoffMs);
        return this._request(endpoint, options, attempt + 1, fallback);
      }

      // Final attempt: execute fallback if provided
      if (fallback && typeof fallback.handler === 'function' && attempt >= this.maxRetries) {
        console.warn('[TavilyMCP] Primary request exhausted retries. Executing fallback.');
        return fallback.handler();
      }

      throw error;
    }
  }

  // ============================================================
  // Public API Methods
  // ============================================================

  /**
   * Performs a web search using the Tavily API.
   * 
   * @param {Object} params - Search parameters.
   * @param {string} params.query - The search query (required).
   * @param {'basic'|'advanced'} [params.searchDepth='basic'] - Depth of the search.
   * @param {boolean} [params.includeAnswer=false] - Include an LLM-generated answer.
   * @param {string} [params.includeAnswer] - Force answer generation with 'basic'/'advanced'.
   * @param {boolean} [params.includeImages=false] - Include image results.
   * @param {boolean} [params.includeRawContent=false] - Include raw content from pages.
   * @param {number} [params.maxResults=5] - Maximum number of search results.
   * @param {string[]} [params.includeDomains=[]] - Restrict to these domains.
   * @param {string[]} [params.excludeDomains=[]] - Exclude these domains.
   * @param {Object} [params.fallback] - Optional fallback { handler: async () => result }.
   * @returns {Promise<Object>} Search results from Tavily.
   */
  async search({
    query,
    searchDepth = 'basic',
    includeAnswer = false,
    includeImages = false,
    includeRawContent = false,
    maxResults = 5,
    includeDomains = [],
    excludeDomains = [],
    fallback = null,
  }) {
    if (!query || typeof query !== 'string') {
      throw new Error('A valid search query string is required.');
    }

    const body = {
      api_key: this.apiKey,
      query: query.trim(),
      search_depth: searchDepth,
      include_answer: includeAnswer,
      include_images: includeImages,
      include_raw_content: includeRawContent,
      max_results: Math.min(Math.max(1, maxResults), 20),
      ...(includeDomains.length > 0 && { include_domains: includeDomains }),
      ...(excludeDomains.length > 0 && { exclude_domains: excludeDomains }),
    };

    return this._request('/search', { method: 'POST', body }, 0, fallback);
  }

  /**
   * Performs an advanced analysis by searching and optionally extracting content,
   * then synthesizing a structured result.
   * 
   * @param {Object} params - Analysis parameters.
   * @param {string} params.query - The analysis query (required).
   * @param {number} [params.maxResults=3] - Number of sources to base the analysis on.
   * @param {boolean} [params.extractDetails=true] - Whether to extract raw content from sources.
   * @param {Object} [params.fallback] - Optional fallback configuration.
   * @returns {Promise<Object>} Structured analysis with sources and optional extractions.
   */
  async analyze({
    query,
    maxResults = 3,
    extractDetails = true,
    fallback = null,
  }) {
    if (!query || typeof query !== 'string') {
      throw new Error('Analysis query is required.');
    }

    // Step 1: Deep search for context
    const searchResults = await this.search({
      query,
      searchDepth: 'advanced',
      includeAnswer: true,
      maxResults: Math.min(Math.max(1, maxResults), 10),
    });

    // Step 2: Extract detailed content from top result URLs
    const urls = (searchResults.results || [])
      .map(r => r.url)
      .filter(url => typeof url === 'string' && url.startsWith('http'));

    let extractionResults = null;
    if (extractDetails && urls.length > 0) {
      try {
        extractionResults = await this.extract({
          urls: urls.slice(0, 20),
        });
      } catch (extractError) {
        console.warn('[TavilyMCP] Extraction step failed during analysis, returning search results only.');
      }
    }

    return {
      query,
      answer: searchResults.answer || null,
      analysis: searchResults.answer || 'No summary available.',
      sources: searchResults.results || [],
      extractions: extractionResults,
      extractedUrls: urls,
    };
  }

  /**
   * Extracts raw content from a list of URLs using Tavily's extraction API.
   * 
   * @param {Object} params - Extraction parameters.
   * @param {string[]} params.urls - Array of URLs to extract content from.
   * @param {number} [params.maxUrls=20] - Maximum URLs to extract (Tavily limit ~20).
   * @param {Object} [params.fallback] - Optional fallback configuration.
   * @returns {Promise<Object>} Extraction results with raw content.
   */
  async extract({
    urls,
    maxUrls = 20,
    fallback = null,
  }) {
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      throw new Error('A non-empty array of URLs is required for extraction.');
    }

    if (urls.length > maxUrls) {
      console.warn(`[TavilyMCP] Truncating URLs from ${urls.length} to ${maxUrls}.`);
      urls = urls.slice(0, maxUrls);
    }

    const body = {
      api_key: this.apiKey,
      urls: urls.filter(url => typeof url === 'string' && url.startsWith('http')),
    };

    if (body.urls.length === 0) {
      throw new Error('All provided URLs are invalid. Must be valid http/https strings.');
    }

    return this._request('/extract', { method: 'POST', body }, 0, fallback);
  }
}

// ============================================================
// Module Exports
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TavilyMCPClient, TavilyAPIError, TavilyTimeoutError };
}

if (typeof window !== 'undefined') {
  window.TavilyMCPClient = TavilyMCPClient;
  window.TavilyAPIError = TavilyAPIError;
  window.TavilyTimeoutError = TavilyTimeoutError;
}
