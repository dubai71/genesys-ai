#!/usr/bin/env node
/**
 * AIOX PM Agent (Morgan) - Integração com Mission Control
 *
 * Agente Product Manager especializado em requisitos, priorização e
 * especificações.
 */

const MC_URL = 'http://localhost:3000';
const MC_API_KEY = process.env.MISSION_CONTROL_API_KEY ||
  '31f1ca8667fcdeec3a9b869f3b845cef1bd692cf6e950bbb1be3efda1a3a5a16';
const AGENT_ID = 'pm-morgan';

const HEARTBEAT_INTERVAL = 10000; // 10s
const POLL_INTERVAL = 15000; // 15s

let isRunning = true;
let currentTask = null;
let lastAssignmentPoll = 0;

// Log com timestamp
function log(msg, type = 'INFO') {
  const icons = {
    INFO: '📋',
    REGISTER: '📝',
    HEARTBEAT: '💓',
    ASSIGNMENT: '📥',
    REPORT: '📊',
    ERROR: '❌',
    DISCONNECT: '👋'
  };
  const icon = icons[type] || '🤖';
  console.log(`[${new Date().toISOString()}] ${icon} [${AGENT_ID}] ${msg}`);
}

// HTTP request
async function mcRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'x-api-key': MC_API_KEY,
    'Content-Type': 'application/json'
  };
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${MC_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    log(`Request failed: ${error.message}`, 'ERROR');
    throw error;
  }
}

// Registrar agente
async function register() {
  log('Registrando no Mission Control...', 'REGISTER');
  const payload = {
    framework: 'aiox-core',
    action: 'register',
    payload: {
      agentId: AGENT_ID,
      name: 'Morgan (PM)',
      metadata: {
        role: 'product-manager',
        capabilities: ['requirements', 'prioritization', 'specs', 'backlog'],
        icon: '📋',
        level: 'executive'
      }
    }
  };
  await mcRequest('/api/adapters', 'POST', payload);
  log('Registrado com sucesso!', 'REGISTER');
}

// Enviar heartbeat
async function heartbeat() {
  const payload = {
    framework: 'aiox-core',
    action: 'heartbeat',
    payload: {
      agentId: AGENT_ID,
      status: 'active',
      metadata: {
        currentTask: currentTask?.id || null,
        uptime: Math.floor(process.uptime()),
        memory: process.memoryUsage().rss / 1024 / 1024
      }
    }
  };
  await mcRequest('/api/adapters', 'POST', payload);
  log('Heartbeat enviado', 'HEARTBEAT');
}

// Buscar assignments
async function pollAssignments() {
  try {
    const payload = {
      framework: 'aiox-core',
      action: 'assignments',
      payload: {
        agentId: AGENT_ID
      }
    };
    const response = await mcRequest('/api/adapters', 'POST', payload);
    const tasks = response.tasks || [];

    if (tasks.length > 0) {
      log(`${tasks.length} tarefa(s) recebida(s)`, 'ASSIGNMENT');
      // Pegar a primeira tarefa
      const task = tasks[0];
      await acceptTask(task);
    }
  } catch (error) {
    log(`Erro ao buscar tarefas: ${error.message}`, 'ERROR');
  }
}

// Aceitar e processar tarefa
async function acceptTask(task) {
  currentTask = task;
  log(`Iniciando tarefa #${task.id}: ${task.title}`, 'ASSIGNMENT');

  // Simular processamento de PM
  await processPMTask(task);
}

// Processar tarefa (simulação)
async function processPMTask(task) {
  const steps = [
    { progress: 10, msg: 'Analisando requisitos...' },
    { progress: 30, msg: 'Priorizando features...' },
    { progress: 50, msg: 'Escrevendo especificações...' },
    { progress: 70, msg: 'Revisando com stakeholders...' },
    { progress: 90, msg: 'Finalizando PRD...' },
    { progress: 100, msg: 'Tarefa completa!' }
  ];

  for (const step of steps) {
    await reportProgress(task.id, step.progress, step.msg);
    await sleep(2000 + Math.random() * 3000);
  }

  await completeTask(task);
}

// Reportar progresso
async function reportProgress(taskId, progress, output = null) {
  const payload = {
    framework: 'aiox-core',
    action: 'report',
    payload: {
      taskId,
      agentId: AGENT_ID,
      progress,
      status: progress < 100 ? 'in_progress' : 'completed',
      output
    }
  };
  await mcRequest('/api/adapters', 'POST', payload);
  if (output) log(output, 'REPORT');
}

// Completar tarefa
async function completeTask(task) {
  log(`Tarefa #${task.id} completada!`, 'REPORT');
  currentTask = null;
}

// Enviar disconnect
async function disconnect() {
  log('Encerrando conexão...', 'DISCONNECT');
  const payload = {
    framework: 'aiox-core',
    action: 'disconnect',
    payload: {
      agentId: AGENT_ID
    }
  };
  try {
    await mcRequest('/api/adapters', 'POST', payload);
  } catch (error) {
    // Ignorar erros no shutdown
  }
}

// Aguardar
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Handlers
process.on('SIGINT', async () => {
  isRunning = false;
  await disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  isRunning = false;
  await disconnect();
  process.exit(0);
});

// Main loop
async function start() {
  log('Iniciando agente PM (Morgan)...', 'INFO');

  // Registrar
  await register();

  // Loop principal
  let lastHeartbeat = Date.now();
  let lastPoll = Date.now();

  while (isRunning) {
    const now = Date.now();

    // Heartbeat a cada 10s
    if (now - lastHeartbeat >= HEARTBEAT_INTERVAL) {
      await heartbeat();
      lastHeartbeat = now;
    }

    // Poll de assignments a cada 15s
    if (now - lastPoll >= POLL_INTERVAL) {
      await pollAssignments();
      lastPoll = now;
    }

    await sleep(1000);
  }
}

start().catch(error => {
  log(`Fatal: ${error.message}`, 'ERROR');
  process.exit(1);
});
