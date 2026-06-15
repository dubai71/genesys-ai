# Configuração de Portas dos Projetos Web

Este diretório contém múltiplos projetos. Apenas os projetos WEB são listados aqui (aplicações que rodam em localhost).

## 🎯 Projetos Web Ativos

| Projeto | Porta | URL | Tecnologia |
|---------|-------|-----|------------|
| content-os-instagram | 3001 | http://localhost:3001 | Next.js |
| mission-control | 3000 | http://localhost:3000 | Next.js |

## 📦 Outros Projetos (Módulos/Skills)

Estes **não são aplicações web** e não possuem servidor local:

- `mission-control/` - Biblioteca de orquestração de agentes AI (Node.js module) ⚠️ Também disponível como app web na porta 3000
- `pixel-agent-desk/` - Agente AI (CLI/desk app)
- `second-brain/` - Módulo Python (skills/backend)
- `aiox-core/` - Core de skills e memória
- `antigravity-kit/` - Kit de ferramentas
- `INTEGRATION-GUIDE.md` - Documentação
- etc.

## Como Iniciar

### Opção 1: Usar o script automático (Recomendado)

```powershell
# No PowerShell, execute:
.\start-all.ps1
```

Isso abrirá uma janela do PowerShell para cada projeto e iniciará todos automaticamente.

### Opção 2: Iniciar manualmente

**Mission Control:**
```bash
cd C:\AI\genesys\mission-control
pnpm dev --port 3000
```

**Content OS Instagram:**
```bash
cd C:\AI\genesys\SITE-TESTE\content-os-instagram
pnpm dev --port 3001
```

## Como Parar

- Feche as janelas do PowerShell onde os projetos estão rodando
- Ou use `Ctrl+C` em cada terminal

## Troubleshooting

### Porta já em uso
Se uma porta já estiver em uso, você pode:
1. Parar o processo que está usando a porta
2. Modificar a porta no script `setup-ports.ps1` e recriar as configurações

### Dependências não instaladas
Se encontrar erros de módulos faltando, execute em cada projeto:
```bash
pnpm install
```

### PowerShell bloqueando scripts
Se o PowerShell bloquear a execução dos scripts, execute primeiro:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Acesso

Após iniciar os projetos, acesse:

- http://localhost:3000 (mission-control - dashboard de orquestração)
- http://localhost:3001 (content-os-instagram)

---

**Nota:** Certifique-se de que todas as dependências estão instaladas antes de executar os projetos.
