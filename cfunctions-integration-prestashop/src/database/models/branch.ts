import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface BranchAttributes {
  id: number
  branchOfficeCode: string
  branchOfficeName: string
  branchOfficeAddress: string
  branchOfficeAddressPoint?: Point
  serviceIDs?: number[]
  atentionDays?: string[]
  atentionHours?: AttentionHour[]
  packageSizes?: number[]
  contactPeople?: ContactPerson[]
  enterpriseID: number
  deleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  cityID?: number
}

type BranchCreationAttributes = Optional<BranchAttributes, 'id'>
interface BranchInstance
  extends Model<BranchAttributes, BranchCreationAttributes>,
    BranchAttributes {}

const branchFactory = (sequelize: Sequelize): ModelCtor<BranchInstance> =>
  sequelize.define<BranchInstance>(
    'Branch',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      branchOfficeCode: {
        allowNull: false,
        type: DataTypes.STRING
      },
      branchOfficeName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      branchOfficeAddress: {
        allowNull: false,
        type: DataTypes.STRING
      },
      branchOfficeAddressPoint: {
        type: DataTypes.GEOMETRY('POINT')
      },
      serviceIDs: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      atentionDays: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      atentionHours: {
        type: DataTypes.JSONB
      },
      packageSizes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      contactPeople: {
        type: DataTypes.JSONB
      },
      enterpriseID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deleted: {
        type: DataTypes.BOOLEAN
      },
      cityID: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'Branches'
    }
  )

export { BranchCreationAttributes, BranchInstance, branchFactory }
