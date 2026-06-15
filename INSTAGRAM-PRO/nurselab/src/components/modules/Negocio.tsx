'use client'
import { useState } from 'react'
import { storage } from '@/lib/storage'
import type { BusinessProfile, ContentTone } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

export default function Negocio() {
  const [biz, setBiz] = useState<BusinessProfile>(storage.getBusiness())
  const [saved, setSaved] = useState(false)
  const [newKeyword, setNewKeyword] = useState('')
  const [newColor, setNewColor] = useState('#FF5404')

  function save() { storage.setBusiness(biz); setSaved(true); setTimeout(()=>setSaved(false),2000) }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader title="Meu Negócio" subtitle="Configure seu perfil — usado automaticamente na geração de conteúdo" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome do negócio" value={biz.name} onChange={e=>setBiz({...biz,name:e.target.value})} />
          <Input label="@ Instagram" value={biz.instagramHandle} onChange={e=>setBiz({...biz,instagramHandle:e.target.value})} />
        </div>
        <div>
          <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Descrição do negócio</label>
          <textarea value={biz.description} onChange={e=>setBiz({...biz,description:e.target.value})}
            className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none h-20"
            placeholder="Descreva seu negócio, missão e proposta de valor…" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nicho / Indústria" value={biz.niche} onChange={e=>setBiz({...biz,niche:e.target.value})} />
          <Input label="Público-alvo" value={biz.audience} onChange={e=>setBiz({...biz,audience:e.target.value})} />
        </div>
        <Select label="Tom de comunicação preferido" value={biz.tone}
          onChange={e=>setBiz({...biz,tone:e.target.value as ContentTone})}
          options={['profissional','educativo','inspirador','informal','divertido'].map(v=>({value:v,label:v.charAt(0).toUpperCase()+v.slice(1)}))} />

        {/* Keywords */}
        <div>
          <div className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-2">Palavras-chave</div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {biz.keywords.map(k => (
              <span key={k} className="flex items-center gap-1 px-2 py-1 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[10px]">
                {k}
                <button onClick={()=>setBiz({...biz,keywords:biz.keywords.filter(kk=>kk!==k)})} className="hover:text-[#ef4444]">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newKeyword} onChange={e=>setNewKeyword(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&newKeyword.trim()){setBiz({...biz,keywords:[...biz.keywords,newKeyword.trim()]});setNewKeyword('')}}}
              placeholder="Adicionar palavra-chave (Enter)"
              className="flex-1 bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404]" />
          </div>
        </div>

        {/* Brand colors */}
        <div>
          <div className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-2">Cores da marca</div>
          <div className="flex items-center gap-2 flex-wrap">
            {biz.brandColors.map(c => (
              <span key={c} className="flex items-center gap-1.5 px-2 py-1 bg-[#111] border border-white/[0.08] rounded text-[10px]">
                <div className="w-3 h-3 rounded-full" style={{background:c}} />
                {c}
                <button onClick={()=>setBiz({...biz,brandColors:biz.brandColors.filter(cc=>cc!==c)})} className="text-[rgba(237,218,186,0.4)] hover:text-[#ef4444]">×</button>
              </span>
            ))}
            <div className="flex items-center gap-1.5">
              <input type="color" value={newColor} onChange={e=>setNewColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border-none bg-transparent" />
              <Button size="sm" variant="ghost" onClick={()=>setBiz({...biz,brandColors:[...biz.brandColors,newColor]})}>+ Adicionar</Button>
            </div>
          </div>
        </div>

        <Button onClick={save} className="self-start">{saved?'✓ Salvo!':'Salvar perfil'}</Button>
      </div>
    </div>
  )
}
