'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { AppConfig, TextModel, ImageModel } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

const SQL = `create table if not exists nl_posts (
  id uuid default gen_random_uuid() primary key,
  title text, caption text, type text,
  status text, date text, img text,
  created_at timestamptz default now()
);
alter table nl_posts enable row level security;
create policy "allow_all" on nl_posts for all using (true) with check (true);`

export default function Apis() {
  const [cfg, setCfg] = useState<AppConfig>(storage.getConfig())
  const [saved, setSaved] = useState(false)

  function save() {
    storage.setConfig(cfg)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const update = (section: 'apiKeys', key: string, val: string) => {
    setCfg(prev => ({ ...prev, [section]: { ...prev[section], [key]: val } }))
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader title="APIs & Configurações" subtitle="Configure suas integrações e preferências" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {/* Models */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[11px] font-semibold text-white mb-3">Modelos padrão</div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Modelo de texto padrão" value={cfg.textModel}
              onChange={e => setCfg(p => ({...p, textModel: e.target.value as TextModel}))}
              options={[
                {value:'claude-sonnet-4-5',label:'Claude Sonnet 4.5'},
                {value:'claude-opus-4-5',label:'Claude Opus 4.5'},
                {value:'gemini-1.5-flash',label:'Gemini 1.5 Flash'},
                {value:'gemini-1.5-pro',label:'Gemini 1.5 Pro'},
              ]} />
            <Select label="Modelo de imagem padrão" value={cfg.imageModel}
              onChange={e => setCfg(p => ({...p, imageModel: e.target.value as ImageModel}))}
              options={[
                {value:'fal-flux',label:'Flux Schnell (fal.ai)'},
                {value:'fal-sdxl',label:'SDXL (fal.ai)'},
                {value:'gemini-imagen',label:'Gemini Imagen (em breve)'},
              ]} />
          </div>
        </div>

        {/* API Keys */}
        {[
          { title:'🟠 Anthropic (Claude)', key:'anthropic', placeholder:'sk-ant-api03-…', link:'https://console.anthropic.com', desc:'Para geração de texto com Claude Sonnet/Opus' },
          { title:'🔵 Google Gemini', key:'gemini', placeholder:'AIzaSy…', link:'https://aistudio.google.com', desc:'Para texto com Gemini Flash/Pro e imagens com Imagen' },
          { title:'🔶 fal.ai', key:'falai', placeholder:'xxxxxxxx-xxxx-xxxx-xxxx', link:'https://fal.ai', desc:'Para geração de imagens com Flux e SDXL' },
          { title:'🔵 Freepik', key:'freepik', placeholder:'FPIK-…', link:'https://freepik.com/api', desc:'Para busca de fotos e vetores premium' },
          { title:'🟣 Perplexity AI', key:'perplexity', placeholder:'pplx-…', link:'https://www.perplexity.ai/settings/api', desc:'Para busca de notícias em tempo real (requer conta Premium)' },
  { title:'🟢 Supabase URL', key:'supabaseUrl', placeholder:'https://xxx.supabase.co', link:'https://supabase.com', desc:'URL do seu projeto Supabase' },
          { title:'🟢 Supabase Key', key:'supabaseKey', placeholder:'sb_publishable_…', link:'', desc:'Chave pública do projeto' },
        ].map(item => (
          <div key={item.key} className="bg-[#0a0a0a] border border-white/[0.08] border-l-[3px] rounded-[8px] p-4" style={{borderLeftColor:'#FF5404'}}>
            <div className="text-[11px] font-semibold text-white mb-1">{item.title}</div>
            <div className="text-[10px] text-[rgba(237,218,186,0.4)] mb-3">{item.desc}</div>
            <div className="flex gap-2">
              <input type="password"
                value={(cfg.apiKeys as Record<string,string>)[item.key] || ''}
                onChange={e => update('apiKeys', item.key, e.target.value)}
                placeholder={item.placeholder}
                className="flex-1 bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404]"
              />
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer"
                  className="px-3 py-2 bg-[rgba(237,218,186,0.07)] border border-white/[0.08] rounded-[5px] text-[10px] text-[rgba(237,218,186,0.5)] hover:text-[#EDDABA] whitespace-nowrap">
                  Obter chave ↗
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Supabase SQL */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[11px] font-semibold text-white mb-2">Criar tabelas no Supabase</div>
          <div className="text-[10px] text-[rgba(237,218,186,0.4)] mb-3">Execute no SQL Editor do seu projeto:</div>
          <pre className="bg-[#111] rounded-[5px] p-3 text-[9px] text-[rgba(237,218,186,0.5)] leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">{SQL}</pre>
          <button onClick={() => navigator.clipboard.writeText(SQL)}
            className="text-[9px] text-[#FF5404] hover:underline mt-2 block">📋 Copiar SQL</button>
        </div>

        <Button onClick={save} className="self-start">
          {saved ? '✓ Salvo!' : 'Salvar configurações'}
        </Button>
      </div>
    </div>
  )
}
