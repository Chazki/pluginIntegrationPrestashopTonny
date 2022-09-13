import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { GeneralTypeInstance } from '.'

interface AffiliateVehicleAttributes {
  id: number
  affiliateID?: string
  categoryVehicleID: number
  vehiclePlate: string
  deleted?: boolean
}

type AffiliateVehicleCreationAttributes = Optional<
  AffiliateVehicleAttributes,
  'id'
>
interface AffiliateVehicleInstance
  extends Model<AffiliateVehicleAttributes, AffiliateVehicleCreationAttributes>,
    AffiliateVehicleAttributes {
  VehicleType: GeneralTypeInstance
}

const affiliateVehicleFactory = (
  sequelize: Sequelize
): ModelCtor<AffiliateVehicleInstance> =>
  sequelize.define<AffiliateVehicleInstance>(
    'AffiliateVehicle',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      affiliateID: {
        type: DataTypes.UUID
      },
      categoryVehicleID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      vehiclePlate: {
        allowNull: false,
        type: DataTypes.STRING
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'AffiliateVehicles'
    }
  )

export {
  AffiliateVehicleCreationAttributes,
  AffiliateVehicleInstance,
  affiliateVehicleFactory
}
