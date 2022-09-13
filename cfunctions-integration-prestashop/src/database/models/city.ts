import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { EnterpriseInstance } from '..'

interface CityAttributes {
  OSRMurl?: string
  centralAddress?: string
  cityPoint: Point
  countryID: number
  createdAt?: Date
  deleted?: boolean
  dispatchEndTime?: Date
  dispatchStartTime?: Date
  formulaAffiliateTariff?: Record<string, unknown>
  id: number
  meta?: Record<string, unknown>
  name: string
  pickupEndTime?: Date
  pickupStartTime?: Date
  timeZone: string
  updatedAt?: Date
  vehicleConfiguration?: Record<string, unknown>
}

type CityCreationAttributes = Optional<CityAttributes, 'id'>
interface CityInstance
  extends Model<CityAttributes, CityCreationAttributes>,
    CityAttributes {
      Enterprises?: EnterpriseInstance
    }

const cityFactory = (sequelize: Sequelize): ModelCtor<CityInstance> =>
  sequelize.define<CityInstance>(
    'City',
    {
      OSRMurl: { type: DataTypes.STRING },
      centralAddress: { type: DataTypes.STRING },
      cityPoint: {
        allowNull: false,
        type: DataTypes.GEOMETRY('POINT')
      },
      countryID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      dispatchEndTime: { type: DataTypes.TIME },
      dispatchStartTime: { type: DataTypes.TIME },
      formulaAffiliateTariff: { type: DataTypes.JSONB },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      meta: { type: DataTypes.JSONB },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      pickupEndTime: { type: DataTypes.DATE },
      pickupStartTime: { type: DataTypes.DATE },
      timeZone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      vehicleConfiguration: { type: DataTypes.JSONB }
    },
    {
      tableName: 'Cities',
      timestamps: true
    }
  )

export { CityCreationAttributes, CityInstance, cityFactory }
