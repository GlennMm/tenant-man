import { houses, house, createHouse, updateHouse, deleteHouse } from './houses'
import type { StandardScenario } from './houses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('houses', () => {
  scenario('returns all houses', async (scenario: StandardScenario) => {
    const result = await houses()

    expect(result.length).toEqual(Object.keys(scenario.house).length)
  })

  scenario('returns a single house', async (scenario: StandardScenario) => {
    const result = await house({ id: scenario.house.one.id })

    expect(result).toEqual(scenario.house.one)
  })

  scenario('creates a house', async () => {
    const result = await createHouse({
      input: { address: 'String', no_rooms: 2179408 },
    })

    expect(result.address).toEqual('String')
    expect(result.no_rooms).toEqual(2179408)
  })

  scenario('updates a house', async (scenario: StandardScenario) => {
    const original = await house({ id: scenario.house.one.id })
    const result = await updateHouse({
      id: original.id,
      input: { address: 'String2' },
    })

    expect(result.address).toEqual('String2')
  })

  scenario('deletes a house', async (scenario: StandardScenario) => {
    const original = await deleteHouse({ id: scenario.house.one.id })
    const result = await house({ id: original.id })

    expect(result).toEqual(null)
  })
})
