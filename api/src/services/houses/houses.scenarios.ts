import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.HouseCreateArgs>({
  house: {
    one: { data: { address: 'String', no_rooms: 7739128 } },
    two: { data: { address: 'String', no_rooms: 7201702 } },
  },
})

export type StandardScenario = typeof standard
