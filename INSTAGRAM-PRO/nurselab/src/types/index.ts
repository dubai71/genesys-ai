export type PostStatus = 'Publicado' | 'Agendado' | 'Rascunho' | 'Backlog'
export type PostType = 'Carrossel' | 'Reel' | 'Story' | 'Post único' | 'Vídeo'
export type PostImage = 'none' | 'freepik' | 'ai'
export type ContentTone = 'profissional' | 'informal' | 'divertido' | 'educativo' | 'inspirador'
export type ContentType = 'carrossel' | 'post' | 'story' | 'reel' | 'thread' | 'video'
export type TextModel =
  // Existing
  | 'claude-sonnet-4-5' | 'claude-opus-4-5'
  | 'gemini-1.5-flash' | 'gemini-1.5-pro'
  // New providers
  | 'openai-gpt-4o' | 'openai-gpt-4-turbo' | 'openai-gpt-3.5-turbo'
  | 'deepseek-v3' | 'deepseek-chat'
  | 'groq-llama3-70b' | 'groq-llama3-8b' | 'groq-mixtral'
  | 'together-mixtral' | 'together-llama3-70b'
  | 'huggingface-mistral' | 'huggingface-llama3'

export type ImageModel =
  // Existing
  | 'fal-flux' | 'fal-sdxl' | 'fal-flux-pro'
  | 'gemini-imagen' // placeholder presente na UI
  // New providers
  | 'openai-dall-e-3' | 'openai-dall-e-2'
  | 'replicate-sd3' | 'replicate-flux-dev' | 'replicate-flux-schnell'
  | 'stability-sdxl-turbo' | 'stability-sd-xl'
  | 'gemini-imagen-2'
  | 'huggingface-stable-diffusion'
  | 'ideogram' | 'ideogram-v2'
  | 'leonardo-xl' | 'leonardo-flux'

export type VideoModel =
  // Existing
  | 'seedance-v1' | 'seedance-v1-lite' | 'higgsfield-seedance' | 'fal-minimax'
  // New providers
  | 'replicate-svd' | 'replicate-zeroscope'
  | 'pika' | 'pika-v2'
  | 'runway-gen-3' | 'runway-gen-2'
  | 'kling' | 'haiper' | 'luma-dream-machine'
  | 'huggingface-zero-shot'

export interface Post {
  id: string
  title: string
  caption: string
  type: PostType
  status: PostStatus
  date: string
  img: PostImage
  profileId?: string
  created_at?: string
}

export interface Competitor {
  id: string; handle: string; seg: string; eng: string
  freq: number; trend: string; nicho: string; cor: string; created_at?: string
}

// Viral content tracking for competitors
export type ViralFormat = 'carousel' | 'reel' | 'post' | 'story'

export interface ViralPost {
  id: string
  competitorId?: string
  competitorHandle?: string
  title: string
  format: ViralFormat
  // Engagement metrics
  likes?: number
  comments?: number
  saves?: number
  reach?: number
  // Metadata
  date: string
  url?: string
  notes?: string
  createdAt: string
}

export interface Slide {
  id: string; heading: string; body: string; imagePrompt?: string; imageUrl?: string
}

export interface GeneratedContent {
  id: string; type: ContentType; title: string; topic: string; tone: ContentTone
  platform: string; slides?: Slide[]; body?: string; hashtags?: string[]
  videoUrl?: string; textModel: TextModel; imageModel?: ImageModel; videoModel?: VideoModel
  templateId?: string; profileId?: string; createdAt: string
  status: 'draft' | 'approved' | 'scheduled' | 'published'
}

export interface Profile {
  id: string
  name: string
  handle: string
  description: string
  niche: string
  audience: string
  tone: ContentTone
  keywords: string[]
  brandColors: string[]
  fontDisplay: string
  fontBody: string
  socialNetworks: string[]
  competitors: string[]
  avatar?: string
  isDefault: boolean
  createdAt: string
}

