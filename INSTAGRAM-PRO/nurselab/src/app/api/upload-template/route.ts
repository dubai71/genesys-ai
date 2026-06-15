import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    // Configuração do Supabase (service_role do servidor)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase não configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.' },
        { status: 500 }
      )
    }

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Verificar/criar bucket 'nurselab'
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(b => b.name === 'nurselab')

    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket('nurselab', {
        public: true,
        fileSizeLimit: 52428800 // 50MB
      })
      if (bucketError) {
        console.error('Erro ao criar bucket:', bucketError)
        return NextResponse.json(
          { error: 'Falha ao criar bucket de storage', details: bucketError.message },
          { status: 500 }
        )
      }
    }

    // Ler arquivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Nome do arquivo
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `templates/${timestamp}-${sanitizedName}`

    // Upload
    const { error: uploadError } = await supabase.storage
      .from('nurselab')
      .upload(fileName, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Erro no upload', details: uploadError.message },
        { status: 500 }
      )
    }

    // URL pública
    const { data: urlData } = supabase.storage
      .from('nurselab')
      .getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      fileName,
      message: 'Template enviado com sucesso!'
    })

  } catch (error) {
    console.error('Upload template error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: String(error) },
      { status: 500 }
    )
  }
}
