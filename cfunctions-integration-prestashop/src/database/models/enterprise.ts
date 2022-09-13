import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { EnterprisePlatformInstance, CountryInstance, CityInstance } from '..'

interface ContactPerson {
  area: string
  name: string
  email: string[]
  phone: string[]
  currentContact: boolean
}

interface EnterpriseAttributes {
  SOAPAction?: string
  SOAPmethod?: boolean
  SOAPxmlStructure?: string
  address: string
  atariID?: string
  authTokenHooks?: string
  authorizationProperties?: Record<string, unknown>
  businessName: string
  calculateTariffRoute?: boolean
  cityID?: number
  comercialName: string
  contactPeople: ContactPerson[]
  contentTypeWebHook?: string
  countryID?: number
  createdAt?: Date
  deleted?: boolean
  documentNumber: string
  documentType?: number
  enterpriseKey?: string
  extra?: Record<string, unknown>
  formatDni?: boolean
  hasAuthorization?: boolean
  hideDescription?: boolean
  hooksHeaders: Record<string, unknown>
  id: number
  integration: boolean
  methodWebHook?: string
  multiplace?: boolean
  needStringify?: boolean
  photo?: string
  photosForApp?: number
  point?: Point
  queryHooks?: string
  restBody?: Record<string, unknown>
  serviceIDs?: number[]
  showOriginal?: boolean
  status?: number
  statusChangedDate?: Date
  statusIDNotification?: Record<string, unknown>
  structureWebHook?: Record<string, unknown>
  typeWebHook?: string
  updatedAt?: Date
  urlWebHook?: string
  useWebHooks?: boolean
  validationPostalCode?: boolean
}

type EnterpriseCreationAttributes = Optional<EnterpriseAttributes, 'id'>
interface EnterpriseInstance
  extends Model<EnterpriseAttributes, EnterpriseCreationAttributes>,
    EnterpriseAttributes {
      Platforms: EnterprisePlatformInstance[]
      Country: CountryInstance
      City: CityInstance
    }

const enterpriseFactory = (
  sequelize: Sequelize
): ModelCtor<EnterpriseInstance> =>
  sequelize.define<EnterpriseInstance>(
    'Enterprise',
    {
      SOAPAction: { type: DataTypes.TEXT },
      SOAPmethod: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      SOAPxmlStructure: { type: DataTypes.TEXT },
      address: {
        allowNull: false,
        type: DataTypes.STRING(200)
      },
      atariID: { type: DataTypes.STRING },
      authTokenHooks: { type: DataTypes.TEXT },
      authorizationProperties: { type: DataTypes.JSONB },
      businessName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      calculateTariffRoute: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      cityID: {
        defaultValue: 1,
        type: DataTypes.INTEGER
      },
      comercialName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      contactPeople: {
        allowNull: false,
        type: DataTypes.JSONB
      },
      contentTypeWebHook: { type: DataTypes.STRING },
      countryID: {
        defaultValue: 1,
        type: DataTypes.INTEGER
      },
      deleted: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      documentNumber: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      documentType: {
        defaultValue: 31,
        type: DataTypes.INTEGER
      },
      enterpriseKey: { type: DataTypes.UUID },
      extra: { type: DataTypes.JSONB },
      formatDni: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      hasAuthorization: { type: DataTypes.BOOLEAN },
      hideDescription: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      hooksHeaders: { type: DataTypes.JSONB },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      integration: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      methodWebHook: { type: DataTypes.STRING },
      multiplace: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      needStringify: { type: DataTypes.BOOLEAN },
      photo: { type: DataTypes.STRING },
      photosForApp: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER
      },
      point: { type: DataTypes.GEOMETRY('POINT') },
      queryHooks: { type: DataTypes.TEXT },
      restBody: { type: DataTypes.JSONB },
      serviceIDs: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
      showOriginal: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      status: {
        allowNull: false,
        defaultValue: 12,
        type: DataTypes.INTEGER
      },
      statusChangedDate: { type: DataTypes.TIME },
      statusIDNotification: { type: DataTypes.JSONB },
      structureWebHook: { type: DataTypes.JSONB },
      typeWebHook: { type: DataTypes.STRING },
      urlWebHook: { type: DataTypes.STRING(200) },
      useWebHooks: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      validationPostalCode: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'Enterprises',
      timestamps: true
    }
  )

export { EnterpriseCreationAttributes, EnterpriseInstance, enterpriseFactory }
