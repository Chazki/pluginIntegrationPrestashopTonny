import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import {
  OrderImageInstance,
  OrderInstance,
  OrderServiceHistorialInstance,
  RouteInstance
} from '.'

interface OrderServiceAttributes {
  active: boolean
  createdAt?: Date
  dateLastStatus?: Date
  deleted: boolean
  endTime?: Date
  id: number
  lastStatusID: number
  liquidationDate?: Date
  liquidationGuide?: boolean
  liquidationPackage?: boolean
  liquidationVoucher?: boolean
  orderID: number
  packageQuantity?: Record<string, unknown>
  promiseTime: Date
  receptorDocument?: string
  routeID?: number | null
  startTime?: Date
  updatedAt?: Date
}

type OrderServiceCreationAttributes = Optional<OrderServiceAttributes, 'id'>
interface OrderServiceInstance
  extends Model<OrderServiceAttributes, OrderServiceCreationAttributes>,
    OrderServiceAttributes {
  Orders: OrderInstance
  OrderImages: OrderImageInstance[]
  Routes: RouteInstance
  Statuses?: OrderServiceHistorialInstance[]
  OrderService: OrderServiceInstance[]
}

const orderServiceFactory = (
  sequelize: Sequelize
): ModelCtor<OrderServiceInstance> =>
  sequelize.define<OrderServiceInstance>(
    'OrderService',
    {
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      dateLastStatus: { type: DataTypes.DATE },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      endTime: { type: DataTypes.DATE },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      lastStatusID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      liquidationDate: { type: DataTypes.DATE },
      liquidationGuide: { type: DataTypes.BOOLEAN },
      liquidationPackage: { type: DataTypes.BOOLEAN },
      liquidationVoucher: { type: DataTypes.BOOLEAN },
      orderID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      packageQuantity: { type: DataTypes.JSONB },
      promiseTime: {
        allowNull: false,
        type: DataTypes.DATE
      },
      receptorDocument: { type: DataTypes.STRING },
      routeID: { type: DataTypes.INTEGER },
      startTime: { type: DataTypes.DATE }
    },
    {
      tableName: 'OrderService',
      timestamps: true
    }
  )

export {
  OrderServiceCreationAttributes,
  OrderServiceInstance,
  orderServiceFactory
}
