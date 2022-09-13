import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface OriginalOrderAttributes {
  blocked?: boolean
  cityID?: number
  createdAt?: Date
  csvHistorialID: number
  deleted?: boolean
  errors?: Record<string, unknown>
  id: number
  orderInfo: Record<string, unknown>
  orderInfoData: Record<string, unknown>
  updatedAt?: Date
  validated?: boolean
}

type OriginalOrderCreationAttributes = Optional<OriginalOrderAttributes, 'id'>
interface OriginalOrderInstance
  extends Model<OriginalOrderAttributes, OriginalOrderCreationAttributes>,
    OriginalOrderAttributes {}

const originalOrderFactory = (
  sequelize: Sequelize
): ModelCtor<OriginalOrderInstance> =>
  sequelize.define<OriginalOrderInstance>(
    'OriginalOrder',
    {
      blocked: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      cityID: { type: DataTypes.INTEGER },
      csvHistorialID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.INTEGER
      },
      errors: { type: DataTypes.JSONB },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      orderInfo: {
        allowNull: false,
        type: DataTypes.JSONB
      },
      orderInfoData: {
        allowNull: false,
        type: DataTypes.JSONB
      },
      validated: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'OriginalOrders',
      timestamps: true
    }
  )

export {
  OriginalOrderCreationAttributes,
  originalOrderFactory,
  OriginalOrderInstance
}
