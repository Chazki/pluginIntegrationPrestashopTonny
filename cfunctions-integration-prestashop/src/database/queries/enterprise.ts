import { Branch, Enterprise, EnterpriseInstance, Service } from '..'
import { Sequelize } from 'sequelize'

export const getEnterpriseIDByKey = async (
    enterpriseKey: string
): Promise<number> => {
    const enterprise = await Enterprise.findOne({
      where: { enterpriseKey },
      attributes:['id']
    })
  
    if (!enterprise)
      throw new Error(`Enterprise with key ${enterpriseKey} was not found`)
  
    return enterprise.id
}

export const getEnterpriseByID = async (
  enterpriseID: number
): Promise<EnterpriseInstance> => {
  const enterprise = await Enterprise.findOne({
    where: { id: enterpriseID },
    include: [
      {
        model: Service,
        as: 'Services',
        on: {
          col1: Sequelize.literal(`"Services"."id" = any( "Enterprise"."serviceIDs")`),
      },
        attributes: ['id', 'name']
      },
    ],
    attributes: ['id', 'businessName', 'serviceIDs']
  })

  if (!enterprise)
      throw new Error(`Enterprise with id ${enterpriseID} was not found`)

  return enterprise
}

export const getEnterpriseBranchByID = async (
  enterpriseID: number
): Promise<EnterpriseInstance> => {
  const enterprise = await Enterprise.findOne({
    where: { id: enterpriseID },
    include: [
      {
        model: Branch,
        as: 'Branches',
        attributes: ['id', 'branchOfficeCode', 'branchOfficeAddressPoint', 'contactPeople', 'enterpriseID'],
        where: {deleted: false}
      },
      {
        model: Service,
        as: 'Services',
        on: {
          col1: Sequelize.literal(`"Services"."id" = any( "Enterprise"."serviceIDs")`),
      },
        attributes: ['id', 'name']
      },
    ],
    attributes: ['id', 'businessName', 'serviceIDs']
  })

  if (!enterprise)
      throw new Error(`Enterprise with id ${enterpriseID} was not found`)

  return enterprise
}