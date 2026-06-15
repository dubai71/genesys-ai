# 🚀 GUIA DE INTEGRAÇÃO: Mission Control + AIOX + Pixel Agent Desk

## 📦 Estrutura Final

```
SITE-TESTE/
├── mission-control-app/          # Principal (Next.js)
│   ├── .env                     # Configurado ✅
│   ├── pixel-agent-desk/        # Visualizador integrado (porta 3001)
│   └── src/                     # App Next.js
├── horus-project/               # Frontend React (porta 5173)
├── aiox-core/                   # Sistema de orquestração
└── START-INTEGRATED.ps1        # Script de inicialização
```

---

## ⚡ Inicialização Rápida

### Opção 1: Usar script automatizado

```powershell
.\START-INTEGRATED.ps1
```

Isso inicia:
- ✅ Mission Control → http://localhost:3000
- ✅ Pixel Agent Desk → http://localhost:3001
- ✅ Hooks Claude Code configurados automaticamente

### Opção 2: Inicialização manual

#### 1. Mission Control

```bash
cd mission-control-app
pnpm dev
# → http://localhost:3000
```

#### 2. Pixel Agent Desk

Em outra janela:

```bash
cd mission-control-app/pixel-agent-desk
npm start
# → http://localhost:3001 (dashboard)
# App Electron abre automaticamente
```

#### 3. AIOX Core

```bash
cd horus-project
npm run aiox agent create meu-primeiro-agente
npm run aiox agent run <agent-id>
```

---

## 🔌 Como Funciona a Integração

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE DADOS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AIOX Core (horus-project)                                 │
│    ├─ Executa agentes via Claude Code                     │
│    └─ Gera eventos de sessão                              │
│         ↓                                                  │
│  Claude Code CLI                                           │
│    ├─ Recebe hooks do Pixel Agent Desk (porta 47821)     │
│    └─ Envia eventos HTTP → Pixel Desk                     │
│         ↓                                                  │
│  Pixel Agent Desk (porta 3001)                             │
│    ├─ Captura todos os eventos via hooks                 │
│    ├─ Renderiza sprites animados                          │
│    └─ Mantém estado em memória                            │
│         ↓                                                  │
│  Mission Control (porta 3000)                              │
│    └─ Pode consumir dados via API REST (em desenvolvimento)│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Acessos

| Componente | URL | Porta |
|-----------|-----|-------|
| Mission Control Dashboard | http://localhost:3000 | 3000 |
| Pixel Agent Desk Dashboard | http://localhost:3001 | 3001 |
| Claude Hooks Server | http://localhost:47821 | 47821 |
| Horus Project Dev | http://localhost:5173 | 5173 |

---

## 🔧 Configuração

### Variáveis de Ambiente (.env)

Local: `mission-control-app/.env`

```env
# Missão Control
PORT=3000
AUTH_USER=admin
AUTH_PASS=admin123

# AIOX Integration
AIOX_CORE_PATH=../aiox-core/bin/aiox.js
AIOX_ENABLED=true

# Pixel Desk
PIXEL_AGENT_DASHBOARD_URL=http://localhost:3001
```

### Hooks do Claude Code

Os hooks são registrados automaticamente pelo Pixel Agent Desk no
`~/.claude/settings.json` na primeira execução.

Se precisar registrar manualmente:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [{ "type": "http", "url": "http://localhost:47821/hook" }]
      }
    ],
    "SessionEnd": [ ... ]
    // ... todos os eventos em HOOK_EVENTS
  }
}
```

---

## 🧪 Testes

### 1. Testar Mission Control

```bash
curl http://localhost:3000/api/health
# Deve retornar: {"status":"ok",...}
```

### 2. Testar Pixel Agent Desk

```bash
curl http://localhost:3001/api/health
# Deve retornar: {"status":"ok","agents":0,...}
```

### 3. Testar Hook Server

```bash
curl -X POST http://localhost:47821/hook \
  -H "Content-Type: application/json" \
  -d '{"event":"SessionStart","data":{}}'
# Deve retornar 200 OK
```

### 4. Criar um Agente AIOX

```bash
cd horus-project
npm run aiox agent create test-agent
# Siga as instruções para configurar o agente
```

Após criar, o agente aparecerá automaticamente no Pixel Agent Desk!

---

## 🐛 Troubleshooting

### Porta 3000 já em uso

```bash
taskkill //F //PID <PID>
# ou
netstat -ano | findstr :3000
```

### Pixel Desk não mostra agentes

1. Verificar se Claude Code está instalado: `claude --version`
2. Verificar hooks: `cat ~/.claude/settings.json`
3. Testar hook server: `curl http://localhost:47821/hook` (deve dar 404, mas responder)
4. Executar um agente AIOX para gerar eventos

### Mission Control não sobe

```bash
cd mission-control-app
pnpm build  # Verificar se tem erros de build
pnpm dev     # Logs detalhados
```

Verificar `.env` e caminhos (especialmente `AIOX_CORE_PATH`).

---

## 📈 Próximos Passos

1. **Integração bidirecional:** Fazer Mission Control enviar commands para AIOX via API
2. **Webhooks:** Sincronizar estados entre Pixel Desk e Mission Control
3. **Dashboard unificado:** Consolidar as duas interfaces
4. **Autenticação:** Proteger APIs com tokens

---

## 📚 Referências

- Mission Control: `mission-control-app/README.md`
- Pixel Agent Desk: `mission-control-app/pixel-agent-desk/README.md`
- AIOX Core: `../aiox-core/README.md`
- Antigravity Kit: `horus-project/.agent/ARCHITECTURE.md`

---

**Última atualização:** 2026-03-30
**Status:** ✅ Configurado e pronto para testes
