# Script PowerShell para organizar o projeto SITE-TESTE
# Executar: .\organize-project.ps1

$ErrorActionPreference = "Continue"
Write-Host "=== ORGANIZAÇÃO DO PROJETO SITE-TESTE ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar processos rodando
Write-Host "🔍 Verificando processos em uso..." -ForegroundColor Yellow
$port3000 = netstat -ano | Select-String ":3000"
if ($port3000) {
    Write-Host "  ⚠️  Porta 3000 em uso (Mission Control rodando)"
    Write-Host "  💡 Para parar: taskkill /PID <PID> /F"
}

# 2. Parar serviços que possam estar usando as pastas
# (pixel-agent-desk, mission-control-app)
Write-Host ""
Write-Host "🛑 Parando serviços..." -ForegroundColor Yellow
# Não pará automático, avisar o usuário

# 3. Mover scripts de mission-control/ para mission-control-app/
Write-Host ""
Write-Host "📦 Consolidando mission-control/..." -ForegroundColor Cyan
$srcScripts = "mission-control/scripts/"
$destScripts = "mission-control-app/scripts/"

if (Test-Path $srcScripts) {
    $files = Get-ChildItem $srcScripts -File
    if ($files.Count -gt 0) {
        Copy-Item "$srcScripts*" $destScripts -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ Scripts copiados para mission-control-app/scripts/"
    } else {
        Write-Host "  ℹ️  Pasta mission-control/scripts/ vazia"
    }
}

# 4. Identificar duplicatas
Write-Host ""
Write-Host "🔍 Identificando duplicatas..." -ForegroundColor Yellow

$duplicates = @()
if (Test-Path "pixel-agent-desk" -PathType Container) {
    $duplicates += "pixel-agent-desk/"
}
if (Test-Path "pixel-agent-desk-new" -PathType Container) {
    $duplicates += "pixel-agent-desk-new/"
}

if ($duplicates.Count -gt 0) {
    Write-Host "  ⚠️  Duplicatas encontradas:" -ForegroundColor Red
    $duplicates | ForEach-Object { Write-Host "    - $_" }
    Write-Host "  💡 Serão movidas para temp/ e deletadas após confirmação"
}

# 5. Pastas vazias
$emptyFolders = @()
if (Test-Path "pagina-dark" -PathType Container) {
    $items = Get-ChildItem "pagina-dark"
    if ($items.Count -eq 0) {
        $emptyFolders += "pagina-dark/"
    }
}

if ($emptyFolders.Count -gt 0) {
    Write-Host "  ℹ️  Pastas vazias encontradas:" -ForegroundColor Gray
    $emptyFolders | ForEach-Object { Write-Host "    - $_ (será removida)" }
}

# 6. Criar plano de reorganização
Write-Host ""
Write-Host "📋 PLANO DE REORGANIZAÇÃO:" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ MANTER (estrutura final):" -ForegroundColor Green
Write-Host "   ├── mission-control-app/      (Next.js + Pixel Desk integrado)"
Write-Host "   │   ├── src/                (código principal)"
Write-Host "   │   ├── pixel-agent-desk/   (visualização de agentes)"
Write-Host "   │   └── scripts/            (scripts consolidados)"
Write-Host "   ├── horus-project/           (frontend React Genesys)"
Write-Host "   ├── aiox-core/               (sistema de orquestração)"
Write-Host "   └── antigravity-kit/         (skills especializados)"
Write-Host ""
Write-Host "🗑️  REMOVER:" -ForegroundColor Red
Write-Host "   ├── mission-control/         (scripts já copiados)"
Write-Host "   ├── pixel-agent-desk/        (duplicado)"
Write-Host "   ├── pixel-agent-desk-new/    (duplicado)"
Write-Host "   └── pagina-dark/             (vazia)"
Write-Host ""
Write-Host "Por segurança, os arquivos serão movidos para:" -ForegroundColor Gray
Write-Host "   temp/backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')/"
Write-Host ""
Write-Host "⚠️  Para EXECUTAR a reorganização, finalize todos os processos e execute:" -ForegroundColor Yellow
Write-Host "   .\organize-project.ps1 -Execute" -ForegroundColor White
Write-Host ""

# Se -Execute foi passado, realmente executar
if ($args -contains "-Execute") {
    Write-Host "🚀 EXECUTANDO REORGANIZAÇÃO..." -ForegroundColor Green
    Write-Host ""

    # Criar backup
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupDir = "temp/backup-$timestamp"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

    # Mover para backup antes de deletar
    $toBackup = @("mission-control", "pixel-agent-desk", "pixel-agent-desk-new", "pagina-dark")
    foreach ($item in $toBackup) {
        if (Test-Path $item) {
            Move-Item $item "$backupDir/" -Force -ErrorAction SilentlyContinue
            Write-Host "  ✓ $item → $backupDir/"
        }
    }

    Write-Host ""
    Write-Host "✅ REORGANIZAÇÃO CONCLUÍDA!" -ForegroundColor Green
    Write-Host "   Backup salvo em: $backupDir"
    Write-Host ""
    Write-Host "📂 Estrutura final:" -ForegroundColor Cyan
    Get-ChildItem -Directory | Select-Object Name | ForEach-Object {
        Write-Host "   ├── $($_.Name)/"
    }
    Write-Host ""
    Write-Host "🎯 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Configurar mission-control-app/.env"
    Write-Host "   2. Ajustar porta do Pixel Agent Desk (3001)"
    Write-Host "   3. Testar integração com AIOX"
    Write-Host ""
}
