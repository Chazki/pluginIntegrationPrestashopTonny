import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface PackageSizesAttributes {
  name: string
  dimX: number
  dimY: number
  dimZ: number
  maxWeight: number
  countryID: number
  deleted: boolean
  createdAt: Date
  updatedAt: Date
  id: number
}

type PackageSizesCreationAttributes = Optional<PackageSizesAttributes, 'id'>

interface PackageSizesInstance
  extends Model<PackageSizesAttributes, PackageSizesCreationAttributes>,
    PackageSizesAttributes {}

const packageSizesFactory = (
  sequelize: Sequelize
): ModelCtor<PackageSizesInstance> =>
  sequelize.define<PackageSizesInstance>(
    'PackageSizes',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      dimX: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      dimY: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      dimZ: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      maxWeight: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      countryID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'PackageSizes',
      timestamps: true
    }
  )

export {
  PackageSizesCreationAttributes,
  PackageSizesInstance,
  packageSizesFactory
}
