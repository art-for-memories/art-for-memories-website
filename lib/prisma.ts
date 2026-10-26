import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const createPrismaClient = () => new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma?: ReturnType<typeof createPrismaClient> }

// Reuse one client across hot reloads in development instead of opening a new one each time
const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
