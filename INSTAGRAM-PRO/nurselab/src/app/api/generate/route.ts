import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { model, topic, type, tone, business, slidesCount = 7, apiKeys } = body

    const keys = apiKeys || {}

    const systemPrompt = `Você é um especialista em marketing de conteúdo para ${business?.name || 'enfermagemcom.ia'}.
Nicho: ${business?.niche || 'Enfermagem + IA'}. Público: ${business?.audience || 'Enfermeiros'}. Tom: ${tone}.
Palavras-chave: ${(business?.keywords || []).join(', ')}.
Responda APENAS com JSON válido, sem markdown, sem explicações extras.`

    const userPrompt = type === 'carrossel'
      ? `Crie um carrossel Instagram de ${slidesCount} slides sobre: "${topic}".
Responda com este JSON exato:
{"slides":[{"id":"1","heading":"título impactante máx 8 palavras","body":"texto do slide máx 120 chars","imagePrompt":"cena visual para imagem: ambiente clínico, cores #FF5404 e #071925"}],"hashtags":["#tag1","#tag2","#tag3","#tag4","#tag5","#tag6","#tag7","#tag8","#tag9","#tag10"]}`
      : type === 'thread'
      ? `Crie uma thread Twitter de 8 tweets sobre: "${topic}". Cada tweet máx 280 chars.
JSON: {"body":"tweet1\\n---\\ntweet2\\n---\\ntweet3\\n---\\ntweet4\\n---\\ntweet5\\n---\\ntweet6\\n---\\ntweet7\\n---\\ntweet8","hashtags":["#tag1","#tag2","#tag3"]}`
      : `Crie um ${type} Instagram sobre: "${topic}". Texto envolvente, tom ${tone}.
JSON: {"body":"texto completo do post com quebras de linha \\n para parágrafos","hashtags":["#tag1","#tag2","#tag3","#tag4","#tag5"]}`

    let text = ''

    // Claude (Anthropic)
    if (model.startsWith('claude')) {
      const key = keys.anthropic || process.env.ANTHROPIC_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Anthropic não configurada. Vá em APIs & Configurações.' }, { status: 400 })

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Anthropic erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      text = data.content?.[0]?.text || ''
    }

    // Gemini
    else if (model.startsWith('gemini')) {
      const key = keys.gemini || process.env.GEMINI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Gemini não configurada. Vá em APIs & Configurações.' }, { status: 400 })

      const modelId = model === 'gemini-1.5-pro' ? 'gemini-1.5-pro' : 'gemini-1.5-flash'
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 2000 },
          }),
        }
      )

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Gemini erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    }

    // OpenAI (GPT-4o, GPT-4 Turbo, GPT-3.5)
    else if (model.startsWith('openai')) {
      const key = keys.openai || process.env.OPENAI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave OpenAI não configurada. Vá em APIs & Configurações.' }, { status: 400 })

      let openaiModel = model.replace('openai-', '')
      if (model === 'openai-gpt-4-turbo') openaiModel = 'gpt-4-turbo-preview'
      if (model === 'openai-gpt-3.5-turbo') openaiModel = 'gpt-3.5-turbo'

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: openaiModel,
          max_tokens: 2000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `OpenAI erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      text = data.choices?.[0]?.message?.content || ''
    }

    // DeepSeek (openai-compatible)
    else if (model.startsWith('deepseek')) {
      const key = keys.deepseek || process.env.DEEPSEEK_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave DeepSeek não configurada.' }, { status: 400 })

      const dsModel = 'deepseek-chat' // both v3 and chat use same endpoint

      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: dsModel,
          max_tokens: 2000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `DeepSeek erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      text = data.choices?.[0]?.message?.content || ''
    }

    // Groq (openai-compatible)
    else if (model.startsWith('groq')) {
      const key = keys.groq || process.env.GROQ_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Groq não configurada.' }, { status: 400 })

      let groqModel: string
      switch (model) {
        case 'groq-llama3-70b': groqModel = 'llama3-70b-8192'; break
        case 'groq-llama3-8b': groqModel = 'llama3-8b-8192'; break
        case 'groq-mixtral': groqModel = 'mixtral-8x7b-32768'; break
        default: groqModel = model.replace('groq-', '')
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: groqModel,
          max_tokens: 2000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Groq erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      text = data.choices?.[0]?.message?.content || ''
    }

    // Together AI (openai-compatible)
    else if (model.startsWith('together')) {
      const key = keys.together || process.env.TOGETHER_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Together AI não configurada.' }, { status: 400 })

      let togetherModel: string
      switch (model) {
        case 'together-mixtral': togetherModel = 'mistralai/Mixtral-8x7B-Instruct-v0.1'; break
        case 'together-llama3-70b': togetherModel = 'meta-llama/Llama-3-70b-chat-hf'; break
        default: togetherModel = model.replace('together-', '')
      }

      const res = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: togetherModel,
          max_tokens: 2000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Together AI erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      text = data.choices?.[0]?.message?.content || ''
    }

    // HuggingFace Inference API
    else if (model.startsWith('huggingface')) {
      const key = keys.huggingface || process.env.HUGGINGFACE_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave HuggingFace não configurada.' }, { status: 400 })

      let hfModelId: string
      switch (model) {
        case 'huggingface-mistral':
          hfModelId = 'mistralai/Mixtral-8x7B-Instruct-v0.1'
          break
        case 'huggingface-llama3':
          hfModelId = 'meta-llama/Llama-3-70b-chat-hf'
          break
        default:
          hfModelId = model.replace('huggingface-', '')
      }

      const payload = {
        inputs: systemPrompt + '\n\n' + userPrompt,
        parameters: { max_new_tokens: 2000, temperature: 0.8, return_full_text: false }
      }

      const res = await fetch(
        `https://api-inference.huggingface.co/models/${encodeURIComponent(hfModelId)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `HuggingFace erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      if (Array.isArray(data) && data[0]?.generated_text) {
        text = data[0].generated_text
      } else if (data.generated_text) {
        text = data.generated_text
      } else {
        text = ''
      }
    }

    else {
      return NextResponse.json({ error: `Modelo "${model}" não suportado ainda.` }, { status: 400 })
    }

    // Parse JSON from response
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try {
      const parsed = JSON.parse(clean)
      return NextResponse.json(parsed)
    } catch {
      // Try to extract JSON from text
      const match = clean.match(/\{[\s\S]*\}/)
      if (match) {
        try {
          return NextResponse.json(JSON.parse(match[0]))
        } catch {}
      }
      return NextResponse.json({ error: 'Erro ao processar resposta da IA. Tente novamente.', raw: text }, { status: 500 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erro interno' }, { status: 500 })
  }
}
