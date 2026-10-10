import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Lazily returns a singleton PrismaClient.
 * Throws if DATABASE_URL isn't configured — callers that want graceful
 * fallback should check `isDbConfigured()` first.
 */
export function getPrisma(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — database is not configured.");
  }
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export function isDbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}