export interface BrandTemplate {
  id: string; name: string; thumbnail: string; originalUrl?: string
  colors: string[]; primaryColor: string; secondaryColor: string
  accentColor: string; darkColor: string; lightColor: string
  fontDisplay: string; fontBody: string
  style: 'editorial' | 'bold' | 'minimal' | 'warm' | 'tech' | 'medical'
  tone: ContentTone; notes: string; profileId?: string; createdAt: string
}

export interface BusinessProfile {
  name: string; description: string; niche: string; audience: string
  tone: ContentTone; keywords: string[]; brandColors: string[]
  socialNetworks: string[]; competitors: string[]; instagramHandle: string
}

export interface ApiKeys {
  // Search & Research
  tavily?: string
  perplexity?: string
  perplexicaUrl?: string

  // Text AI
  anthropic?: string
  gemini?: string
  openai?: string
  deepseek?: string
  groq?: string
  together?: string
  huggingface?: string

  // Image AI
  falai?: string
  freepik?: string
  replicate?: string
  stability?: string
  ideogram?: string
  leonardo?: string

  // Video AI
  higgsfield?: string
  segmind?: string
  pika?: string
  runway?: string
  kling?: string
  haiper?: string
  luma?: string

  // Stock Media & Utilities
  unsplash?: string
  pexels?: string
  removebg?: string
  pixelcut?: string

  // Supabase
  supabaseUrl?: string
  supabaseKey?: string
}

export interface AppConfig {
  apiKeys: ApiKeys; textModel: TextModel; imageModel: ImageModel
  videoModel: VideoModel; theme: 'dark' | 'light'; activeProfileId: string
}

export interface ScheduledDay {
  date: string; contentId?: string; contentType?: ContentType
  topic?: string; status: 'empty' | 'planned' | 'published'; profileId?: string
}

export interface VideoGeneration {
  id: string
  prompt: string
  model: VideoModel
  duration: number
  aspectRatio: string
  jobId?: string
  status: 'pending' | 'processing' | 'done' | 'error'
  videoUrl?: string
  imageUrl?: string
  error?: string
  profileId?: string
  createdAt: string
}

export type CreativeType = 'image' | 'video'
export type CreativeSaveMode = 'creative' | 'template'

export interface Creative {
  id: string
  type: CreativeType
  url: string
  thumbnail?: string
  prompt: string
  model: string
  aspectRatio?: string
  resolution?: string
  duration?: number
  name: string
  tags: string[]
  profileId?: string
  sourceType?: 't2i' | 'i2i' | 't2v' | 'i2v'
  savedAs: CreativeSaveMode
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface VideoGeneration {
  id: string
  prompt: string
  model: VideoModel
  duration: number
  aspectRatio: string
  jobId?: string
  status: 'pending' | 'processing' | 'done' | 'error'
  videoUrl?: string
  imageUrl?: string
  error?: string
  profileId?: string
  createdAt: string
}

// ─── DNA STUDIO TYPES ─────────────────────────────────────────────────────────────────

export type DNAStylePreset = 
  | 'twitter-vibe' 
  | 'windows-editorial' 
  | 'minimal-health' 
  | 'bold-medical' 
  | 'tech-dark' 
  | 'warm-editorial'
  | 'viral-carousel'
  | 'thread-style'
  | 'custom'

export type ArtifactType = 
  | 'social-post' 
  | 'carousel' 
  | 'landing-page' 
  | 'ui-component' 
  | 'brand-identity'
  | 'pitch-deck'
  | 'email-marketing'
  | 'ad-creative'
  | 'other'

export type ReconstructionGranularity = 'pixel-perfect' | 'medium' | 'low'
export type BrandApplication = 'raw-extraction' | 'brand-adaptation'

export interface DNATextElement {
  id: string
  type: 'text' | 'shape' | 'icon' | 'image'
  styleRef?: string
  content: string
  maxChars?: number
  role: string
}

export interface DNAColor {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  role: 'primary' | 'secondary' | 'accent' | 'surface' | 'neutral' | 'functional'
  isGradient?: boolean
  gradientStops?: { position: number; hex: string }[]
}

export interface DNATypography {
  family: string
  weights: number[]
  role: 'display' | 'body' | 'mono' | 'accent'
}

export interface DNATextStyle {
  id: string
  family: string
  weight: number
  sizePx: number
  lineHeight: number
  letterSpacingEm: number
  transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  color: string
  align: 'start' | 'center' | 'end'
}

export interface DNALayoutBlock {
  id: string
  type: 'container' | 'text' | 'shape' | 'asset'
  position: { x: number; y: number; w: number; h: number }
  padding: [number, number, number, number]
  alignment: 'start' | 'center' | 'end' | 'stretch'
  children: string[]
}

export interface DNAVisualEffect {
  type: 'shadow' | 'blur' | 'glow' | 'opacity' | 'blend-mode'
  params: Record<string, number | string>
}

export interface VisualDNA {
  id: string
  name: string
  thumbnail?: string
  sourceImage?: string // base64 original image
  version: string
  extractedFrom: string
  artifactType: ArtifactType
  reconstructionTarget: 'chatgpt_image_2'

