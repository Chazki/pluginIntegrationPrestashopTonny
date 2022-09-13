import { Enterprise, EnterpriseInstance } from '..'

export const getEnterpriseIDByKey = async (
    enterpriseKey: string
): Promise<number> => {
    const enterprise = await Enterprise.findOne({
      where: { enterpriseKey }
    })
  
    if (!enterprise)
      throw new Error(`Enterprise with key ${enterpriseKey} was not found`)
  
    return enterprise.id
}