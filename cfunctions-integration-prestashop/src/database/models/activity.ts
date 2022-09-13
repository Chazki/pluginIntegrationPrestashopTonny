import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface ActivityAttributes {
  addressPoint: Point
  arrTime?: Date
  createdAt?: Date
  deleted: boolean
  endTime?: Date
  id: number
  orderID: number
  routeID?: number
  typeID: number
  updatedAt?: Date
  workingTime?: Date
}

type ActivityCreationAttributes = Optional<ActivityAttributes, 'id'>
interface ActivityInstance
  extends Model<ActivityAttributes, ActivityCreationAttributes>,
    ActivityAttributes {}

const activityFactory = (sequelize: Sequelize): ModelCtor<ActivityInstance> =>
  sequelize.define<ActivityInstance>(
    'Activity',
    {
      addressPoint: {
        allowNull: false,
        type: DataTypes.GEOMETRY('POINT')
      },
      arrTime: { type: DataTypes.TIME },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      endTime: { type: DataTypes.TIME },
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
      routeID: { type: DataTypes.INTEGER },
      typeID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      workingTime: { type: DataTypes.TIME }
    },
    {
      tableName: 'Activities',
      timestamps: true
    }
  )

export { ActivityCreationAttributes, ActivityInstance, activityFactory }