  // 10-layer analysis
  canvas: {
    width: number
    height: number
    aspectRatio: string
    background: { type: 'solid' | 'gradient' | 'image'; value: string }
    grid: { columns: number; gutter: number; margin: number }
  }
  colorSystem: {
    primary: DNAColor
    secondary: DNAColor[]
    neutrals: DNAColor[]
    gradients: { hex: string; stops: { position: number; hex: string }[] }[]
  }
  typography: {
    fontStack: DNATypography[]
    textStyles: DNATextStyle[]
  }
  layout: {
    structure: 'flex' | 'grid' | 'absolute'
    blocks: DNALayoutBlock[]
  }
  elements: DNATextElement[]
  effects: {
    shadows: DNAVisualEffect[]
    blurs: DNAVisualEffect[]
    glows: DNAVisualEffect[]
  }
  artDirection: {
    styleTags: string[]
    mood: string
    era: string
    confidence: 'high' | 'medium' | 'low'
  }
  reconstructionRules: {
    fixedElements: string[]
    constraints: string[]
  }
  chatgptImagePrompt: string
  profileId?: string
  createdAt: string
}

export interface PromptVariable {
  id: string
  name: string
  label: string
  type: 'text' | 'select' | 'color' | 'number'
  defaultValue?: string
  options?: string[] // for select type
  required: boolean
}

export interface PromptTemplate {
  id: string
  name: string
  description: string
  category: 'carrossel' | 'post' | 'ads' | 'tweet' | 'story' | 'reel' | 'thread' | 'generic'
  stylePreset: DNAStylePreset

  // Prompt structure
  promptTemplate: string // with {{variable}} placeholders
  systemPrompt?: string // extra instructions for the model

  // ── Multi-prompt support ──
  // Pre-defined prompts array (each item = one slide/step)
  // When set, overrides promptTemplate in bulk generation
  prompts?: string[] // array of fully-written prompts (no variables needed)

  // Visual DNA association
  visualDNAId?: string
  overrideDNAPrompt?: string

  // Variables definition
  variables: PromptVariable[]

  // Generation settings
  defaultModel: string
  defaultAspectRatio: string
  defaultSlideCount: number // for carousel templates

  // Metadata
  tags: string[]
  useCount: number
  profileId?: string
  createdAt: string
  updatedAt: string
}

export interface AutoGenerateRequest {
  source: 'news' | 'competitor' | 'creative' | 'manual'
  topic?: string
  templateId: string
  count: number
  modelId: string
  aspectRatio: string
  profileId?: string
}

export interface AutoGeneratedCreative {
  id: string
  requestId: string
  topic: string
  generatedPrompt: string
  visualDNA?: VisualDNA
  templateId: string
  status: 'pending' | 'generating' | 'done' | 'error'
  imageUrl?: string
  thumbnailUrl?: string
  error?: string
  createdAt: string
}
