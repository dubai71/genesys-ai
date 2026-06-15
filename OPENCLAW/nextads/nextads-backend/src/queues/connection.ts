import amqplib, { Channel, Connection } from 'amqplib'

let connection: Connection | null = null
let channel: Channel | null = null

export const EXCHANGE = 'nextads.direct'

export const QUEUES = {
    IMAGE_GENERATE: 'nextads.image.generate',
    VIDEO_GENERATE: 'nextads.video.generate',
    SCRAPING_RUN: 'nextads.scraping.run',
    CAMPAIGN_PUBLISH: 'nextads.campaign.publish',
    METRICS_COLLECT: 'nextads.metrics.collect',
} as const

export const ROUTING_KEYS = {
    IMAGE_GENERATE: 'image.generate',
    VIDEO_GENERATE: 'video.generate',
    SCRAPING_RUN: 'scraping.run',
    CAMPAIGN_PUBLISH: 'campaign.publish',
    METRICS_COLLECT: 'metrics.collect',
} as const

export async function initRabbitMQ() {
    const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672'
    connection = await amqplib.connect(url)
    channel = await connection.createChannel()

    // Exchange
    await channel.assertExchange(EXCHANGE, 'direct', { durable: true })

    // Filas
    for (const queue of Object.values(QUEUES)) {
        await channel.assertQueue(queue, { durable: true })
        const routingKey = queue.replace('nextads.', '')
        await channel.bindQueue(queue, EXCHANGE, routingKey)
    }

    console.log('✅ RabbitMQ conectado e filas configuradas')
    return channel
}

export function getChannel(): Channel {
    if (!channel) throw new Error('RabbitMQ não inicializado')
    return channel
}

export async function publishToQueue(routingKey: string, payload: object) {
    const ch = getChannel()
    ch.publish(
        EXCHANGE,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    )
}
