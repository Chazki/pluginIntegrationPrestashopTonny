import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface SectorAttributes {
  cityID: number
  createdAt?: Date
  createdBy?: string
  deleted?: boolean
  id: number
  locationID?: number
  name: string
  polygon?: Polygon
  startPoint?: Point
  statusID?: number
  updatedAt?: Date
}

type SectorCreationAttributes = Optional<SectorAttributes, 'id'>
interface SectorInstance
  extends Model<SectorAttributes, SectorCreationAttributes>,
    SectorAttributes {}

const sectorFactory = (
  sequelize: Sequelize
): ModelCtor<SectorInstance> =>
  sequelize.define<SectorInstance>(
    'Sector',
    {
      cityID: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdBy: { type: DataTypes.STRING(100) },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.STRING(100)
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      locationID: { type: DataTypes.INTEGER },
      name: {
        allowNull: false,
        type: DataTypes.STRING(40)
      },
      polygon: { type: DataTypes.GEOMETRY('POLYGON') },
      startPoint: { type: DataTypes.GEOMETRY('POINT') },
      statusID: {
        allowNull: false,
        defaultValue: 22,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'Sectors',
      timestamps: true
    }
  )

export { 
  SectorCreationAttributes, 
  SectorInstance, 
  sectorFactory 
}
