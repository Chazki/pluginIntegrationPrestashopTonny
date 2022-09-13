import { Transaction } from 'sequelize'
import {
  OriginalOrderCreationAttributes,
  OriginalOrderInstance,
  OriginalOrder
} from '..'

const createOriginalOrder = async (
  args: OriginalOrderCreationAttributes,
  transaction?: Transaction
): Promise<OriginalOrderInstance> => {
  const originalOrders = await OriginalOrder.create(args, {
    logging: false,
    transaction
  })

  return originalOrders
}

export { createOriginalOrder }
