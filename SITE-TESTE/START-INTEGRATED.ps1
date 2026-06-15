# 🚀 Script de Inicialização Integrada: Mission Control + AIOX + Pixel Agent Desk
# Uso: .\START-INTEGRATED.ps1

param(
    [switch]$NoPixel,
    [switch]$NoMC,
    [switch]$Help
)

function Show-Help {
    Write-Host "=== SISTEMA INTEGRADO G.E.N.E.S.Y.S ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Inicia todos os componentes do sistema:"
    Write-Host "  1. Mission Control (porta 3000)"
    Write-Host "  2. Pixel Agent Desk (porta 3001)"
    Write-Host "  3. AIOX Core integrator"
    Write-Host ""
    Write-Host "Uso:"
    Write-Host "  .\START-INTEGRATED.ps1          # Inicia tudo"
    Write-Host "  .\START-INTEGRATED.ps1 -NoPixel  # Sem Pixel Agent Desk"
    Write-Host "  .\START-INTEGRATED.ps1 -NoMC     # Sem Mission Control"
    Write-Host "  .\START-INTEGRATED.ps1 -Help     # Esta ajuda"
    Write-Host ""
    Write-Host "Portas:"
    Write-Host "  - Mission Control: http://localhost:3000"
    Write-Host "  - Pixel Agent Desk: http://localhost:3001"
    Write-Host "  - Claude Hooks:     http://localhost:47821"
    Write-Host ""
    Write-Host "Fluxo:"
    Write-Host "  AIOX Core → Claude Code → Hooks → Pixel Desk → Mission Control"
    Write-Host ""
}

if ($Help) {
    Show-Help
    exit 0
}

Write-Host "=== INICIANDO SISTEMA INTEGRADO ===" -ForegroundColor Green
Write-Host ""

# Verificar se estamos na pasta correta
if (-not (Test-Path "mission-control-app")) {
    Write-Host "ERRO: Execute este script na pasta raiz SITE-TESTE!" -ForegroundColor Red
    exit 1
}

# 1. Verificar/Missão Control
if (-not $NoMC) {
    Write-Host "🔧 Mission Control..." -ForegroundColor Cyan

    # Verificar se já está rodando
    $mcPort = netstat -ano | Select-String ":3000"
    if ($mcPort) {
        Write-Host "  ⚠️  Porta 3000 já em uso. Mission Control pode já estar rodando." -ForegroundColor Yellow
    } else {
        # Iniciar Mission Control em background
        Push-Location mission-control-app
        Write-Host "  ▶️  Iniciando Mission Control..."
        Start-Process -FilePath "pnpm" -ArgumentList "dev" -NoNewWindow -PassThru | Out-Null
        Pop-Location
        Start-Sleep -Seconds 5
        Write-Host "  ✅ Mission Control rodando em http://localhost:3000" -ForegroundColor Green
    }
} else {
    Write-Host "⏭️  Mission Control: PULADO" -ForegroundColor Gray
}

# 2. Pixel Agent Desk
if (-not $NoPixel) {
    Write-Host "🎨 Pixel Agent Desk..." -ForegroundColor Cyan

    # Verificar se já está rodando
    $pixelPort = netstat -ano | Select-String ":3001"
    if ($pixelPort) {
        Write-Host "  ⚠️  Porta 3001 já em uso. Pixel Desk pode já estar rodando." -ForegroundColor Yellow
    } else {
        # Iniciar Pixel Agent Desk em background
        Push-Location "mission-control-app/pixel-agent-desk"
        Write-Host "  ▶️  Iniciando Pixel Agent Desk..."
        # Verificar se node_modules existe
        if (-not (Test-Path "node_modules")) {
            Write-Host "  📦 Instalando dependências..." -ForegroundColor Yellow
            npm install
        }
        Start-Process -FilePath "npm" -ArgumentList "start" -NoNewWindow -PassThru | Out-Null
        Pop-Location
        Start-Sleep -Seconds 3
        Write-Host "  ✅ Pixel Agent Desk rodando em http://localhost:3001" -ForegroundColor Green
    }
} else {
    Write-Host "⏭️  Pixel Agent Desk: PULADO" -ForegroundColor Gray
}

# 3. Verificar hooks do Claude
Write-Host "🔌 Claude Code Hooks..." -ForegroundColor Cyan
$hookConfig = "$env:USERPROFILE\.claude\settings.json"
if (Test-Path $hookConfig) {
    $config = Get-Content $hookConfig | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($config.hooks) {
        Write-Host "  ✅ Hooks configurados em $hookConfig" -ForegroundColor Green

        # Verificar se tem hook do Pixel Desk (porta 47821)
        $hasHook = $false
        foreach ($event in $config.hooks.PSObject.Properties) {
            if ($event.Value -match "47821") {
                $hasHook = $true
                break
            }
        }
        if ($hasHook) {
            Write-Host "  ✅ Hook do Pixel Agent Desk encontrado (porta 47821)" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Hook do Pixel Agent Desk NÃO encontrado. Execute dentro de pixel-agent-desk:" -ForegroundColor Yellow
            Write-Host "     npm run install (ou o postinstall automático)" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ℹ️  Nenhum hook configurado ainda." -ForegroundColor Gray
    }
} else {
    Write-Host "  ℹ️  Claude Code ainda não configurado." -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== SISTEMA PRONTO! ===" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Acesse:" -ForegroundColor Cyan
Write-Host "   Mission Control: http://localhost:3000"
Write-Host "   Pixel Agent Desk: http://localhost:3001"
Write-Host ""
Write-Host "📋 Status:" -ForegroundColor Cyan
Write-Host "   - AIOX Core: Manual (use 'npm run aiox' em horus-project/)" -ForegroundColor Gray
Write-Host "   - Agentes Auto-registrados via Claude Code hooks" -ForegroundColor Gray
Write-Host ""
Write-Host "🎯 Para executar um agente AIOX:" -ForegroundColor Yellow
Write-Host "   cd horus-project && npm run aiox agent create meu-agente" -ForegroundColor White
Write-Host "   cd horus-project && npm run aiox agent run <agent-id>" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Para parar todos os serviços:" -ForegroundColor Red
Write-Host "   taskkill //F //IM node.exe" -ForegroundColor White
Write-Host ""
