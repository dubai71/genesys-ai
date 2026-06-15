import { NextRequest, NextResponse } from 'next/server'

const KEY = 'd5d036ce326cdc9292dfab2658f365e0bacedf032cdeca05264262019911b522'
const MU = 'https://api.muapi.ai'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const f = new FormData()
    f.append('file', file)

    const res = await fetch(`${MU}/api/v1/upload_file`, {
      method: 'POST',
      headers: { 'x-api-key': KEY },
      body: f,
    })

    if (!res.ok) {
      const txt = await res.text()
      return NextResponse.json({ error: `Upload failed: ${res.status} ${txt.slice(0, 200)}` }, { status: res.status })
    }

    const data = await res.json()
    const url = data.url || data.file_url || data.data?.url
    if (!url) return NextResponse.json({ error: 'No URL in response' }, { status: 500 })

    return NextResponse.json({ url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}