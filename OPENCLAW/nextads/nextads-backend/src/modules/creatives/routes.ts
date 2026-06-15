import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { publishToQueue, ROUTING_KEYS } from '../../queues/connection'
import { z } from 'zod'

const prisma = new PrismaClient()

const generateCreativeSchema = z.object({
    campaignId: z.string(),
    type: z.enum(['image', 'video']),
    prompt: z.string(),
    postId: z.string().optional(),
})

export async function creativeRoutes(app: FastifyInstance) {
    app.get('/', async (req) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        return prisma.creative.findMany({
            where: { campaign: { userId } },
            include: { campaign: { select: { name: true, platform: true } } },
            orderBy: { createdAt: 'desc' },
        })
    })

    app.post('/generate', async (req, reply) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        const { campaignId, type, prompt, postId } = generateCreativeSchema.parse(req.body)

        // Cria o criativo com status pending
        const creative = await prisma.creative.create({
            data: { campaignId, type, url: '', prompt, status: 'pending' },
        })

        // Cria o job na fila
        const job = await prisma.mediaJob.create({
            data: {
                type,
                payload: { creativeId: creative.id, prompt, postId, userId },
                campaignId,
            },
        })

        // Enfileira no RabbitMQ
        const routingKey = type === 'image' ? ROUTING_KEYS.IMAGE_GENERATE : ROUTING_KEYS.VIDEO_GENERATE
        await publishToQueue(routingKey, { jobId: job.id, creativeId: creative.id, prompt, type })

        return reply.status(202).send({ message: 'Criativo em geração', creative, job })
    })

    app.patch('/:id/status', async (req) => {
        await req.jwtVerify()
        const { id } = req.params as { id: string }
        const { status } = req.body as { status: string }
        return prisma.creative.update({ where: { id }, data: { status } })
    })
}
