import { Dialect, Sequelize } from 'sequelize'

import {
  activityFactory,
  affiliateFactory,
  affiliateVehicleFactory,
  branchFactory,
  cityFactory,
  countryFactory,
  csvHistorialFactory,
  enterpriseFactory,
  EnterprisePlatformFactory,
  generalTypeFactory,
  incidenceFactory,
  incidenceRegistryFactory,
  locationAffiliateFactory,
  orderFactory,
  orderImageFactory,
  orderPackagesFactory,
  orderServiceFactory,
  orderServiceHistorialFactory,
  originalOrderFactory,
  packageSizesFactory,
  routeFactory,
  sectorFactory,
  serviceFactory,
  userFactory
} from './models'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASS

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDriver,
  host: dbHost,
  logging: false
})

export const Activity = activityFactory(sequelizeConnection)
export const Affiliate = affiliateFactory(sequelizeConnection)
export const AffiliateVehicle = affiliateVehicleFactory(sequelizeConnection)
export const Branch = branchFactory(sequelizeConnection)
export const City = cityFactory(sequelizeConnection)
export const Country = countryFactory(sequelizeConnection)
export const CSVHistorial = csvHistorialFactory(sequelizeConnection)
export const Enterprise = enterpriseFactory(sequelizeConnection)
export const EnterprisePlatforms = EnterprisePlatformFactory(sequelizeConnection)
export const GeneralType = generalTypeFactory(sequelizeConnection)
export const Incidence = incidenceFactory(sequelizeConnection)
export const IncidenceRegistry = incidenceRegistryFactory(sequelizeConnection)
export const LocationAffiliate = locationAffiliateFactory(sequelizeConnection)
export const Order = orderFactory(sequelizeConnection)
export const OrderImage = orderImageFactory(sequelizeConnection)
export const OrderPackages = orderPackagesFactory(sequelizeConnection)
export const OrderService = orderServiceFactory(sequelizeConnection)
export const OrderServiceHistorial =
  orderServiceHistorialFactory(sequelizeConnection)
export const OriginalOrder = originalOrderFactory(sequelizeConnection)
export const PackageSizes = packageSizesFactory(sequelizeConnection)
export const Route = routeFactory(sequelizeConnection)
export const Service = serviceFactory(sequelizeConnection)
export const Sector = sectorFactory(sequelizeConnection)
export const User = userFactory(sequelizeConnection)

export const endConnection = async (): Promise<void> => {
  try {
    if (process.env.ENV !== 'local') {
      await sequelizeConnection.close()
      console.log('Closed connection successfully')
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.message)
    console.error(e)
    process.exit(1)
  }
}

Affiliate.hasMany(LocationAffiliate, {
  foreignKey: 'affiliateID',
  as: 'LocationAffiliate'
})

Affiliate.belongsTo(User, {
  foreignKey: 'userID',
  as: 'User'
})

Affiliate.hasMany(IncidenceRegistry, {
  foreignKey: 'affiliateID',
  as: 'IncidenceRegistry'
})

Affiliate.belongsTo(Route, {
  foreignKey: 'currentRouteID',
  as: 'CurrentRoute'
})

Affiliate.belongsTo(AffiliateVehicle, {
  foreignKey: 'currentVehicleID',
  as: 'CurrentVehicle'
})

AffiliateVehicle.belongsTo(GeneralType, {
  foreignKey: 'categoryVehicleID',
  as: 'VehicleType'
})

City.hasMany(Enterprise, {
  foreignKey: "cityID",
  as: "Enterprises",
})

Country.hasMany(Enterprise, {
  foreignKey: "countryID",
  as: "Enterprises",
})

Enterprise.belongsTo(City, {
  foreignKey: "cityID",
  as: "City",
})

Enterprise.belongsTo(Country, {
  foreignKey: "countryID",
  as: "Country",
})

Enterprise.hasMany(EnterprisePlatforms, {
  foreignKey: "enterpriseID",
  as: "Platforms",
})

EnterprisePlatforms.belongsTo(Enterprise, {
  foreignKey: "enterpriseID",
  as: "Enterprise"
})

EnterprisePlatforms.hasMany(Service, {
  foreignKey: 'id',
  as: 'Services'
})

Incidence.hasMany(IncidenceRegistry, {
  foreignKey: 'incidenceID',
  as: 'IncidenceRegistries'
})

IncidenceRegistry.belongsTo(Incidence, {
  foreignKey: 'incidenceID',
  as: 'Incidence'
})

IncidenceRegistry.belongsTo(Affiliate, {
  foreignKey: 'affiliateID',
  as: 'Affiliate'
})

LocationAffiliate.belongsTo(Affiliate, {
  foreignKey: 'affiliateID',
  as: 'Affiliate'
})

Order.belongsTo(Enterprise, {
  foreignKey: 'enterpriseID',
  as: 'Enterprise'
})

Order.belongsTo(GeneralType, {
  foreignKey: 'statusID',
  as: 'Status'
})

Order.belongsTo(GeneralType, {
  foreignKey: 'paymentMethodID',
  as: 'PaymentMethod'
})

Order.hasMany(OrderService, {
  foreignKey: 'orderID',
  as: 'OrderService'
})

OrderImage.belongsTo(OrderService, {
  foreignKey: 'orderServiceID',
  as: 'OrderService'
})

OrderService.belongsTo(Order, {
  foreignKey: 'orderID',
  as: 'Orders'
})

OrderService.hasMany(OrderImage, {
  foreignKey: 'orderServiceID',
  as: 'OrderImages'
})

OrderService.belongsTo(Route, {
  foreignKey: 'routeID',
  as: 'Routes'
})

OrderService.hasMany(OrderServiceHistorial, {
  foreignKey: 'orderServiceID',
  as: 'Statuses'
})

Route.hasMany(OrderService, {
  foreignKey: 'routeID',
  as: 'OrderServices'
})

Route.belongsTo(Affiliate, {
  foreignKey: 'affiliateID',
  as: 'Affiliates'
})

Service.belongsTo(EnterprisePlatforms, {
  foreignKey: 'id',
  as: 'EnterprisePlatform'
})

User.belongsTo(GeneralType, {
  foreignKey: 'documentTypeID',
  as: 'DocumentType'
})

User.hasOne(Affiliate, {
  foreignKey: 'userID',
  as: 'Affiliate'
})

export * from './models'
export * from './queries'
