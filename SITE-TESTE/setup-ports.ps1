# Script de Configuração de Portas para Projetos Web
# Apenas projetos que rodam em servidor local (localhost)

$projects = @(
    @{Name = "area-de-membro"; Port = 5173; Path = "C:\AI\genesys\SITE-TESTE\area-de-membro"; Type = "vite"},
    @{Name = "content-os-instagram"; Port = 3001; Path = "C:\AI\genesys\SITE-TESTE\content-os-instagram"; Type = "nextjs"},
    @{Name = "horus-project"; Port = 3002; Path = "C:\AI\genesys\SITE-TESTE\horus-project"; Type = "nextjs"},
    @{Name = "mission-control-app"; Port = 3004; Path = "C:\AI\genesys\SITE-TESTE\mission-control-app"; Type = "nextjs"}
)

Write-Host "Configurando portas para os projetos WEB..." -ForegroundColor Green

foreach ($project in $projects) {
    Write-Host "`nProjeto: $($project.Name)" -ForegroundColor Yellow
    Write-Host "Porta: $($project.Port)" -ForegroundColor Cyan
    Write-Host "Tipo: $($project.Type)" -ForegroundColor Cyan
    Write-Host "Caminho: $($project.Path)" -ForegroundColor Gray

    if ($project.Type -eq "vite") {
        $command = "cd `"$($project.Path)`" && pnpm dev --port $($project.Port) --host"
    } elseif ($project.Type -eq "nextjs") {
        $command = "cd `"$($project.Path)`" && pnpm dev --port $($project.Port)"
    }

    Write-Host "Comando: $command" -ForegroundColor White
}

Write-Host "`n=== LISTA DE URLs ===" -ForegroundColor Green
foreach ($project in $projects) {
    $url = "http://localhost:$($project.Port)"
    Write-Host "$($project.Name): $url" -ForegroundColor Cyan
}

Write-Host "`nPara iniciar todos os projetos, execute cada comando em uma janela separada do terminal." -ForegroundColor Yellow
Write-Host "Ou use o script start-all.ps1 para iniciar todos de uma vez." -ForegroundColor Yellow
