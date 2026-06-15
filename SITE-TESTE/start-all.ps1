# Script para iniciar todos os projetos WEB em portas diferentes

$projects = @(
    @{Name = "area-de-membro"; Port = 5173; Path = "C:\AI\genesys\SITE-TESTE\area-de-membro"; Type = "vite"},
    @{Name = "content-os-instagram"; Port = 3001; Path = "C:\AI\genesys\SITE-TESTE\content-os-instagram"; Type = "nextjs"},
    @{Name = "horus-project"; Port = 3002; Path = "C:\AI\genesys\SITE-TESTE\horus-project"; Type = "nextjs"},
    @{Name = "mission-control-app"; Port = 3004; Path = "C:\AI\genesys\SITE-TESTE\mission-control-app"; Type = "nextjs"}
)

Write-Host "Iniciando todos os projetos WEB..." -ForegroundColor Green

foreach ($project in $projects) {
    Write-Host "`n=== Iniciando $($project.Name) na porta $($project.Port) ===" -ForegroundColor Yellow

    if ($project.Type -eq "vite") {
        $command = "pnpm dev --port $($project.Port) --host"
    } elseif ($project.Type -eq "nextjs") {
        $command = "pnpm dev --port $($project.Port)"
    }

    # Inicia o processo em uma nova janela
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$($project.Path)`"; $command"
    Start-Sleep -Seconds 2
}

Write-Host "`nTodos os projetos WEB estão sendo iniciados..." -ForegroundColor Green
Write-Host "Aguarde alguns segundos para que todos os servidores estejam rodando." -ForegroundColor Yellow

Write-Host "`n=== URLs ===" -ForegroundColor Cyan
foreach ($project in $projects) {
    $url = "http://localhost:$($project.Port)"
    Write-Host "$($project.Name) -> $url" -ForegroundColor White
}

Write-Host "`nPara parar todos os projetos, feche as janelas do PowerShell ou use Ctrl+C em cada uma." -ForegroundColor Red
