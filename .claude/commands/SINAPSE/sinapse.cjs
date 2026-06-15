const { readdir } = require('fs');
const { join } = require('path');

const AGENTS_DIR = join(__dirname, 'agents');

// Agent definitions from .md files
const AGENTS = [
  { id: 'analyst', name: 'Analyst', persona: 'Alex', role: 'Pesquisa e análise' },
  { id: 'architect', name: 'Architect', persona: 'Aria', role: 'Arquitetura e design técnico' },
  { id: 'data-engineer', name: 'Data Engineer', persona: 'Dara', role: 'Database design' },
  { id: 'developer', name: 'Developer', persona: 'Pixel', role: 'Implementação de código' },
  { id: 'devops', name: 'DevOps', persona: 'Pipeline', role: 'CI/CD, deployment' },
  { id: 'product-lead', name: 'Product Lead', persona: 'Axis', role: 'Product Owner, stories/epics' },
  { id: 'project-lead', name: 'Project Lead', persona: 'Beacon', role: 'Product Management' },
  { id: 'quality-gate', name: 'Quality Gate', persona: 'Litmus', role: 'Testes e qualidade' },
  { id: 'sprint-lead', name: 'Sprint Lead', persona: 'Sync', role: 'Scrum Master' },
  { id: 'ux-design-expert', name: 'UX Design Expert', persona: 'Mosaic', role: 'UX/UI design' },
  { id: 'snps-orqx', name: 'SINAPSE Orchestrator', persona: 'Orqx', role: 'Orquestração master' },
  { id: 'squad-creator', name: 'Squad Creator', persona: 'Creator', role: 'Criação de squads' },
];

// Usage: /sinapse [agentId] [message]
// No args: show menu
// With agentId: delegate to that agent

const [,, ...args] = process.argv;

if (args.length === 0) {
  console.log(`
# AGENTES SINAPSE

Selecione um agente para ativar:

\`\`\`
`);
  AGENTS.forEach((a, i) => {
    console.log(`${i + 1}. @${a.id} — ${a.persona} (${a.role})`);
  });
  console.log(`
Use: \`@agent-name <sua mensagem>\` para ativar.
Exemplo: \`@developer implementar login\`
`);
  process.exit(0);
}

// Direct delegation: /sinapse <agentId> [message]
const agentId = args[0];
const message = args.slice(1).join(' ');

const agent = AGENTS.find(a => a.id === agentId || a.name.toLowerCase() === agentId.toLowerCase());

if (!agent) {
  console.log(`❌ Agente "${agentId}" não encontrado. Use /sinapse para ver a lista.`);
  process.exit(1);
}

// Output activation instruction for the user
console.log(`
🔁 **Delegando para @${agent.id}**

**Agente:** ${agent.persona} — ${agent.role}

Digite sua mensagem a seguir ou use:

\`\`\`
@${agent.id} ${message || '[sua mensagem]'}
\`\`\`
`);
process.exit(0);
