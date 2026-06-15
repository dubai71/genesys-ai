import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType, apiKeys } = await req.json()
    const key = apiKeys?.anthropic || process.env.ANTHROPIC_API_KEY

    if (!key) {
      return NextResponse.json(
        { error: 'Chave Anthropic necessária para análise de template.' },
        { status: 400 }
      )
    }

    if (!imageBase64) {
      return NextResponse.json({ error: 'Imagem não fornecida.' }, { status: 400 })
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType || 'image/jpeg',
                  data: imageBase64,
                },
              },
              {
                type: 'text',
                text: `Analise esta imagem/template de design e extraia o sistema de identidade visual completo.

Retorne APENAS JSON válido, sem markdown:
{
  "name": "nome sugerido para o template",
  "style": "dark|light|gradient|minimal|bold",
  "mood": "profissional|criativo|elegante|energético|minimalista|educativo",
  "colors": {
    "primary": "#hex — cor principal/destaque",
    "background": "#hex — cor de fundo principal",
    "secondary": "#hex — cor secundária",
    "text": "#hex — cor do texto principal",
    "accent": "#hex — cor de acento/chamada"
  },
  "typography": {
    "heading": "nome da fonte ou categoria (serif/sans-serif/display)",
    "body": "nome da fonte ou categoria",
    "style": "bold|light|mixed|uppercase|italic"
  },
  "layout": {
    "type": "bottom-aligned|top-aligned|centered|split|full-bleed",
    "spacing": "compact|balanced|airy",
    "hasBackgroundDecor": true/false
  },
  "tags": ["tag1", "tag2", "tag3"],
  "description": "descrição concisa do estilo em 1 frase"
}`,
              },
            ],
          },
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json(
        { error: `Erro Claude Vision ${res.status}: ${err}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    const text = data.content?.[0]?.text || ''
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    try {
      const parsed = JSON.parse(clean)
      return NextResponse.json(parsed)
    } catch {
      const match = clean.match(/\{[\s\S]*\}/)
      if (match) {
        try { return NextResponse.json(JSON.parse(match[0])) } catch {}
      }
      return NextResponse.json(
        { error: 'Não foi possível extrair o estilo. Tente com outra imagem.' },
        { status: 500 }
      )
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erro interno' }, { status: 500 })
  }
}
