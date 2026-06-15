import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export async function metricsRoutes(app: FastifyInstance) {
    app.get('/overview', async (req) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }

        const campaigns = await prisma.campaign.findMany({ where: { userId }, select: { id: true } })
        const campaignIds = campaigns.map((c) => c.id)

        const [totalImpressions, totalClicks, totalSpend, avgRoas] = await Promise.all([
            prisma.metric.aggregate({ _sum: { impressions: true }, where: { campaignId: { in: campaignIds } } }),
            prisma.metric.aggregate({ _sum: { clicks: true }, where: { campaignId: { in: campaignIds } } }),
            prisma.metric.aggregate({ _sum: { spend: true }, where: { campaignId: { in: campaignIds } } }),
            prisma.metric.aggregate({ _avg: { roas: true }, where: { campaignId: { in: campaignIds } } }),
        ])

        return {
            impressions: totalImpressions._sum.impressions ?? 0,
            clicks: totalClicks._sum.clicks ?? 0,
            spend: totalSpend._sum.spend ?? 0,
            roas: avgRoas._avg.roas ?? 0,
            ctr: totalClicks._sum.clicks && totalImpressions._sum.impressions
                ? ((totalClicks._sum.clicks / totalImpressions._sum.impressions) * 100).toFixed(2)
                : 0,
        }
    })

    app.get('/campaign/:id', async (req) => {
        await req.jwtVerify()
        const { id } = req.params as { id: string }
        return prisma.metric.findMany({
            where: { campaignId: id },
            orderBy: { date: 'asc' },
        })
    })
}

export async function agentRoutes(app: FastifyInstance) {
    app.get('/logs', async (req) => {
        await req.jwtVerify()
        return prisma.agentLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        })
    })
}

export async function scrapingRoutes(app: FastifyInstance) {
    const addProfileSchema = z.object({
        handle: z.string(),
        platform: z.enum(['instagram', 'tiktok', 'youtube']),
    })

    app.get('/profiles', async (req) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        return prisma.profile.findMany({ where: { userId }, include: { _count: { select: { posts: true } } } })
    })

    app.post('/profiles', async (req, reply) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        const data = addProfileSchema.parse(req.body)
        const profile = await prisma.profile.create({ data: { ...data, userId } })
        return reply.status(201).send(profile)
    })

    app.get('/feed', async (req) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        return prisma.post.findMany({
            where: { profile: { userId } },
            include: { profile: { select: { handle: true, platform: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50,
        })
    })
}

export async function damRoutes(app: FastifyInstance) {
    app.get('/', async (req) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        return prisma.asset.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    })

    app.post('/upload', async (req, reply) => {
        await req.jwtVerify()
        const { id: userId } = req.user as { id: string }
        // TODO: integrar com Cloudflare R2 para upload real
        const { name, type, url, description } = req.body as {
            name: string; type: string; url: string; description?: string
        }
        const asset = await prisma.asset.create({ data: { name, type, url, description, userId } })
        return reply.status(201).send(asset)
    })
}

export async function webhookRoutes(app: FastifyInstance) {
    app.post('/media-ready', async (req, reply) => {
        const { jobId, creativeId, url, status } = req.body as {
            jobId: string; creativeId: string; url: string; status: string
        }

        await Promise.all([
            prisma.mediaJob.update({ where: { id: jobId }, data: { status, result: { url } } }),
            prisma.creative.update({ where: { id: creativeId }, data: { url, status: 'ready' } }),
        ])

        // TODO: notificar frontend via SSE/WebSocket
        return reply.send({ ok: true })
    })
}
