import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String6669337', name: 'String' } },
    two: { data: { email: 'String4300204', name: 'String' } },
  },
})

export type StandardScenario = typeof standard
