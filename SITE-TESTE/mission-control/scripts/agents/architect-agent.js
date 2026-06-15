#!/usr/bin/env node
/**
 * AIOX Architect Agent (Aria) - Integração com Mission Control
 *
 * Agente arquiteto de sistemas especializado em design técnico, arquitetura e padrões.
 */

const MC_URL = 'http://localhost:3000';
const MC_API_KEY = process.env.MISSION_CONTROL_API_KEY ||
  '31f1ca8667fcdeec3a9b869f3b845cef1bd692cf6e950bbb1be3efda1a3a5a16';
const AGENT_ID = 'architect-aria';

const HEARTBEAT_INTERVAL = 10000;
const POLL_INTERVAL = 15000;

let isRunning = true;
let currentTask = null;

function log(msg, type = 'INFO') {
  const icons = { INFO: '🏛️', REGISTER: '📝', HEARTBEAT: '💓', ASSIGNMENT: '📥', REPORT: '📊', ERROR: '❌', DISCONNECT: '👋' };
  const icon = icons[type] || '🤖';
  console.log(`[${new Date().toISOString()}] ${icon} [${AGENT_ID}] ${msg}`);
}

async function mcRequest(endpoint, method = 'GET', body = null) {
  const headers = { 'x-api-key': MC_API_KEY, 'Content-Type': 'application/json' };
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  try {
    const response = await fetch(`${MC_URL}${endpoint}`, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    log(`Request failed: ${error.message}`, 'ERROR');
    throw error;
  }
}

async function register() {
  log('Registrando no Mission Control...', 'REGISTER');
  await mcRequest('/api/adapters', 'POST', {
    framework: 'aiox-core',
    action: 'register',
    payload: {
      agentId: AGENT_ID,
      name: 'Aria (Architect)',
      metadata: {
        role: 'architect',
        capabilities: ['system-design', 'patterns', 'scalability', 'tech-selection'],
        icon: '🏛️',
        level: 'strategic'
      }
    }
  });
  log('Registrado com sucesso!', 'REGISTER');
}

async function heartbeat() {
  await mcRequest('/api/adapters', 'POST', {
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
  });
  log('Heartbeat enviado', 'HEARTBEAT');
}

async function pollAssignments() {
  try {
    const response = await mcRequest('/api/adapters', 'POST', {
      framework: 'aiox-core',
      action: 'assignments',
      payload: { agentId: AGENT_ID }
    });
    const tasks = response.tasks || [];
    if (tasks.length > 0) {
      log(`${tasks.length} tarefa(s) recebida(s)`, 'ASSIGNMENT');
      await acceptTask(tasks[0]);
    }
  } catch (error) {
    log(`Erro ao buscar tarefas: ${error.message}`, 'ERROR');
  }
}

async function acceptTask(task) {
  currentTask = task;
  log(`Iniciando tarefa #${task.id}: ${task.title}`, 'ASSIGNMENT');
  await processArchitectTask(task);
}

async function processArchitectTask(task) {
  const steps = [
    { progress: 10, msg: 'Analisando requisitos...' },
    { progress: 25, msg: 'Definindo contexto...' },
    { progress: 40, msg: 'Desenhando arquitetura...' },
    { progress: 55, msg: 'Selecionando tecnologias...' },
    { progress: 70, msg: 'Documentando padrões...' },
    { progress: 85, msg: 'Revisão de decisões...' },
    { progress: 100, msg: 'Arquitetura definida!' }
  ];
  for (const step of steps) {
    await reportProgress(task.id, step.progress, step.msg);
    await sleep(2500 + Math.random() * 3500);
  }
  await completeTask(task);
}

async function reportProgress(taskId, progress, output = null) {
  await mcRequest('/api/adapters', 'POST', {
    framework: 'aiox-core',
    action: 'report',
    payload: {
      taskId,
      agentId: AGENT_ID,
      progress,
      status: progress < 100 ? 'in_progress' : 'completed',
      output
    }
  });
  if (output) log(output, 'REPORT');
}

async function completeTask(task) {
  log(`Tarefa #${task.id} completada!`, 'REPORT');
  currentTask = null;
}

async function disconnect() {
  log('Encerrando conexão...', 'DISCONNECT');
  try {
    await mcRequest('/api/adapters', 'POST', {
      framework: 'aiox-core',
      action: 'disconnect',
      payload: { agentId: AGENT_ID }
    });
  } catch (error) {}
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

process.on('SIGINT', async () => { isRunning = false; await disconnect(); process.exit(0); });
process.on('SIGTERM', async () => { isRunning = false; await disconnect(); process.exit(0); });

async function start() {
  log('Iniciando agente Architect (Aria)...', 'INFO');
  await register();
  let lastHeartbeat = Date.now(), lastPoll = Date.now();
  while (isRunning) {
    const now = Date.now();
    if (now - lastHeartbeat >= HEARTBEAT_INTERVAL) { await heartbeat(); lastHeartbeat = now; }
    if (now - lastPoll >= POLL_INTERVAL) { await pollAssignments(); lastPoll = now; }
    await sleep(1000);
  }
}

start().catch(error => { log(`Fatal: ${error.message}`, 'ERROR'); process.exit(1); });
