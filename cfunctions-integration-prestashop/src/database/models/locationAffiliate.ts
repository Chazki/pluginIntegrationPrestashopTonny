import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { AffiliateInstance } from '.'

interface LocationAffiliateAttributes {
  id: number
  affiliateID: string
  locationPoint?: Point
  polygonID?: number
  createdAt?: Date
  updatedAt?: Date
}

type LocationAffiliateCreationAttributes = Optional<
  LocationAffiliateAttributes,
  'id'
>
interface LocationAffiliateInstance
  extends Model<
      LocationAffiliateAttributes,
      LocationAffiliateCreationAttributes
    >,
    LocationAffiliateAttributes {
  Affiliate?: AffiliateInstance
}

const locationAffiliateFactory = (
  sequelize: Sequelize
): ModelCtor<LocationAffiliateInstance> =>
  sequelize.define<LocationAffiliateInstance>(
    'LocationAffiliate',
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
      locationPoint: {
        type: DataTypes.GEOMETRY('POINT')
      }
    },
    {
      tableName: 'LocationAffiliate'
    }
  )

export {
  LocationAffiliateAttributes,
  LocationAffiliateInstance,
  locationAffiliateFactory
}
