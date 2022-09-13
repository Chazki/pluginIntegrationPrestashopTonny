import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { IncidenceRegistryInstance } from '.'

interface IncidenceAttributes {
  id: number
  name?: string
  statusIDVinculated?: number
  description?: string
  responsibility?: string
  deleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  countryID?: number
  automaticReoffer?: boolean
  paymentDiscount?: number
  paidChazki?: boolean
  extra?: object
  enterpriseID?: number
  masterIncidenceID?: number
  automaticDevolution?: number
}

type IncidenceCreationAttributes = Optional<IncidenceAttributes, 'id'>
interface IncidenceInstance
  extends Model<IncidenceAttributes, IncidenceCreationAttributes>,
    IncidenceAttributes {
  IncidenceRegistry?: IncidenceRegistryInstance
  Incidence: IncidenceAttributes
}

const incidenceFactory = (sequelize: Sequelize): ModelCtor<IncidenceInstance> =>
  sequelize.define<IncidenceInstance>(
    'Incidence',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      statusIDVinculated: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      responsibility: {
        allowNull: false,
        type: DataTypes.STRING
      },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'Incidence'
    }
  )

export { IncidenceAttributes, IncidenceInstance, incidenceFactory }
