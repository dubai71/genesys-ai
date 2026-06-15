@echo off
REM Iniciar todos os agentes G.E.N.E.S.Y.S simultaneamente (Windows)

echo 🚀 Iniciando todos os agentes G.E.N.E.S.Y.S...
echo.

setlocal enabledelayedexpansion

REM Agent configurations
set AGENTS=aiox-orchestrator-agent.js "AIOX Master (Orion)" ^
           agents\dev-agent.js "Developer (Dex)" ^
           agents\qa-agent.js "QA (Quinn)" ^
           agents\architect-agent.js "Architect (Aria)" ^
           agents\pm-agent.js "PM (Morgan)"

cd /d "%~dp0"

for %%i in (0 2 4 6 8) do (
  set "file=!AGENTS[%%i]!"
  set "name=!AGENTS[%%i+1]!"
  echo ▶️  Iniciando !name!...
  start "AIOX - !name!" cmd /c "MISSION_CONTROL_API_KEY=31f1ca8667fcdeec3a9b869f3b845cef1bd692cf6e950bbb1be3efda1a3a5a16 node !file!"
  timeout /t 1 /nobreak >nul
)

echo.
echo ✅ Todos os agentes iniciados em janelas separadas!
echo.
echo 📊 Verificando registros...
timeout /t 3 /nobreak >nul

echo.
echo Agentes ativos no Mission Control:
curl -s http://localhost:3000/api/agents -H "x-api-key: 31f1ca8667fcdeec3a9b869f3b845cef1bd692cf6e950bbb1be3efda1a3a5a16"
echo.
echo Pressione qualquer tecla para verificar heartbeat logs...
pause >nul
