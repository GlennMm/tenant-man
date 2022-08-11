import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.InvoiceCreateArgs>({
  invoice: {
    one: {
      data: {
        amount: 499452,
        mounth: 6994031,
        year: 1675418,
        user: { create: { email: 'String1466600', name: 'String' } },
      },
    },
    two: {
      data: {
        amount: 3407787,
        mounth: 7853322,
        year: 9744351,
        user: { create: { email: 'String5105256', name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
