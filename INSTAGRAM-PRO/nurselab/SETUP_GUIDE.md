# 🚀 NurseLab - Configuração Completa

## ✅ Build Já Está Funcionando
O site compila e roda sem erros em http://localhost:3003

## 🔧 Configurações Necessárias

### 1. SUPABASE - UPLOAD DE TEMPLATES

**A. Obter Service Role Key:**
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Em **Service role key**, copie a chave secreta

**B. Adicionar no `.env.local`:**
```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

**C. Criar Bucket:**
1. No Supabase Dashboard → **Storage**
2. Clique **Create bucket**
3. Nome: `nurselab`
4. (Opcional) Marcar **Public bucket**
5. Clique **Create**

---

### 2. APIs de IA - GERAÇÃO DE CONTEÚDO

Escolha pelo menos um provedor para gerar conteúdo:

#### Opção A: OpenAI (Recomendado)
```bash
OPENAI_API_KEY=sk-...
```

#### Opção B: Anthropic Claude
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

#### Opção C: Groq (Free tier)
```bash
GROQ_API_KEY=gsk_...
```

#### Opção D: Together AI
```bash
TOGETHER_API_KEY=...
```

#### Opção E: HuggingFace (Free tier)
```bash
HUGGINGFACE_API_KEY=hf_...
```

---

### 3. APÓS CONFIGURAR

1. Reinicie o servidor: `npm run dev`
2. Acesse http://localhost:3003
3. O status no canto inferior deve mostrar: **✓ NurseLab pronto**

---

## 📤 Testar Upload

1. Vá em **Templates** no menu lateral
2. Clique em **Upload**
3. Selecione um arquivo de template
4. Se tudo estiver correto, o upload será concluído

---

## 🔍 Troubleshooting

### Erro "Invalid Compact JWS" no upload
- ❌ Chave pública sendo usada
- ✅ Use a **Service Role Key** secreta

### Erro "Bucket não encontrado"
- Crie o bucket `nurselab` no Supabase Storage

### Erro "API não configurada" na geração
- Adicione pelo menos uma chave de IA no `.env.local`

---

## 📁 Arquivo `.env.local` Completo (exemplo)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://qknpyrfgsmajkxvysmcs.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=sb_publishable_AiFtnWk7uhbb2Pm8l1hR0A_XkACftDV
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

OPENAI_API_KEY=sk-proj-...
# ou
ANTHROPIC_API_KEY=sk-ant-...
# ou
GROQ_API_KEY=gsk_...
```
