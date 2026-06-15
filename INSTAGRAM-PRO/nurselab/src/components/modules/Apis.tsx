'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { AppConfig, TextModel, ImageModel, VideoModel } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

const SQL = `create table if not exists nl_posts (
  id uuid default gen_random_uuid() primary key,
  title text, caption text, type text, status text, date text, img text,
  profile_id text, created_at timestamptz default now()
);
create table if not exists nl_profiles (
  id text primary key, data jsonb not null,
  created_at timestamptz default now()
);
create table if not exists nl_templates (
  id text primary key, data jsonb not null,
  created_at timestamptz default now()
);
create table if not exists nl_content (
  id text primary key, data jsonb not null,
  profile_id text, created_at timestamptz default now()
);
create table if not exists nl_competitors (
  id uuid default gen_random_uuid() primary key,
  handle text, seg text, eng text, freq int, trend text, nicho text, cor text,
  created_at timestamptz default now()
);
alter table nl_posts       enable row level security;
alter table nl_profiles    enable row level security;
alter table nl_templates   enable row level security;
alter table nl_content     enable row level security;
alter table nl_competitors enable row level security;
create policy allow_all_posts       on nl_posts       for all using (true) with check (true);
create policy allow_all_profiles    on nl_profiles    for all using (true) with check (true);
create policy allow_all_templates   on nl_templates   for all using (true) with check (true);
create policy allow_all_content     on nl_content     for all using (true) with check (true);
create policy allow_all_competitors on nl_competitors for all using (true) with check (true);`

