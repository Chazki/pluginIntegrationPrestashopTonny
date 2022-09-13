import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { AffiliateInstance, OrderServiceInstance } from '.'

interface RouteAttributes {
  activities: number[]
  affiliateID?: string | null
  affiliateVehicleID?: number | null
  cityID: number
  createdAt?: Date
  deleted?: boolean
  deliveries?: number
  detail: string
  dispatchesOrders?: boolean
  endPolygonID?: number
  estimatedDuration: number
  estimatedStartTime?: Date
  estimatedTotalDistance: number
  finishRouteTime?: Date
  id: number
  isFromFifo?: boolean
  liquidationDate?: Date
  liquidationStateID: number
  pickUps?: number
  pickedPackage: boolean
  price?: number
  priceOriginal?: number
  realDuration?: number
  realStartTime?: Date
  realTotalDistance?: number
  routeAlias?: string | null
  routeCode?: string
  sectorsID: number[]
  startPolygonID?: number
  statusID: number
  updatedAt?: Date
  userResponsable?: string
  validated: boolean
  vehicleTypeID: number
  priceEnterprise: number
  priceEnterpriseOriginal: number
  meta?: DtoLegacyCLMetadata | null
  enterpriseIDs: number[]
}

type RouteCreationAttributes = Optional<RouteAttributes, 'id'>
interface RouteInstance
  extends Model<RouteAttributes, RouteCreationAttributes>,
    RouteAttributes {
  OrderServices: OrderServiceInstance[]
  Affiliate: AffiliateInstance
}

const routeFactory = (sequelize: Sequelize): ModelCtor<RouteInstance> =>
  sequelize.define<RouteInstance>(
    'Route',
    {
      activities: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      affiliateID: { type: DataTypes.UUID },
      affiliateVehicleID: { type: DataTypes.INTEGER },
      cityID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      deliveries: { type: DataTypes.INTEGER },
      detail: {
        allowNull: false,
        type: DataTypes.STRING
      },
      dispatchesOrders: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      endPolygonID: { type: DataTypes.INTEGER },
      estimatedDuration: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      estimatedStartTime: { type: DataTypes.DATE },
      estimatedTotalDistance: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      finishRouteTime: {
        allowNull: false,
        type: DataTypes.DATE
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      isFromFifo: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      liquidationDate: { type: DataTypes.DATE },
      liquidationStateID: {
        allowNull: false,
        defaultValue: 223,
        type: DataTypes.INTEGER
      },
      pickUps: { type: DataTypes.INTEGER },
      pickedPackage: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      price: { type: DataTypes.FLOAT },
      priceOriginal: { type: DataTypes.FLOAT },
      priceEnterprise: { type: DataTypes.FLOAT },
      priceEnterpriseOriginal: { type: DataTypes.FLOAT },
      realDuration: { type: DataTypes.INTEGER },
      realStartTime: { type: DataTypes.DATE },
      realTotalDistance: { type: DataTypes.INTEGER },
      routeAlias: { type: DataTypes.STRING },
      routeCode: { type: DataTypes.STRING },
      sectorsID: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      startPolygonID: {
        type: DataTypes.INTEGER
      },
      statusID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userResponsable: {
        type: DataTypes.UUID
      },
      validated: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      vehicleTypeID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      meta: {
        type: DataTypes.JSONB
      },
      enterpriseIDs: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    },
    {
      tableName: 'Routes',
      timestamps: true
    }
  )

export { RouteCreationAttributes, RouteInstance, routeFactory }
