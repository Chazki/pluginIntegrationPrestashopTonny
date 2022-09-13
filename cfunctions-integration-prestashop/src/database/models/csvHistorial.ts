import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface CSVHistorialAttributes {
  createdAt?: Date
  deleted?: boolean
  enterpriseID: number
  filename: string
  id: number
  meta?: Record<string, unknown>
  operatorID: string
  orderNumber?: number
  updatedAt?: Date
  url?: string
}

type CSVHistorialCreationAttributes = Optional<CSVHistorialAttributes, 'id'>
interface CSVHistorialInstance
  extends Model<CSVHistorialAttributes, CSVHistorialCreationAttributes>,
    CSVHistorialAttributes {}

const csvHistorialFactory = (
  sequelize: Sequelize
): ModelCtor<CSVHistorialInstance> =>
  sequelize.define<CSVHistorialInstance>(
    'CSVHistorial',
    {
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      enterpriseID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      filename: {
        allowNull: false,
        type: DataTypes.STRING
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      meta: { type: DataTypes.JSONB },
      operatorID: {
        allowNull: false,
        type: DataTypes.UUID
      },
      orderNumber: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER
      },
      url: { type: DataTypes.STRING }
    },
    {
      tableName: 'CSVHistorial',
      timestamps: true
    }
  )

export {
  CSVHistorialCreationAttributes,
  CSVHistorialInstance,
  csvHistorialFactory
}
