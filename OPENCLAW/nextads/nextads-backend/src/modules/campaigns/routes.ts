import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createCampaignSchema = z.object({
    name: z.string().min(1),
    budget: z.number().positive(),
    platform: z.enum(['meta', 'google', 'tiktok']),
})

const updateCampaignSchema = z.object({
    name: z.string().min(1).optional(),
    status: z.enum(['active', 'paused', 'ended']).optional(),
    budget: z.number().positive().optional(),
})

export async function campaignRoutes(app: FastifyInstance) {
    // Listar campanhas
    app.get('/', async (req) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        return prisma.campaign.findMany({
            where: { userId },
            include: {
                creatives: { select: { id: true, status: true, type: true } },
                metrics: { orderBy: { date: 'desc' }, take: 1 },
                _count: { select: { creatives: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
    })

    // Buscar campanha por ID
    app.get('/:id', async (req) => {
        await req.jwtVerify()
        const { id } = req.params as { id: string }
        const campaign = await prisma.campaign.findUnique({
            where: { id },
            include: { creatives: true, metrics: { orderBy: { date: 'desc' } } },
        })
        if (!campaign) throw new Error('Campanha não encontrada')
        return campaign
    })

    // Criar campanha
    app.post('/', async (req, reply) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        const data = createCampaignSchema.parse(req.body)
        const campaign = await prisma.campaign.create({ data: { ...data, userId } })
        return reply.status(201).send(campaign)
    })

    // Atualizar campanha
    app.patch('/:id', async (req) => {
        await req.jwtVerify()
        const { id } = req.params as { id: string }
        const data = updateCampaignSchema.parse(req.body)
        return prisma.campaign.update({ where: { id }, data })
    })

    // Pausar / ativar campanha
    app.post('/:id/toggle', async (req) => {
        await req.jwtVerify()
        const { id } = req.params as { id: string }
        const campaign = await prisma.campaign.findUniqueOrThrow({ where: { id } })
        const newStatus = campaign.status === 'active' ? 'paused' : 'active'
        return prisma.campaign.update({ where: { id }, data: { status: newStatus } })
    })

    // Deletar campanha
    app.delete('/:id', async (req, reply) => {
        await req.jwtVerify()
        const { id } = req.params as { id: string }
        await prisma.campaign.delete({ where: { id } })
        return reply.status(204).send()
    })
}
