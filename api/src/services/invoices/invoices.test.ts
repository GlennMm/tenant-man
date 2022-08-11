import {
  invoices,
  invoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from './invoices'
import type { StandardScenario } from './invoices.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('invoices', () => {
  scenario('returns all invoices', async (scenario: StandardScenario) => {
    const result = await invoices()

    expect(result.length).toEqual(Object.keys(scenario.invoice).length)
  })

  scenario('returns a single invoice', async (scenario: StandardScenario) => {
    const result = await invoice({ id: scenario.invoice.one.id })

    expect(result).toEqual(scenario.invoice.one)
  })

  scenario('creates a invoice', async (scenario: StandardScenario) => {
    const result = await createInvoice({
      input: {
        amount: 6280518,
        mounth: 644166,
        year: 9172826,
        userId: scenario.invoice.two.userId,
      },
    })

    expect(result.amount).toEqual(6280518)
    expect(result.mounth).toEqual(644166)
    expect(result.year).toEqual(9172826)
    expect(result.userId).toEqual(scenario.invoice.two.userId)
  })

  scenario('updates a invoice', async (scenario: StandardScenario) => {
    const original = await invoice({ id: scenario.invoice.one.id })
    const result = await updateInvoice({
      id: original.id,
      input: { amount: 179344 },
    })

    expect(result.amount).toEqual(179344)
  })

  scenario('deletes a invoice', async (scenario: StandardScenario) => {
    const original = await deleteInvoice({ id: scenario.invoice.one.id })
    const result = await invoice({ id: original.id })

    expect(result).toEqual(null)
  })
})
