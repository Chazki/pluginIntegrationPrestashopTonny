import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { OrderServiceInstance } from '.'

interface OrderImageAttributes {
  id: number
  orderID: number
  orderServiceID: number
  groupID: number
  filename: string
  url: string
  createdAt?: Date
  updatedAt?: Date
  deleted?: boolean
}

type OrderImageCreationAttributes = Optional<OrderImageAttributes, 'id'>
interface OrderImageInstance
  extends Model<OrderImageAttributes, OrderImageCreationAttributes>,
    OrderImageAttributes {
  OrderService: OrderServiceInstance
}

const orderImageFactory = (
  sequelize: Sequelize
): ModelCtor<OrderImageInstance> =>
  sequelize.define<OrderImageInstance>(
    'OrderImage',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      orderID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      orderServiceID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      groupID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      filename: {
        allowNull: false,
        type: DataTypes.STRING
      },
      url: {
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
      tableName: 'OrdersImages'
    }
  )

export { OrderImageCreationAttributes, OrderImageInstance, orderImageFactory }
