import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import websocket from '@fastify/websocket'
import { campaignRoutes } from './modules/campaigns/routes'
import { creativeRoutes } from './modules/creatives/routes'
import { damRoutes } from './modules/dam/routes'
import { metricsRoutes } from './modules/metrics/routes'
import { scrapingRoutes } from './modules/scraping/routes'
import { agentRoutes } from './modules/agents/routes'
import { authRoutes } from './modules/auth/routes'
import { webhookRoutes } from './webhooks/routes'
import { initRabbitMQ } from './queues/connection'
import { startWorkers } from './workers'

const app = Fastify({
    logger: { level: process.env.NODE_ENV === 'production' ? 'warn' : 'info' },
})

async function bootstrap() {
    // Plugins
    await app.register(cors, {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    })

    await app.register(jwt, { secret: process.env.JWT_SECRET || 'dev_secret' })
    await app.register(multipart, { limits: { fileSize: 500 * 1024 * 1024 } }) // 500MB
    await app.register(websocket)

    // Health check
    app.get('/health', async () => ({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'nextads-backend',
    }))

    // Routes
    await app.register(authRoutes, { prefix: '/api/auth' })
    await app.register(campaignRoutes, { prefix: '/api/campaigns' })
    await app.register(creativeRoutes, { prefix: '/api/creatives' })
    await app.register(damRoutes, { prefix: '/api/dam' })
    await app.register(metricsRoutes, { prefix: '/api/metrics' })
    await app.register(scrapingRoutes, { prefix: '/api/scraping' })
    await app.register(agentRoutes, { prefix: '/api/agents' })
    await app.register(webhookRoutes, { prefix: '/api/webhooks' })

    // SSE endpoint para notificações em tempo real
    app.get('/api/events', { websocket: true }, (socket) => {
        socket.on('message', (msg) => {
            socket.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }))
        })
    })

    // RabbitMQ
    await initRabbitMQ()
    await startWorkers()

    const port = Number(process.env.PORT) || 3001
    await app.listen({ port, host: '0.0.0.0' })
    console.log(`🚀 NextAds Backend rodando em http://localhost:${port}`)
}

bootstrap().catch((err) => {
    console.error('Erro ao iniciar o servidor:', err)
    process.exit(1)
})

export { app }
