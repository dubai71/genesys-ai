import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const registerSchema = loginSchema.extend({ name: z.string().min(2) })

export async function authRoutes(app: FastifyInstance) {
    app.post('/register', async (req, reply) => {
        const { email, name, password } = registerSchema.parse(req.body)
        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, name, password: hashed },
            select: { id: true, email: true, name: true, role: true },
        })
        const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role })
        return reply.status(201).send({ user, token })
    })

    app.post('/login', async (req, reply) => {
        const { email, password } = loginSchema.parse(req.body)
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return reply.status(401).send({ error: 'Credenciais inválidas' })
        }
        const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role })
        return {
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token,
        }
    })

    app.get('/me', async (req) => {
        await req.jwtVerify()
        const { id } = req.user as { id: string }
        return prisma.user.findUniqueOrThrow({
            where: { id },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        })
    })
}
