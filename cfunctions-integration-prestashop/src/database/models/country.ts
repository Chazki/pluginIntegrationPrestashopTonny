import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { EnterpriseInstance } from '..'

interface CountryAttributes {
  id: number
  name: string
  region: string
  meta?: Record<string, unknown>
  deleted?: boolean
  urlFlag: string
  prefixPhone: string
  createdAt?: Date
  updatedAt?: Date
  landing: Record<string, unknown>
  currencyISO: string
  vehiclesTypesIDs: number[]
}

type CountryCreationAttributes = Optional<CountryAttributes, 'id'>
interface CountryInstance
  extends Model<CountryAttributes, CountryCreationAttributes>,
    CountryAttributes {
      Enterprises?: EnterpriseInstance[]
    }

const countryFactory = (sequelize: Sequelize): ModelCtor<CountryInstance> =>
  sequelize.define<CountryInstance>(
    'Country',
    {
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
      region: {
        allowNull: false,
        type: DataTypes.STRING
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      urlFlag: {
        allowNull: true,
        type: DataTypes.STRING
      },
      prefixPhone: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      landing: { type: DataTypes.JSONB },
      currencyISO: {
        allowNull: true,
        type: DataTypes.STRING
      },
      vehiclesTypesIDs: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    },
    {
      tableName: 'Countries',
      timestamps: true
    }
  )

export { CountryCreationAttributes, CountryInstance, countryFactory }
