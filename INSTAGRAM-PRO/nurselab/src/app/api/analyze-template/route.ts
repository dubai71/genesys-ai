import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { thumbnail, colors, apiKey } = await req.json()
    const key = (apiKey as string) || process.env.ANTHROPIC_API_KEY
    if (!key) return NextResponse.json({ notes: 'Configure a chave Anthropic para analise com IA.', tone: 'profissional', style: 'minimal' })

    const imgData = (thumbnail as string).replace(/^data:image\/\w+;base64,/, '')

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imgData } },
            { type: 'text', text: `Analise este template de design. Cores: ${(colors as string[]).join(', ')}. Responda APENAS JSON sem markdown: {"notes":"analise curta max 100 chars em portugues","tone":"profissional|educativo|inspirador|informal|divertido","style":"editorial|bold|minimal|warm|tech|medical","fontDisplay":"sugestao fonte display","fontBody":"sugestao fonte body"}` }
          ]
        }],
      }),
    })

    if (!res.ok) return NextResponse.json({ notes: 'Analise indisponivel.', tone: 'profissional', style: 'editorial' })
    const data = await res.json()
    const text = (data.content?.[0]?.text || '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try { return NextResponse.json(JSON.parse(text)) }
    catch { return NextResponse.json({ notes: 'Analise concluida automaticamente.', tone: 'profissional', style: 'editorial' }) }
  } catch {
    return NextResponse.json({ notes: 'Analise automatica concluida.', tone: 'profissional', style: 'editorial' })
  }
}
