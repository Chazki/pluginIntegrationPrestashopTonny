import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { EnterpriseInstance, ServiceInstance } from '.'

interface EnterprisePlatformAttributes {
    id: number
    enterpriseID: number
    namePlatform: string
    idPlatform: string
    token: string
    refreshToken: string
    extra?: Metadata
    deleted: boolean
    branchDefaultPlatform: boolean
    services: number[]
    enabled: boolean
}

type EnterprisePlatformCreationAttributes = Optional<EnterprisePlatformAttributes, 'id'>
interface EnterprisePlatformInstance 
    extends Model<EnterprisePlatformAttributes, EnterprisePlatformCreationAttributes>,
        EnterprisePlatformAttributes {
            Enterprise: EnterpriseInstance
            Services?: ServiceInstance[]
        }

const EnterprisePlatformFactory = (
    sequelize: Sequelize
): ModelCtor<EnterprisePlatformInstance> => 
    sequelize.define<EnterprisePlatformInstance>(
        'EnterprisePlatforms',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            enterpriseID: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            namePlatform: {
                allowNull: true,
                type: DataTypes.STRING
            },
            idPlatform: {
                allowNull: true,
                type: DataTypes.STRING
            },
            token: {
                allowNull: true,
                type: DataTypes.STRING
            },
            refreshToken: {
                allowNull: true,
                type: DataTypes.STRING
            },
            extra: {
                allowNull: true,
                type: DataTypes.JSONB
            },
            deleted: {
                allowNull: true,
                type: DataTypes.BOOLEAN
            },
            branchDefaultPlatform: {
                allowNull: true,
                type: DataTypes.BOOLEAN
            },
            services: {
                allowNull: true,
                type: DataTypes.ARRAY(DataTypes.INTEGER)
            },
            enabled: {
                allowNull: true,
                type: DataTypes.BOOLEAN
            },
        },
        {
          timestamps: true,
          tableName: 'EnterprisesPlatforms',
        }
    )

export {
    EnterprisePlatformAttributes,
    EnterprisePlatformInstance,
    EnterprisePlatformFactory
}