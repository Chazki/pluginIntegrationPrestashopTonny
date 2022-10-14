import { Branch, BranchInstance } from '..'
import { Sequelize } from 'sequelize'

export const getAddressBranchByCode = async (
  enterpriseID: number,
  branchOfficeCode: string
): Promise<BranchInstance> => {
  const branch = await Branch.findOne({
    where: {
      enterpriseID,
      branchOfficeCode,
      deleted: false
    },
    attributes: ['id', 'branchOfficeCode', 'branchOfficeAddress', 'enterpriseID'],
  })

  if (!branch)
    throw new Error(`Branch with code ${branchOfficeCode} was not found`)

  return branch
}