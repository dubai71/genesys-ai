#!/usr/bin/env bash
# Iniciar todos os agentes G.E.N.E.S.Y.S simultaneamente

echo "🚀 Iniciando todos os agentes G.E.N.E.S.Y.S..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Agent configurations
AGENTS=(
  "aiox-orchestrator-agent.js:AIOX Master (Orion)"
  "agents/dev-agent.js:Developer (Dex)"
  "agents/qa-agent.js:QA (Quinn)"
  "agents/architect-agent.js:Architect (Aria)"
  "agents/pm-agent.js:PM (Morgan)"
)

cd "$(dirname "$0")"

for agent in "${AGENTS[@]}"; do
  IFS=':' read -r file name <<< "$agent"
  echo -e "${BLUE}▶️  Iniciando $name...${NC}"
  MISSION_CONTROL_API_KEY="${MISSION_CONTROL_API_KEY:-31f1ca8667fcdeec3a9b869f3b845cef1bd692cf6e950bbb1be3efda1a3a5a16}" \
  node "$file" &
  sleep 1
done

echo ""
echo -e "${GREEN}✅ Todos os agentes iniciados!${NC}"
echo ""
echo "📊 Verificando registros..."
sleep 3

# Verificar se agentes estão registrados
echo ""
echo "Agentes ativos no Mission Control:"
curl -s http://localhost:3000/api/agents \
  -H "x-api-key: ${MISSION_CONTROL_API_KEY:-31f1ca8667fcdeec3a9b869f3b845cef1bd692cf6e950bbb1be3efda1a3a5a16}" \
  | jq '.agents[] | {id, name, status}' 2>/dev/null || echo "Erro ao consultar API"

echo ""
echo "⌨️  Pressione Ctrl+C para parar todos os agentes"
wait
