import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'

interface OrderPackagesAttributes {
    id: number
    orderID: number
    clientPackageID: string
    envelope?: string
    weight?: number
    weightUnitID?: number
    packageSizeID?: number
    quantity?: number
    name?: string
    currency?: string
    unitaryProductPrice?: number
    extra?: Object
}

type OrderPackagesCreationAttributes = Optional<OrderPackagesAttributes, 'id'>
interface OrderPackagesInstance
  extends Model<OrderPackagesAttributes, OrderPackagesCreationAttributes>,
    OrderPackagesAttributes {

    }

const orderPackagesFactory = (sequelize: Sequelize): ModelCtor<OrderPackagesInstance> =>
    sequelize.define<OrderPackagesInstance> (
        'OrderPackages',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            orderID: { 
                type: DataTypes.INTEGER 
            },
            clientPackageID: {
                type: DataTypes.STRING
            },
            envelope: {
                type: DataTypes.STRING
            },
            weight: { 
                type: DataTypes.INTEGER 
            },
            weightUnitID: { 
                type: DataTypes.INTEGER 
            },
            packageSizeID: { 
                type: DataTypes.INTEGER 
            },
            quantity: { 
                type: DataTypes.INTEGER 
            },
            name: {
                type: DataTypes.STRING
            },
            currency: {
                type: DataTypes.STRING
            },
            unitaryProductPrice: { 
                type: DataTypes.INTEGER 
            },
            extra: {
                type: DataTypes.JSONB
            },
        },
        {
          tableName: 'OrderPackages',
          timestamps: false
        }
    )

export {
    OrderPackagesCreationAttributes,
    OrderPackagesInstance,
    orderPackagesFactory
}