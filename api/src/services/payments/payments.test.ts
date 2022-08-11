import {
  payments,
  payment,
  createPayment,
  updatePayment,
  deletePayment,
} from './payments'
import type { StandardScenario } from './payments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('payments', () => {
  scenario('returns all payments', async (scenario: StandardScenario) => {
    const result = await payments()

    expect(result.length).toEqual(Object.keys(scenario.payment).length)
  })

  scenario('returns a single payment', async (scenario: StandardScenario) => {
    const result = await payment({ id: scenario.payment.one.id })

    expect(result).toEqual(scenario.payment.one)
  })

  scenario('creates a payment', async (scenario: StandardScenario) => {
    const result = await createPayment({
      input: {
        amount: 8829717,
        houseId: scenario.payment.two.houseId,
        userId: scenario.payment.two.userId,
      },
    })

    expect(result.amount).toEqual(8829717)
    expect(result.houseId).toEqual(scenario.payment.two.houseId)
    expect(result.userId).toEqual(scenario.payment.two.userId)
  })

  scenario('updates a payment', async (scenario: StandardScenario) => {
    const original = await payment({ id: scenario.payment.one.id })
    const result = await updatePayment({
      id: original.id,
      input: { amount: 7843226 },
    })

    expect(result.amount).toEqual(7843226)
  })

  scenario('deletes a payment', async (scenario: StandardScenario) => {
    const original = await deletePayment({ id: scenario.payment.one.id })
    const result = await payment({ id: original.id })

    expect(result).toEqual(null)
  })
})
