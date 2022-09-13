import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface OrderServiceHistorialAttributes {
  cleaned?: boolean
  createdAt?: Date
  deleted: boolean
  id: number
  incidenceID?: number
  motive: string
  orderServiceID: number
  statusID: number
  updatedAt?: Date
  userIDUpdate?: string
  userLocation?: Point
}

type OrderServiceHistorialCreationAttributes = Optional<
  OrderServiceHistorialAttributes,
  'id'
>
interface OrderServiceHistorialInstance
  extends Model<
      OrderServiceHistorialAttributes,
      OrderServiceHistorialCreationAttributes
    >,
    OrderServiceHistorialAttributes {}

const orderServiceHistorialFactory = (
  sequelize: Sequelize
): ModelCtor<OrderServiceHistorialInstance> =>
  sequelize.define<OrderServiceHistorialInstance>(
    'OrderServiceHistorial',
    {
      cleaned: { type: DataTypes.BOOLEAN },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      incidenceID: { type: DataTypes.INTEGER },
      motive: {
        allowNull: false,
        type: DataTypes.STRING
      },
      orderServiceID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      statusID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userIDUpdate: { type: DataTypes.UUID },
      userLocation: { type: DataTypes.GEOMETRY('POINT') }
    },
    {
      tableName: 'OrderServiceHistorial',
      timestamps: true
    }
  )

export {
  OrderServiceHistorialCreationAttributes,
  OrderServiceHistorialInstance,
  orderServiceHistorialFactory
}
