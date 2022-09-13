import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface GeneralTypeAttributes {
  subtype: number
  type: number
  class: string
  subclass: string
  extra?: Record<string, unknown>
  createdAt?: Date
  updatedAt?: Date
  deleted?: boolean
}

type GeneralTypeCreationAttributes = Optional<GeneralTypeAttributes, 'subtype'>
interface GeneralTypeInstance
  extends Model<GeneralTypeAttributes, GeneralTypeCreationAttributes>,
    GeneralTypeAttributes {}

const generalTypeFactory = (
  sequelize: Sequelize
): ModelCtor<GeneralTypeInstance> =>
  sequelize.define<GeneralTypeInstance>(
    'GeneralType',
    {
      subtype: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER,
        allowNull: false
      },
      type: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subclass: {
        type: DataTypes.STRING,
        allowNull: false
      },
      extra: {
        type: DataTypes.JSONB
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: 'GeneralTypes'
    }
  )

export {
  GeneralTypeCreationAttributes,
  GeneralTypeInstance,
  generalTypeFactory
}
