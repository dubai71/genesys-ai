'use client'
import { useEffect, useState } from 'react'
import { storage } from '@/lib/storage'
import type { Post, PostStatus, PostType, PostImage } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import StatCard from '../ui/StatCard'
import Input from '../ui/Input'
import Select from '../ui/Select'

const STATUS_BADGE: Record<PostStatus,'brand'|'green'|'blue'|'amber'|'muted'> = {
  Publicado:'green', Agendado:'blue', Rascunho:'muted', Backlog:'amber'
}
const TYPE_BADGE: Record<PostType,'brand'|'blue'|'purple'|'green'> = {
  Carrossel:'brand', Reel:'blue', Story:'purple', 'Post único':'green'
}

export default function Instagram() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState<PostStatus|'todos'>('todos')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({title:'',caption:'',type:'Carrossel' as PostType,status:'Backlog' as PostStatus,date:'',img:'none' as PostImage})

  useEffect(() => { setPosts(storage.getPosts()) }, [])
  const refresh = () => setPosts(storage.getPosts())

  const filtered = filter === 'todos' ? posts : posts.filter(p => p.status === filter)

  function addPost() {
    if (!form.title.trim()) return
    const p: Post = { ...form, id: Date.now().toString() }
    storage.addPost(p); refresh(); setShowForm(false)
    setForm({title:'',caption:'',type:'Carrossel',status:'Backlog',date:'',img:'none'})
  }
  function del(id: string) { storage.deletePost(id); refresh() }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader title="Instagram" subtitle="@enfermagemcom.ia · Gerencie todo seu conteúdo"
        actions={[{label:'+ Novo Post', onClick:()=>setShowForm(!showForm)}]} />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <StatCard label="Publicados" value={posts.filter(p=>p.status==='Publicado').length} sub="Este mês" accent="#22c55e" />
          <StatCard label="Agendados" value={posts.filter(p=>p.status==='Agendado').length} sub="Próximos" accent="#3b82f6" />
          <StatCard label="Rascunhos" value={posts.filter(p=>p.status==='Rascunho').length} sub="Em edição" accent="rgba(237,218,186,0.3)" />
          <StatCard label="Backlog" value={posts.filter(p=>p.status==='Backlog').length} sub="Ideias" accent="#f59e0b" />
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4 flex flex-col gap-3">
            <div className="text-[12px] font-semibold text-white">Novo Post</div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Título" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Ex: IA na triagem" />
              <Select label="Tipo" value={form.type} onChange={e=>setForm({...form,type:e.target.value as PostType})}
                options={['Carrossel','Reel','Story','Post único'].map(v=>({value:v,label:v}))} />
            </div>
            <div>
              <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Legenda</label>
              <textarea value={form.caption} onChange={e=>setForm({...form,caption:e.target.value})}
                className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none h-16"
                placeholder="Mensagem principal do post…" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Select label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value as PostStatus})}
                options={['Backlog','Rascunho','Agendado','Publicado'].map(v=>({value:v,label:v}))} />
              <Input label="Data" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
              <Select label="Imagem" value={form.img} onChange={e=>setForm({...form,img:e.target.value as PostImage})}
                options={[{value:'none',label:'Sem imagem'},{value:'freepik',label:'Freepik'},{value:'ai',label:'IA Gerada'}]} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={()=>setShowForm(false)}>Cancelar</Button>
              <Button size="sm" onClick={addPost}>Salvar</Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-1.5 flex-wrap">
          {(['todos','Publicado','Agendado','Rascunho','Backlog'] as const).map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all
                ${filter===f ? 'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/20'}`}>
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-1.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[rgba(237,218,186,0.25)] text-[12px]">Nenhum post aqui</div>
          ) : filtered.map(p => (
            <div key={p.id} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] px-4 py-3 flex items-start gap-3 hover:border-[rgba(255,84,4,0.2)] transition-colors">
              <div className={`w-8 h-8 rounded-[7px] flex items-center justify-center text-[13px] flex-shrink-0 mt-0.5`}
                style={{background:p.type==='Carrossel'?'rgba(255,84,4,0.13)':p.type==='Reel'?'rgba(59,130,246,0.12)':'rgba(168,85,247,0.12)'}}>
                {p.type==='Carrossel'?'🎠':p.type==='Reel'?'🎬':p.type==='Story'?'📱':'🖼'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-white truncate">{p.title}</div>
                <div className="text-[10px] text-[rgba(237,218,186,0.4)] mt-0.5 truncate">{p.caption}</div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <Badge variant={TYPE_BADGE[p.type]}>{p.type}</Badge>
                  <Badge variant={STATUS_BADGE[p.status]}>{p.status}</Badge>
                  {p.img!=='none' && <Badge variant="muted">{p.img==='freepik'?'Freepik':'IA'}</Badge>}
                  {p.date && <span className="text-[9px] text-[rgba(237,218,186,0.22)]">{p.date}</span>}
                </div>
              </div>
              <button onClick={()=>del(p.id)} className="text-[rgba(237,218,186,0.25)] hover:text-[#ef4444] text-[11px] transition-colors flex-shrink-0">✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
