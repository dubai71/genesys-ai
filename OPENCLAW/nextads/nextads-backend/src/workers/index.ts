import { getChannel, QUEUES } from '../queues/connection'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function startWorkers() {
    const channel = getChannel()
    channel.prefetch(1)

    // Worker de geração de imagem
    channel.consume(QUEUES.IMAGE_GENERATE, async (msg) => {
        if (!msg) return
        const { jobId, creativeId, prompt } = JSON.parse(msg.content.toString())
        try {
            await prisma.mediaJob.update({ where: { id: jobId }, data: { status: 'processing' } })
            // TODO: integrar com Nano Banana API
            console.log(`🖼️  Gerando imagem para criativo ${creativeId}: "${prompt}"`)
            // Simula geração assíncrona
            await new Promise((r) => setTimeout(r, 2000))
            const fakeUrl = `https://picsum.photos/seed/${creativeId}/800/600`
            await Promise.all([
                prisma.mediaJob.update({ where: { id: jobId }, data: { status: 'done', result: { url: fakeUrl } } }),
                prisma.creative.update({ where: { id: creativeId }, data: { url: fakeUrl, status: 'ready' } }),
            ])
            await prisma.agentLog.create({
                data: { agentType: 'creative', action: 'image_generated', reasoning: `Imagem gerada para ${creativeId}`, metadata: { url: fakeUrl } },
            })
            channel.ack(msg)
        } catch (err) {
            await prisma.mediaJob.update({ where: { id: jobId }, data: { status: 'failed' } })
            channel.nack(msg, false, false)
        }
    })

    // Worker de geração de vídeo
    channel.consume(QUEUES.VIDEO_GENERATE, async (msg) => {
        if (!msg) return
        const { jobId, creativeId, prompt } = JSON.parse(msg.content.toString())
        try {
            await prisma.mediaJob.update({ where: { id: jobId }, data: { status: 'processing' } })
            // TODO: integrar com Veo API (Google)
            console.log(`🎬 Gerando vídeo para criativo ${creativeId}: "${prompt}"`)
            await new Promise((r) => setTimeout(r, 5000))
            const fakeUrl = `https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`
            await Promise.all([
                prisma.mediaJob.update({ where: { id: jobId }, data: { status: 'done', result: { url: fakeUrl } } }),
                prisma.creative.update({ where: { id: creativeId }, data: { url: fakeUrl, status: 'ready' } }),
            ])
            await prisma.agentLog.create({
                data: { agentType: 'creative', action: 'video_generated', reasoning: `Vídeo gerado para ${creativeId}` },
            })
            channel.ack(msg)
        } catch (err) {
            await prisma.mediaJob.update({ where: { id: jobId }, data: { status: 'failed' } })
            channel.nack(msg, false, false)
        }
    })

    // Worker de métricas
    channel.consume(QUEUES.METRICS_COLLECT, async (msg) => {
        if (!msg) return
        const { campaignId } = JSON.parse(msg.content.toString())
        try {
            // TODO: integrar com Meta/Google Ads API para métricas reais
            console.log(`📊 Coletando métricas da campanha ${campaignId}`)
            await prisma.agentLog.create({
                data: { agentType: 'analyst', action: 'metrics_collected', metadata: { campaignId } },
            })
            channel.ack(msg)
        } catch {
            channel.nack(msg, false, false)
        }
    })

    console.log('✅ Workers RabbitMQ iniciados')
}
