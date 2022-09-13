import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { AffiliateInstance, IncidenceInstance } from '.'

interface IncidenceRegistryAttributes {
  affiliateID: string
  closed?: boolean
  createdAt?: Date
  id: number
  incidenceID: number
  routeID: number
  updatedAt?: Date
}

type IncidenceRegistryCreationAttributes = Optional<
  IncidenceRegistryAttributes,
  'id'
>
interface IncidenceRegistryInstance
  extends Model<
      IncidenceRegistryAttributes,
      IncidenceRegistryCreationAttributes
    >,
    IncidenceRegistryAttributes {
  Incidence?: IncidenceInstance
  Affiliate?: AffiliateInstance
}

const incidenceRegistryFactory = (
  sequelize: Sequelize
): ModelCtor<IncidenceRegistryInstance> =>
  sequelize.define<IncidenceRegistryInstance>(
    'IncidenceRegistry',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      affiliateID: {
        allowNull: false,
        type: DataTypes.UUID
      },
      incidenceID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      closed: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      routeID: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'IncidenceRegistry'
    }
  )

export {
  IncidenceRegistryAttributes,
  IncidenceRegistryInstance,
  incidenceRegistryFactory
}
