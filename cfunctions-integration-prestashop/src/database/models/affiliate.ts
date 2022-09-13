import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import {
  AffiliateVehicleInstance,
  IncidenceInstance,
  LocationAffiliateInstance,
  RouteInstance,
  UserInstance
} from '.'

interface AffiliateAttributes {
  userID: string
  statusID: number
  loginDate?: Date
  lastConnection?: Date
  isLogged: boolean
  deviceToken?: string
  isConnected: boolean
  paymentDate?: Date
  paymentNumberOperation?: string
  paymentVoucher?: string
  viewVideo: boolean
  stepID?: number
  preAffiliate: boolean
  completeTest: boolean
  reject: boolean
  rejectMotiveID?: number
  agencyID?: number
  deleted: boolean
  createdAt?: Date
  updatedAt?: Date
  currentRouteID?: number | null
  currentVehicleID?: number
  currentOrderFifoID?: number | null
  calculateTariff: boolean
  hasError: boolean
}

type AffiliateCreationAttributes = Optional<AffiliateAttributes, 'userID'>
interface AffiliateInstance
  extends Model<AffiliateAttributes, AffiliateCreationAttributes>,
    AffiliateAttributes {
  LocationAffiliate: LocationAffiliateInstance[]
  User?: UserInstance
  IncidenceRegistries: IncidenceInstance[]
  CurrentRoute: RouteInstance
  CurrentVehicle?: AffiliateVehicleInstance
}

const affiliateFactory = (sequelize: Sequelize): ModelCtor<AffiliateInstance> =>
  sequelize.define<AffiliateInstance>(
    'Affiliate',
    {
      userID: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true
      },
      statusID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 83
      },
      loginDate: {
        type: DataTypes.TIME
      },
      lastConnection: {
        type: DataTypes.TIME
      },
      isLogged: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      deviceToken: {
        type: DataTypes.STRING
      },
      isConnected: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      paymentDate: {
        type: DataTypes.TIME
      },
      paymentNumberOperation: {
        type: DataTypes.STRING
      },
      paymentVoucher: {
        type: DataTypes.STRING
      },
      viewVideo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      stepID: {
        type: DataTypes.INTEGER
      },
      preAffiliate: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      completeTest: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      reject: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      rejectMotiveID: {
        type: DataTypes.INTEGER
      },
      agencyID: {
        type: DataTypes.INTEGER
      },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      currentRouteID: {
        type: DataTypes.INTEGER
      },
      currentVehicleID: {
        type: DataTypes.INTEGER
      },
      currentOrderFifoID: {
        type: DataTypes.INTEGER
      },
      calculateTariff: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      hasError: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'Affiliates'
    }
  )

export { AffiliateCreationAttributes, AffiliateInstance, affiliateFactory }
