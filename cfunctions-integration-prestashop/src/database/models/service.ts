import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { EnterprisePlatformInstance } from './'

interface ServiceAttributes {
  attentionSchedule?: Record<string, unknown>
  cityID: number
  createdAt?: Date
  deleted?: boolean
  express?: boolean
  extraChargeValue?: number
  id: number
  intents?: number
  minimalDistance?: number
  minutes?: number
  name: string
  packageSizeIDs: number[]
  statusID: number
  typeID: number
  updatedAt?: Date
}

type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>
interface ServiceInstance
  extends Model<ServiceAttributes, ServiceCreationAttributes>,
    ServiceAttributes {
        EnterprisePlatform: EnterprisePlatformInstance
    }

const serviceFactory = (sequelize: Sequelize): ModelCtor<ServiceInstance> =>
  sequelize.define<ServiceInstance>(
    'Service',
    {
      attentionSchedule: { type: DataTypes.JSONB },
      cityID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      express: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      extraChargeValue: { type: DataTypes.DECIMAL(10, 2) },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      intents: { type: DataTypes.INTEGER },
      minimalDistance: { type: DataTypes.FLOAT(8) },
      minutes: { type: DataTypes.FLOAT(8) },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      packageSizeIDs: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      statusID: {
        allowNull: false,
        defaultValue: 19,
        type: DataTypes.INTEGER
      },
      typeID: {
        allowNull: false,
        defaultValue: 3,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'Services',
      timestamps: true
    }
  )

export { ServiceCreationAttributes, ServiceInstance, serviceFactory }