export default function Apis() {
  const [cfg, setCfg] = useState<AppConfig>(storage.getConfig())
  const [saved, setSaved] = useState(false)

  function save() {
    storage.setConfig(cfg)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const update = (section: 'apiKeys', key: string, val: string) => {
    setCfg(prev => {
      const next = { ...prev, [section]: { ...prev[section], [key]: val } }
      storage.setConfig(next)
      setSaved(true)
      setTimeout(() => setSaved(false), 1200)
      return next
    })
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
                {value:'openai-gpt-4o',label:'GPT-4o (OpenAI)'},
                {value:'openai-gpt-4-turbo',label:'GPT-4 Turbo (OpenAI)'},
                {value:'deepseek-v3',label:'DeepSeek V3'},
                {value:'deepseek-chat',label:'DeepSeek Chat'},
                {value:'groq-llama3-70b',label:'Llama 3 70B (Groq) — Ultra rápido'},
                {value:'groq-llama3-8b',label:'Llama 3 8B (Groq)'},
                {value:'groq-mixtral',label:'Mixtral 8x7B (Groq)'},
                {value:'together-mixtral',label:'Mixtral (Together AI)'},
                {value:'together-llama3-70b',label:'Llama 3 70B (Together)'},
                {value:'huggingface-mistral',label:'Mixtral (HuggingFace) — Free tier'},
                {value:'huggingface-llama3',label:'Llama 3 (HuggingFace) — Free tier'},
              ]} />
            <Select label="Modelo de vídeo padrão" value={cfg.videoModel || 'seedance-v1'}
              onChange={e => setCfg(p => ({...p, videoModel: e.target.value as any}))}
              options={[
                {value:'seedance-v1',label:'Seedance 2.0 — Segmind'},
                {value:'higgsfield-seedance',label:'Seedance v1 — Higgs Field'},
                {value:'fal-minimax',label:'Minimax — fal.ai'},
                // Novos provedores
                {value:'replicate-svd',label:'Stable Video Diffusion (Replicate)'},
                {value:'replicate-zeroscope',label:'ZeroScope XL (Replicate)'},
                {value:'pika',label:'Pika v1'},
                {value:'pika-v2',label:'Pika v2'},
                {value:'runway-gen-3',label:'Runway Gen-3 Alpha'},
                {value:'runway-gen-2',label:'Runway Gen-2'},
                {value:'kling',label:'Kling AI'},
                {value:'haiper',label:'Haiper'},
                {value:'luma-dream-machine',label:'Luma Dream Machine'},
                {value:'huggingface-zero-shot',label:'Zero-shot Video (HuggingFace)'},
              ]} />
            <Select label="Modelo de imagem padrão" value={cfg.imageModel}
              onChange={e => setCfg(p => ({...p, imageModel: e.target.value as ImageModel}))}
              options={[
                {value:'fal-flux',label:'Flux Schnell (fal.ai)'},
                {value:'fal-sdxl',label:'SDXL (fal.ai)'},
                {value:'gemini-imagen',label:'Gemini Imagen (em breve)'},
                // Novos provedores
                {value:'openai-dall-e-3',label:'DALL-E 3 (OpenAI) — Alta qualidade'},
                {value:'openai-dall-e-2',label:'DALL-E 2 (OpenAI)'},
                {value:'replicate-sd3',label:'Stable Diffusion 3 (Replicate)'},
                {value:'replicate-flux-dev',label:'FLUX Dev (Replicate)'},
                {value:'replicate-flux-schnell',label:'FLUX Schnell (Replicate)'},
                {value:'stability-sdxl-turbo',label:'SDXL Turbo (Stability AI)'},
                {value:'stability-sd-xl',label:'SDXL 1.0 (Stability AI)'},
                {value:'gemini-imagen-2',label:'Imagen 2 (Gemini)'},
                {value:'huggingface-stable-diffusion',label:'Stable Diffusion (HuggingFace) — Free'},
                {value:'ideogram',label:'Ideogram v1'},
                {value:'ideogram-v2',label:'Ideogram v2'},
                {value:'leonardo-xl',label:'Leonardo XL'},
                {value:'leonardo-flux',label:'Leonardo Flux'},
              ]} />
          </div>
        </div>

        {/* API Keys */}
        {[
          { title:'🟠 Anthropic (Claude)', key:'anthropic', placeholder:'sk-ant-api03-…', link:'https://console.anthropic.com', desc:'Para geração de texto com Claude Sonnet/Opus' },
          { title:'🔵 Google Gemini', key:'gemini', placeholder:'AIzaSy…', link:'https://aistudio.google.com', desc:'Para texto com Gemini Flash/Pro e imagens com Imagen' },
          { title:'🔶 fal.ai', key:'falai', placeholder:'xxxxxxxx-xxxx-xxxx-xxxx', link:'https://fal.ai', desc:'Para geração de imagens com Flux e SDXL' },
          { title:'🔵 Freepik', key:'freepik', placeholder:'FPIK-…', link:'https://freepik.com/api', desc:'Para busca de fotos e vetores premium' },
          { title:'🟣 Perplexity AI', key:'perplexity', placeholder:'pplx-…', link:'https://www.perplexity.ai/settings/api', desc:'Fallback opcional para busca de notícias se o Perplexica local falhar' },
          { title:'🔍 Tavily AI', key:'tavily', placeholder:'tvly-…', link:'https://app.tavily.com', desc:'Para busca automática de notícias (1000 buscas/mês grátis). Categoria: IA, Enfermagem, Saúde Digital, Negócios.' },
          { title:'Perplexica Local', key:'perplexicaUrl', placeholder:'http://127.0.0.1:3001', link:'', desc:'URL do Perplexica local. O NurseLab chama /api/search automaticamente.' },
  { title:'🎬 Higgsfield Cloud', key:'higgsfield', placeholder:'hf-…', link:'https://cloud.higgsfield.ai/api-keys', desc:'Para vídeos com Seedance via Higgsfield Cloud API' },
  { title:'🎬 Segmind (Seedance 2.0)', key:'segmind', placeholder:'SG_…', link:'https://www.segmind.com/models/seedance-2.0', desc:'Para vídeos Seedance 2.0 via API REST — alternativa ao Higgsfield' },
  { title:'🎬 Higgsfield (Seedance)', key:'higgsfield', placeholder:'hf-...', link:'https://higgsfield.ai', desc:'Geração de vídeo com Seedance — plano gratuito disponível (seedance-1-lite)' },
  { title:'🎬 Higgs Field (Seedance)', key:'higgsfield', placeholder:'hf-xxxxxxxxxxxx', link:'https://higgsfield.ai', desc:'Geração de vídeos com Seedance v1 — gratuito temporariamente' },
          { title:'🤖 OpenAI', key:'openai', placeholder:'sk-proj-...', link:'https://platform.openai.com/api-keys', desc:'GPT-4o, GPT-4 Turbo, DALL-E. Trial USD 5 grátis.' },
          { title:'🐋 DeepSeek', key:'deepseek', placeholder:'sk-...', link:'https://platform.deepseek.com/api_keys', desc:'DeepSeek V3 e Chat. Alta qualidade, baixo custo.' },
          { title:'⚡ Groq', key:'groq', placeholder:'gsk_...', link:'https://console.groq.com/keys', desc:'Llama 3 e Mixtral ultra-rápido. 100 req/dia grátis.' },
          { title:'🔗 Together AI', key:'together', placeholder:'...', link:'https://together.ai', desc:'Llama 3, Mixtral. USD 25 créditos iniciais grátis.' },
          { title:'🤗 HuggingFace', key:'huggingface', placeholder:'hf_...', link:'https://huggingface.co/settings/tokens', desc:'Inference API com milhares de modelos. Free tier limitado.' },
          { title:'🔁 Replicate', key:'replicate', placeholder:'r8_...', link:'https://replicate.com/account/api-tokens', desc:'SD3, FLUX, muitos modelos. Free tier com créditos.' },
          { title:'🟢 Stability AI', key:'stability', placeholder:'sk-...', link:'https://platform.stability.ai/account/keys', desc:'SDXL Turbo, SDXL. Free tier disponível.' },
          { title:'🎨 Ideogram', key:'ideogram', placeholder:'...', link:'https://ideogram.ai/api', desc:'Geração de imagens com tipografia integrada. Free tier.' },
          { title:'🦁 Leonardo AI', key:'leonardo', placeholder:'...', link:'https://leonardo.ai/api-console', desc:'SDXL, FLUX modelos. Free tier daily tokens.' },
          { title:'🎬 Pika Labs', key:'pika', placeholder:'...', link:'https://pika.art', desc:'Geração de vídeos a partir de texto/imagem. Free tier.' },
          { title:'🎥 Runway ML', key:'runway', placeholder:'...', link:'https://runwayml.com/settings', desc:'Gen-2 e Gen-3. Trial gratuito.' },
          { title:'🐉 Kling AI', key:'kling', placeholder:'...', link:'https://kling.kuaishou.com', desc:'Modelo de vídeo de alta qualidade. Gratuito.' },
          { title:'🚀 Haiper', key:'haiper', placeholder:'...', link:'https://haiper.ai', desc:'Geração de vídeos com IA. Free tier.' },
          { title:'✨ Luma', key:'luma', placeholder:'...', link:'https://lumalabs.ai/dream-machine', desc:'Dream Machine, vídeos realistas. Free limited.' },
          { title:'📷 Unsplash', key:'unsplash', placeholder:'...', link:'https://unsplash.com/developers', desc:'Fotos stock de alta qualidade. 50 req/hora grátis.' },
          { title:'🎥 Pexels', key:'pexels', placeholder:'...', link:'https://www.pexels.com/api/', desc:'Vídeos e fotos stock grátis. 200 req/hora.' },
          { title:'✂️ Remove.bg', key:'removebg', placeholder:'...', link:'https://remove.bg/api', desc:'Remoção de fundo de imagens. Free tier 50 req/mês.' },
          { title:'✂️ Pixelcut', key:'pixelcut', placeholder:'...', link:'https://pixelcut.ai/api', desc:'Alternativa ao Remove.bg, free tier.' },
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
