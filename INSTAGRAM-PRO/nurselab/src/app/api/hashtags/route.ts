import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { content, niche, apiKeys } = await req.json()
    const key = apiKeys?.anthropic || process.env.ANTHROPIC_API_KEY

    if (!key) {
      return NextResponse.json({ high: [], medium: [], niche: [] })
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Sugira 30 hashtags em português para Instagram sobre: "${content}" no nicho "${niche}".
Divida em 3 categorias com 10 cada.
Responda APENAS com JSON:
{"high":["#tag"],"medium":["#tag"],"niche":["#tag"]}
- high: alta concorrência (>500k posts)
- medium: média concorrência (50k-500k posts)  
- niche: baixa concorrência/nicho específico (<50k posts)
Sem markdown, apenas JSON.`,
        }],
      }),
    })

    if (!res.ok) return NextResponse.json({ high: [], medium: [], niche: [] })

    const data = await res.json()
    const text = data.content?.[0]?.text || ''
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    try {
      return NextResponse.json(JSON.parse(clean))
    } catch {
      return NextResponse.json({ high: [], medium: [], niche: [] })
    }
  } catch {
    return NextResponse.json({ high: [], medium: [], niche: [] })
  }
}
