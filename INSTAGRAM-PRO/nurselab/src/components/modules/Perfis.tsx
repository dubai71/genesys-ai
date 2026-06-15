'use client'
import { useState, useEffect, useRef } from 'react'
import { storage, DEFAULT_PROFILE } from '@/lib/storage'
import type { Profile, ContentTone } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Badge from '../ui/Badge'

const TONES: {value:ContentTone;label:string}[] = [
  {value:'profissional',label:'Profissional'},{value:'educativo',label:'Educativo'},
  {value:'inspirador',label:'Inspirador'},{value:'informal',label:'Informal'},{value:'divertido',label:'Divertido'},
]
const FONTS = ['Fraunces','Playfair Display','Plus Jakarta Sans','Lora','Space Grotesk','Libre Baskerville','Bricolage Grotesque','Outfit','DM Sans','Nunito Sans','Work Sans']

function ini(name: string) { return name.split(' ').slice(0,2).map((w:string)=>w[0]||'').join('').toUpperCase() }

export default function Perfis() {
  const [profiles, setProfiles]   = useState<Profile[]>([])
  const [activeId, setActiveId]   = useState('default')
  const [selected, setSelected]   = useState<Profile|null>(null)
  const [editing, setEditing]     = useState(false)
  const [draft, setDraft]         = useState<Partial<Profile>>({})
  const [newKw, setNewKw]         = useState('')
  const [newColor, setNewColor]   = useState('#FF5404')
  const avatarRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    let profs = storage.getProfiles()
    if (profs.length===0) { storage.addProfile(DEFAULT_PROFILE); profs=[DEFAULT_PROFILE] }
    setProfiles(profs)
    const aid = storage.getActiveProfileId()
    setActiveId(aid)
    setSelected(profs.find(p=>p.id===aid)||profs[0])
  },[])

  function refresh() { setProfiles(storage.getProfiles()) }

  function switchTo(id: string) {
    storage.setActiveProfile(id)
    setActiveId(id)
    setSelected(profiles.find(p=>p.id===id)||null)
    setEditing(false)
  }

  function newProfile() {
    const p: Profile = {
      id: Date.now().toString(), name: 'Novo Perfil', handle: '@novo_perfil',
      description: '', niche: 'Saude', audience: 'Profissionais', tone: 'profissional',
      keywords: [], brandColors: ['#FF5404','#071925','#EDDABA'],
      fontDisplay: 'Fraunces', fontBody: 'Outfit', socialNetworks: ['instagram'],
      competitors: [], isDefault: false, createdAt: new Date().toISOString(),
    }
    storage.addProfile(p); refresh(); setSelected(p); setDraft(p); setEditing(true)
  }

  function startEdit() { if (!selected) return; setDraft({...selected}); setEditing(true) }

  function saveEdit() {
    if (!selected) return
    const updated = {...selected, ...draft} as Profile
    storage.updateProfile(updated); refresh(); setSelected(updated); setEditing(false)
  }

  function delProfile(id: string) {
    if (profiles.length<=1) { alert('Precisa de pelo menos 1 perfil'); return }
    storage.deleteProfile(id)
    const profs = storage.getProfiles()
    setProfiles(profs)
    if (activeId===id) { storage.setActiveProfile(profs[0].id); setActiveId(profs[0].id) }
    setSelected(profs[0]); setEditing(false)
  }

  function loadAvatar(file: File) {
    const reader = new FileReader()
    reader.onload = e => {
      const src = e.target?.result as string
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 120; canvas.height = 120
        canvas.getContext('2d')!.drawImage(img, 0, 0, 120, 120)
        setDraft(d=>({...d, avatar: canvas.toDataURL('image/jpeg',0.85)}))
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }

  const D = draft
  const S = selected

  return (
    <div className="flex h-full overflow-hidden">
      {/* List panel */}
      <div className="w-60 flex-shrink-0 border-r border-white/[0.08] flex flex-col bg-[#050505]">
        <div className="p-4 border-b border-white/[0.08]">
          <h1 className="font-display text-lg font-bold text-white mb-3">Perfis</h1>
          <Button onClick={newProfile} className="w-full" size="sm">+ Novo perfil</Button>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {profiles.map(p=>(
            <button key={p.id} onClick={()=>{setSelected(p);setEditing(false)}}
              className={`w-full flex items-center gap-2.5 px-4 py-3 border-l-2 transition-colors text-left
                ${S?.id===p.id?'bg-[rgba(255,84,4,0.08)] border-[#FF5404]':'border-transparent hover:bg-[rgba(237,218,186,0.03)]'}`}>
              {p.avatar
                ? <img src={p.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"/>
                : <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white border border-white/10"
                    style={{background:p.brandColors?.[0]||'#FF5404'}}>{ini(p.name)}</div>
              }
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">{p.name}</div>
                <div className="text-[9px] text-[rgba(237,218,186,0.4)] truncate">{p.handle}</div>
              </div>
              {p.id===activeId && <div className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] flex-shrink-0"/>}
            </button>
          ))}
        </div>
      </div>

      {/* Detail / Edit panel */}
      <div className="flex-1 overflow-y-auto p-5">
        {!S ? (
          <div className="flex items-center justify-center h-full opacity-20 text-5xl">👤</div>
        ) : editing ? (
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">Editar perfil</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={()=>setEditing(false)}>Cancelar</Button>
                <Button size="sm" onClick={saveEdit}>✓ Salvar</Button>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <button className="relative" onClick={()=>avatarRef.current?.click()}>
                {D.avatar
                  ? <img src={D.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5404]"/>
                  : <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white border-2 border-dashed border-white/20"
                      style={{background:D.brandColors?.[0]||'#FF5404'}}>{ini(D.name||'NP')}</div>
                }
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity text-[10px] text-white">Foto</div>
              </button>
              <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)loadAvatar(f)}}/>
              <div className="text-[10px] text-[rgba(237,218,186,0.4)]">Clique no avatar para trocar a foto de perfil</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Nome" value={D.name||''} onChange={e=>setDraft(d=>({...d,name:e.target.value}))}/>
              <Input label="@ Handle" value={D.handle||''} onChange={e=>setDraft(d=>({...d,handle:e.target.value}))}/>
            </div>
            <div>
              <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Descrição</label>
              <textarea value={D.description||''} onChange={e=>setDraft(d=>({...d,description:e.target.value}))}
                className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none h-16"/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nicho" value={D.niche||''} onChange={e=>setDraft(d=>({...d,niche:e.target.value}))}/>
              <Input label="Público-alvo" value={D.audience||''} onChange={e=>setDraft(d=>({...d,audience:e.target.value}))}/>
            </div>
            <Select label="Tom de voz" value={D.tone||'profissional'} onChange={e=>setDraft(d=>({...d,tone:e.target.value as ContentTone}))} options={TONES}/>

            {/* Keywords */}
            <div>
              <div className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1.5">Palavras-chave</div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(D.keywords||[]).map(k=>(
                  <span key={k} className="flex items-center gap-1 px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[10px]">
                    {k}<button onClick={()=>setDraft(d=>({...d,keywords:(d.keywords||[]).filter(x=>x!==k)}))} className="hover:text-[#ef4444]">×</button>
                  </span>
                ))}
              </div>
              <input value={newKw} onChange={e=>setNewKw(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&newKw.trim()){setDraft(d=>({...d,keywords:[...(d.keywords||[]),newKw.trim()]}));setNewKw('')}}}
                placeholder="Adicionar keyword (Enter)"
                className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404]"/>
            </div>

            {/* Brand Colors */}
            <div>
              <div className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1.5">Cores da marca</div>
              <div className="flex items-center gap-2 flex-wrap">
                {(D.brandColors||[]).map(c=>(
                  <span key={c} className="flex items-center gap-1.5 px-2 py-1 bg-[#111] border border-white/[0.08] rounded text-[10px]">
                    <div className="w-3 h-3 rounded-full" style={{background:c}}/>{c}
                    <button onClick={()=>setDraft(d=>({...d,brandColors:(d.brandColors||[]).filter(x=>x!==c)}))} className="text-[rgba(237,218,186,0.4)] hover:text-[#ef4444]">×</button>
                  </span>
                ))}
                <input type="color" value={newColor} onChange={e=>setNewColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-none bg-transparent"/>
                <Button size="sm" variant="ghost" onClick={()=>setDraft(d=>({...d,brandColors:[...(d.brandColors||[]),newColor]}))}>+</Button>
              </div>
            </div>

            {/* Fonts */}
            <div className="grid grid-cols-2 gap-3">
              <Select label="Fonte display (títulos)" value={D.fontDisplay||'Fraunces'} onChange={e=>setDraft(d=>({...d,fontDisplay:e.target.value}))} options={FONTS.map(f=>({value:f,label:f}))}/>
              <Select label="Fonte body (texto)" value={D.fontBody||'Outfit'} onChange={e=>setDraft(d=>({...d,fontBody:e.target.value}))} options={FONTS.map(f=>({value:f,label:f}))}/>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {S.avatar
                  ? <img src={S.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[rgba(255,84,4,0.4)]"/>
                  : <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{background:S.brandColors?.[0]||'#FF5404'}}>{ini(S.name)}</div>
                }
                <div>
                  <h2 className="font-display text-xl font-bold text-white">{S.name}</h2>
                  <div className="text-[12px] text-[rgba(237,218,186,0.5)]">{S.handle}</div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <Badge variant="muted">{S.niche}</Badge>
                    <Badge variant="muted">{S.tone}</Badge>
                    {S.id===activeId && <Badge variant="green">Ativo</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {S.id!==activeId && <Button size="sm" onClick={()=>switchTo(S.id)}>Ativar</Button>}
                <Button variant="ghost" size="sm" onClick={startEdit}>✏ Editar</Button>
                {!S.isDefault && <Button variant="danger" size="sm" onClick={()=>delProfile(S.id)}>🗑</Button>}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-3">Identidade visual</div>
              <div className="flex gap-2 flex-wrap mb-3">
                {S.brandColors.map(c=>(
                  <div key={c} className="flex flex-col items-center gap-1 cursor-pointer" onClick={()=>navigator.clipboard.writeText(c)}>
                    <div className="w-10 h-10 rounded-[6px] border border-white/10 hover:scale-105 transition-transform" style={{background:c}}/>
                    <div className="text-[7px] font-mono text-[rgba(237,218,186,0.3)]">{c}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-white/[0.08]">
                <div><div className="text-[9px] text-[rgba(237,218,186,0.35)] mb-1">Display</div><div className="text-white text-base" style={{fontFamily:S.fontDisplay}}>{S.fontDisplay}</div></div>
                <div><div className="text-[9px] text-[rgba(237,218,186,0.35)] mb-1">Body</div><div className="text-[rgba(237,218,186,0.7)] text-sm" style={{fontFamily:S.fontBody}}>{S.fontBody}</div></div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-3">Negócio</div>
              {S.description && <p className="text-[11px] text-[rgba(237,218,186,0.6)] leading-relaxed mb-3">{S.description}</p>}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><div className="text-[8px] text-[rgba(237,218,186,0.3)]">Nicho</div><div className="text-[11px] text-white mt-0.5">{S.niche}</div></div>
                <div><div className="text-[8px] text-[rgba(237,218,186,0.3)]">Público</div><div className="text-[11px] text-white mt-0.5">{S.audience}</div></div>
              </div>
              {S.keywords.length>0 && (
                <div className="flex flex-wrap gap-1.5">
                  {S.keywords.map(k=><span key={k} className="px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[9px]">{k}</span>)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}