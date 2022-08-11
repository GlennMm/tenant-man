import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PaymentCreateArgs>({
  payment: {
    one: {
      data: {
        amount: 729316,
        house: { create: { address: 'String', no_rooms: 2729581 } },
        user: { create: { email: 'String4908953', name: 'String' } },
      },
    },
    two: {
      data: {
        amount: 993649,
        house: { create: { address: 'String', no_rooms: 6730241 } },
        user: { create: { email: 'String4873783', name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
