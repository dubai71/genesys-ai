# NurseLab v4 — Guia Completo de API Keys

Este guia lista todos os provedores de IA suportados, como obter as chaves de API, limites de free tier, e instruções de configuração.

## 📋 Índice

1. [Quick Start](#quick-start)
2. [Provedores de Texto (LLMs)](#texto)
3. [Provedores de Imagem](#imagem)
4. [Provedores de Vídeo](#vídeo)
5. [Stock Media & Utilitários](#stock--utilitários)
6. [Notas de Segurança](#segurança)
7. [Troubleshooting](#troubleshooting)

---

## <a name="quick-start"></a>🚀 Quick Start (Free Tier Recomendado)

Para testar o NurseLab antes de pagar por qualquer serviço, configure **apenas** estas chaves (todas com free tier generoso):

1. **Groq** — Ultra-rápido, 100 req/dia grátis
2. **HuggingFace** — Ilimitado (rate-limited), ótimo para testes
3. **Higgsfield Seedance** — 100+ vídeos/mês grátis
4. **Replicate** — $1 free credit, depois pago por uso
5. **OpenAI** — $5 free credit (primeira conta)

Vá em **APIs & Configurações** no app e cole essas chaves. Você já pode testar todos os recursos.

---

## <a name="texto"></a>📝 Provedores de Texto (LLMs)

### OpenAI GPT
**Modelos:** `openai-gpt-4o`, `openai-gpt-4-turbo`

**O que é melhor:** Modelo mais versátil, ótimo para carrosséis, hashtags, e geral.

**Free tier:** $5 de crédito inicial (expira após 3 meses). Após gastar, pago por uso (~$0.01–0.03/1K tokens).

**Como obter:**
1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie conta (email + verificação)
3. Em API Keys → Create new secret key
4. Copie a chave (começa com `sk-...`)
5. Cole em NurseLab → APIs → OpenAI API Key

**Dica:** Monitore uso em Usage Dashboard para evitar surpresas.

---

### Anthropic Claude
**Modelos:** `claude-sonnet-4-5`, `claude-opus-4-5`

**O que é melhor:** Qualidade excepcional, segue instruções longas, ótimo para posts detalhados.

**Free tier:** Claude >3.5 Sonnet free tier com limites diários (atualmente ~10–20 mensagens/dia). Opus é pago apenas.

**Como obter:**
1. Acesse [console.anthropic.com](https://console.anthropic.com)
2. Crie conta (pode exigir verificação de telefone)
3. API Keys → Create Key
4. Cole em NurseLab

---

### Google Gemini
**Modelos:** `gemini-1.5-flash`, `gemini-1.5-pro`

**O que é melhor:** Contexto ultra-longo (até 1M tokens), free tier generoso, rápido.

**Free tier:** 60 RPM, 1500 req/dia grátis (Google AI Studio). 50 req/min no Vertex AI (pago).

**Como obter:**
1. Acesse [aistudio.google.com](https://aistudio.google.com)
2. Get API Key (no menu superior)
3. Copie a chave
4. Cole em NurseLab

**Nota:** Use a chave do AI Studio, não a do Google Cloud.

---

### DeepSeek
**Modelos:** `deepseek-v3`, `deepseek-chat`

**O que é melhor:** Qualidade comparável ao GPT-4, preço baixo, bom para uso intensivo.

**Free tier:** 1M tokens/dia grátis (limitado). V3 é o mais recente.

**Como obter:**
1. Acesse [platform.deepseek.com](https://platform.deepseek.com)
2. API Keys → Create API Key
3. Cole em NurseLab

**Base URL:** DeepSeek usa OpenAI-compatible endpoint, configurado automaticamente.

---

### Groq
**Modelos:** `groq-llama3-70b`, `groq-llama3-8b`, `groq-mixtral`

**O que é melhor:** Velocidade extrema (<500ms respostas), free tier de 100 req/dia, ótimo para testes rápidos.

**Free tier:** 100 requests/day grátis. Não requer cartão para free tier.

**Como obter:**
1. Acesse [console.groq.com](https://console.groq.com)
2. Create API Key
3. Cole em NurseLab

**Nota:** Groq usa hardware LPUs, respostas são as mais rápidas do mercado.

---

### Together AI
**Modelos:** `together-mixtral`, `together-llama3-70b`

**O que é melhor:** Variedade de modelos, preços competitivos, free $25 credit para começar.

**Free tier:** $25 de crédito inicial (expira em 3 meses).

**Como obter:**
1. Acesse [api.together.xyz](https://api.together.xyz)
2. Sign up → Verify email
3. API Keys → Create
4. Cole em NurseLab

---

### HuggingFace (Text)
**Modelos:** `huggingface-mistral`, `huggingface-llama3`

**O que é melhor:** Totalmente gratuito (rate-limited), ideal para testes ilimitados sem custo.

**Free tier:** Ilimitado em teoria, mas rate-limited (~1 req/segundo). Requer Inference API ativada.

**Como obter:**
1. Acesse [huggingface.co](https://huggingface.co)
2. Settings → Access Tokens → New token
3. Escolha scope: `inference-api`
4. Copie token
5. Cole em NurseLab

**Nota:** Alguns modelos podem estar "warming up" na primeira chamada (retry automático no NurseLab).

---

## <a name="imagem"></a>🎨 Provedores de Imagem

### OpenAI DALL-E
**Modelos:** `openai-dall-e-3`, `openai-dall-e-2`

**O que é melhor:** Qualidade premium, texto legível, 3 opções de aspect ratio.

**Free tier:** $5 crédito inicial (mesmo de GPT). DALL-E 3: ~$0.040/image (1024x1024). DALL-E 2: ~$0.020/image.

**Como obter:** Mesma chave do GPT (OpenAI API Key). Configure uma vez, use para texto e imagem.

**Dica:** Use DALL-E 3 para posts, DALL-E 2 para rascunhos rápidos.

---

### Replicate
**Modelos:** `replicate-sd3`, `replicate-flux-dev`, `replicate-flux-schnell`

**O que é melhor:** Flux é SOTA open image, SD3 também excelente. Variedade enorme de modelos.

**Free tier:** $1 de crédito inicial (não precisa cartão). Após, ~$0.003–0.01/image. Pago por uso, sem assinatura.

**Como obter:**
1. Acesse [replicate.com](https://replicate.com)
2. Sign up with GitHub (recomendado)
3. Account → API Tokens → Create token
4. Cole em NurseLab

**Modelos incluídos no NurseLab:**
- `replicate-sd3` — Stable Diffusion 3 (qualidade top)
- `replicate-flux-dev` — FLUX.dev (muito bom, pago)
- `replicate-flux-schnell` — FLUX.schnell (rápido, barato)

---

### Stability AI
**Modelos:** `stability-sdxl-turbo`, `stability-sd-xl`

**O que é melhor:** SDXL Turbo gera em 1–2 passos, super rápido. SD XL qualidade alta com controle fino.

**Free tier:** Gratuito para primeiras 25–30 imagens/mês (depende da region). Após, pago.

**Como obter:**
1. Acesse [platform.stability.ai](https://platform.stability.ai)
2. Get API Key (não precisa cartão para free tier limitado)
3. Cole em NurseLab

**Nota:** Stability retorna base64, o NurseLab converte automaticamente.

---

### Google Gemini Imagen 2
**Modelos:** `gemini-imagen-2`

**O que é melhor:** Qualidade comparable a DALL-E 3, integração com生态系统 Google.

**Free tier:** Incluído no Google AI Studio free tier (mesmos limites de texto).

**Como obter:** Use mesma chave do Gemini texto. Não precisa configurar separado.

**Limitações:** Ainda em preview, pode ter queue.

---

### HuggingFace (Imagem)
**Modelos:** `huggingface-stable-diffusion`

**O que é melhor:** Gratuito total (rate-limited), SDXL base sem custo.

**Free tier:** Ilimitado com rate limit. Demora 10–30s por imagem.

**Como obter:** Mesmo token do HuggingFace texto. Use `huggingface-stable-diffusion`.

**Nota:** SDXL roda em CPU, mais lento que provedores pagos.

---

### Ideogram
**Modelos:** `ideogram`

**O que é melhor:** Tipografia nativa legível, ótimo para quotes e imagens com texto.

**Free tier:** 100 imagens/dia grátis. Sem necessidade cartão para começar.

**Como obter:**
1. Acesse [ideogram.ai](https://ideogram.ai)
2. Sign up with Google
3. Settings → API Access → Generate token
4. Cole em NurseLab

**Dica:** Use para imagens que precisam de texto legível (DALL-E falha frequentemente).

---

### Leonardo AI
**Modelos:** `leonardo`

**O que é melhor:** Controle fino (LoRAs, Canvas Editor), modelos artísticos variados.

**Free tier:** 150 tokens/dia (equivale ~20–30 imagens). Requere daily reset.

**Como obter:**
1. Acesse [leonardo.ai](https://leonardo.ai)
2. Create account (waitlist pode ser necessário)
3. Account → Additional Info → API Access → Create
4. Cole API Key em NurseLab

**Nota:** Leonardo tem policies estritas, imagens podem ser审核adas.

---

## <a name="vídeo"></a>🎬 Provedores de Vídeo

### Higgsfield Seedance
**Modelos:** `higgsfield-seedance`, `seedance-v1`, `seedance-v1-lite`

**O que é melhor:** Vídeos cinematográficos de 5–10s, qualidade Surreal, free tier generoso.

**Free tier:** 100+ vídeos/mês grátis (depende da região). Sem cartão necessário.

**Como obter:**
1. Acesse [cloud.higgsfield.ai](https://cloud.higgsfield.ai)
2. Sign up with Google/email
3. API Keys → Generate
4. Cole em NurseLab

**Dica:** `seedance-v1-lite` é mais rápido, `seedance-v1` mais detalhado.

---

### Segmind Seedance 2.0
**Modelos:** `segmind-seedance-2`

**O que é melhor:** Vídeos de alta qualidade, stable, suporte a image-to-video.

**Free tier:** 100 vídeos/dia grátis inicialmente.

**Como obter:**
1. Acesse [segmind.com](https://segmind.com)
2. Sign up → API Keys
3. Cole chave em NurseLab

**Nota:** Retorna vídeo URL rapidamente (síncrono na maioria dos casos).

---

### Replicate (Vídeo)
**Modelos:** `replicate-svd`, `replicate-zetooscope`

**O que é melhor:** Stable Video Diffusion (SVD) e ZeroScope são benchmarks opensource.

**Free tier:** $1 crédito inicial. Após, ~$0.05–0.20/vídeo.

**Como obter:** Mesma chave do Replicate imagem.

**Modelos:**
- `replicate-svd` — Stable Video Diffusion img2vid
- `replicate-zeroscope` — ZeroScope XL (720p)

**Nota:** Replicate vídeo demora 30s–2min. NurseLab faz polling automático.

---

### Pika
**Modelos:** `pika`, `pika-v2`

**O que é melhor:** Animar imagens estáticas, controle com prompt + negative prompt.

**Free tier:** Limitado (em Beta, free tier pode variar).

**Como obter:**
1. Acesse [pika.art](https://pika.art)
2. Join Beta (via Discord)
3. Settings → API Key (se disponível)
4. Cole em NurseLab

**Nota:** Pika API pode exigir webhook. NurseLab faz polling.

---

### Runway ML
**Modelos:** `runway-gen-2`, `runway-gen-3`

**O que é melhor:** Qualidade profissional, Gen-3 Alpha é SOTA em motion.

**Free tier:** Plano gratuito limitado (5–10 vídeos/mês). Requer cartão para verificação.

**Como obter:**
1. Acesse [runwayml.com](https://runwayml.com)
2. Sign up → Account Settings → API Access
3. Generate API Key
4. Cole em NurseLab

**Nota:** Runway demora 1–5 minutos por vídeo.

---

### Kling AI
**Modelos:** `kling`

**O que é melhor:** Alta qualidade, motion realistic, suporte a 10s.

**Free tier:** 66 vídeos/mês grátis (plano gratuito).

**Como obter:**
1. Acesse app.klingai.com ou [klingai.com](https://klingai.com)
2. Registre-se (pode precisar app móvel)
3. Settings → API Center → Create Key
4. Cole em NurseLab

**API endpoint:** `https://api.kling.kuaishou.com`

---

### Haiper
**Modelos:** `haiper`

**O que é melhor:** Motion controllable, stylized generation.

**Free tier:** 100+ vídeos/mês grátis.

**Como obter:**
1. Acesse [haiper.ai](https://haiper.ai)
2. Sign up
3. Account → API Keys
4. Cole em NurseLab

**Endpoint:** `https://api.haiper.ai`

---

### Luma Dream Machine
**Modelos:** `luma-dream-machine`

**O que é melhor:** 5 seconds cinematic, alta qualidade,快.

**Free tier:** 30 vídeos/mês grátis (10 segundos cada).

**Como obter:**
1. Acesse [lumalabs.ai](https://lumalabs.ai)
2. Sign up
3. API Keys → Generate
4. Cole em NurseLab

**Nota:** Dream Machine é um dos mais populares atualmente.

---

### HuggingFace (Vídeo)
**Modelos:** `huggingface-zero-shot`

**O que é melhor:** Gratuito total, Zero-shot Video Diffusion, boa qualidade 576x320.

**Free tier:** Ilimitado (rate-limited). Demora 30s–1min.

**Como obter:** Mesmo token HuggingFace texto.

**Endpoint:** Usa modelo `cerspense/zeroscope-v2-576w`.

---

### fal.ai Minimax
**Modelos:** `fal-minimax`

**O que é melhor:** Alta qualidade, reliable.

**Free tier:** $1 crédito inicial, depois pago (~$0.05/vídeo).

**Como obter:**
1. Acesse [fal.ai](https://fal.ai)
2. Sign up with GitHub
3. API Keys → Create
4. Cole em NurseLab

**Endpoint:** `https://queue.fal.run/fal-ai/minimax`

---

## <a name="stock--utilitários"></a>🖼️ Stock Media & Utilitários

### Perplexity AI
**Uso:** Notícias em tempo real no módulo Notícias.

**Free tier:** Plano gratuito limitado (5–10 queries/dia). Pro: $20/mês.

**Como obter:**
1. Acesse [perplexity.ai](https://perplexity.ai)
2. Settings → API → Create API Key
3. Cole em NurseLab

---

### Freepik
**Uso:** Busca de imagens stock no módulo Biblioteca.

**Free tier:** API paga (~$0.15/request). Teste com trial.

**Como obter:**
1. Acesse [freepik.com/api](https://freepik.com/api)
2. Sign up for API access
3. Receba chave por email
4. Cole em NurseLab

---

### Unsplash (em breve)
**Uso:** Fotos gratuitas de alta qualidade.

**Free tier:** Ilimitado (requer attribution).

---

### Pexels (em breve)
**Uso:** Vídeos stock gratuitos.

**Free tier:** Ilimitado (attribution recommended).

---

### Remove.bg (em breve)
**Uso:** Remover fundo de imagens.

**Free tier:** 50 remoções/mês grátis.

---

## <a name="segurança"></a>🔒 Notas de Segurança

- **Todas as chaves ficam no seu localStorage** (não enviadas para nenhum servidor além dos provedores)
- O NurseLab **não armazena** suas chaves em backend.
- Chaves são enviadas diretamente do seu navegador para o provedor via API routes do Next.js (que atuam como proxy).
- Use `localhost` para desenvolvimento. Production, considere configurar CORS adequado.
- NÃO compartilhe seu `.env.local` ou prints da tela com chaves visíveis.

---

## <a name="troubleshooting"></a>🛠️ Troubleshooting

| Problema | Possível Causa | Solução |
|----------|----------------|---------|
| "Chave não configurada" | Esqueceu de colocar a chave em **APIs** | Vá em APIs, cole a chave |
| Erro 401/403 | Chave inválida ou expirada | Gere nova chave no provedor |
| Vídeo travado em "processing" | Provedor lento ou timeout | Aguarde 1–2 min, recarregue |
| "Model not found" | Model renameado ou descontinuado | Verifique se o modelo ainda existe no provedor |
| HuggingFace "warming up" | Model loading na primeira chamada | Aguarde 30–60s e tente novamente |
| Groq 429 Too Many Requests | Free tier excedido (100 req/dia) | Espere 24h ou considere upgrade |

**Logs do navegador:** Abra DevTools (F12) → Console para ver erros detalhados.

**Limpeza de cache:** Se mudou chaves e não funciona, limpe localStorage: no DevTools, Application → Storage → Local Storage → delete `nl_config`.

---

## 💡 Recomendações por Caso de Uso

| Objetivo | Provedor Recomendado | Backups |
|----------|----------------------|---------|
| Texto: carrosséis longos | Claude Sonnet 4.5 | GPT-4o |
| Texto: rápido e barato | Groq Llama 3 8B | DeepSeek Chat |
| Imagem: posts com texto | Ideogram | DALL-E 3 (pago) |
| Imagem: experimentação grátis | HuggingFace SDXL | Replicate Flux (grátis $1) |
| Vídeo: teste gratuito | Higgsfield Seedance | HuggingFace Zero-shot |
| Vídeo: qualidade premium | Luma Dream Machine | Runway Gen-3 |
| Notícias: tempo real | Perplexity Pro | — |

---

## 📊 Tabela Rápida de Limites (Free Tier)

| Provedor | Free Tier | Limite | Expira? |
|----------|-----------|--------|---------|
| Groq | 100 req/dia | Diário | Não |
| HuggingFace | Rate-limited | ~1 req/seg | Não |
| DeepSeek | 1M tokens/dia | Diário | Não |
| Gemini | 1500 req/dia | Diário | Não |
| OpenAI | $5 crédito | Em 3 meses | Sim |
| Replicate | $1 crédito | Em 3 meses | Sim |
| Higgsfield | 100+ vídeos/mês | Mensal | Não |
| Ideogram | 100 imgs/dia | Diário | Não |
| Kling | 66 vídeos/mês | Mensal | Não |
| Luma | 30 vídeos/mês | Mensal | Não |
| Perplexity | 5–10 queries/dia | Diário | Não |

---

## 🤝 Suporte

Para problemas específicos do NurseLab, abra issue no repositório. Para problemas de API, consulte documentação do provedor.

**Links úteis:**
- [Anthropic Docs](https://docs.anthropic.com)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Replicate Docs](https://replicate.com/docs)
- [HuggingFace Inference API](https://huggingface.co/docs/api-inference)
