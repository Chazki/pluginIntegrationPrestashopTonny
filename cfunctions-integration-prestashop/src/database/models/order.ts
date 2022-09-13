import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import {
  EnterpriseInstance,
  GeneralTypeInstance,
  OrderServiceInstance
} from '.'

interface OrderAttributes {
  baseTariffID?: number
  cityID: number
  classificationOrderID?: number
  clientTariffID?: number
  createdAt?: Date
  crossdocking: boolean
  dateRequest?: Date
  deleted: boolean
  distance?: number
  dropAddress?: string
  dropAddressReference?: string | null
  dropBranchID?: number
  dropContactDocumentNumber?: string
  dropContactDocumentTypeID?: number
  dropContactEmail?: string
  dropContactName?: string
  dropContactPhone?: string
  dropNotes?: string | null
  dropPoint: Point
  dropPostalCode?: string
  dropPrimaryReference?: string
  dropSecondaryReference?: string
  enterpriseID: number
  haveReofferRequest?: boolean
  id: number
  isPickedUp?: boolean | null
  lastIncidenceID?: number
  originalOrderID: number
  packageEnvelope: string
  packageQuantity: number
  packageSizeID: number
  packageWeight: number
  paidOrder?: boolean
  paymentMethodID: number
  paymentProofID: number
  pickUpAddress?: string
  pickUpAddressReference?: string | null
  pickUpBranchID?: number
  pickUpContactDocumentNumber?: string
  pickUpContactDocumentTypeID?: number
  pickUpContactEmail?: string
  pickUpContactName?: string
  pickUpContactPhone?: string
  pickUpNotes?: string | null
  pickUpPoint: Point
  pickUpPostalCode?: string
  pickUpPrimaryReference?: string
  pickUpSecondaryReference?: string
  polygonID: number
  productDescription: string
  productPrice: number
  receptorAcuse?: string
  receptorDocument?: string
  relationshipAcuse?: string
  returnOrder?: boolean
  reverseLogistic?: boolean
  serviceID: number
  statusID?: number
  totalPrice?: number
  trackCode: string
  updatedAt?: Date
  urlFileAcuse?: string
  urlQRCode?: string
  warehouseID?: number
  needValidateAge?: boolean
  extra?: Metadata | null
  providerName: string
  providerID: string
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id'>
interface OrderInstance
  extends Model<OrderAttributes, OrderCreationAttributes>,
    OrderAttributes {
  Status: GeneralTypeInstance
  OrderService: OrderServiceInstance[]
  Enterprise: EnterpriseInstance
  PaymentMethod: GeneralTypeInstance
}

const orderFactory = (sequelize: Sequelize): ModelCtor<OrderInstance> =>
  sequelize.define<OrderInstance>(
    'Order',
    {
      baseTariffID: { type: DataTypes.INTEGER },
      cityID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      classificationOrderID: { type: DataTypes.INTEGER },
      clientTariffID: { type: DataTypes.INTEGER },
      crossdocking: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      dateRequest: {
        type: DataTypes.DATE(3)
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      distance: { type: DataTypes.FLOAT },
      dropAddress: { type: DataTypes.STRING },
      dropAddressReference: { type: DataTypes.STRING },
      dropBranchID: { type: DataTypes.INTEGER },
      dropContactDocumentNumber: { type: DataTypes.STRING },
      dropContactDocumentTypeID: { type: DataTypes.INTEGER },
      dropContactEmail: { type: DataTypes.STRING },
      dropContactName: { type: DataTypes.STRING },
      dropContactPhone: { type: DataTypes.STRING },
      dropNotes: { type: DataTypes.STRING },
      dropPoint: { type: DataTypes.GEOMETRY('POINT') },
      dropPostalCode: { type: DataTypes.STRING },
      dropPrimaryReference: { type: DataTypes.STRING },
      dropSecondaryReference: { type: DataTypes.STRING },
      enterpriseID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      haveReofferRequest: { type: DataTypes.BOOLEAN },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      isPickedUp: { type: DataTypes.BOOLEAN },
      lastIncidenceID: { type: DataTypes.INTEGER },
      originalOrderID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      packageEnvelope: {
        allowNull: false,
        type: DataTypes.STRING
      },
      packageQuantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      packageSizeID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      packageWeight: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      paidOrder: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      paymentMethodID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      paymentProofID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      pickUpAddress: { type: DataTypes.STRING },
      pickUpAddressReference: { type: DataTypes.STRING },
      pickUpBranchID: { type: DataTypes.INTEGER },
      pickUpContactDocumentNumber: { type: DataTypes.STRING },
      pickUpContactDocumentTypeID: { type: DataTypes.INTEGER },
      pickUpContactEmail: { type: DataTypes.STRING },
      pickUpContactName: { type: DataTypes.STRING },
      pickUpContactPhone: { type: DataTypes.STRING },
      pickUpNotes: { type: DataTypes.STRING },
      pickUpPoint: { type: DataTypes.GEOMETRY('POINT') },
      pickUpPostalCode: { type: DataTypes.STRING },
      pickUpPrimaryReference: { type: DataTypes.STRING },
      pickUpSecondaryReference: { type: DataTypes.STRING },
      polygonID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      productDescription: {
        allowNull: false,
        type: DataTypes.STRING
      },
      productPrice: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      receptorAcuse: { type: DataTypes.STRING },
      receptorDocument: { type: DataTypes.STRING },
      relationshipAcuse: { type: DataTypes.STRING },
      returnOrder: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      reverseLogistic: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      serviceID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      statusID: {
        allowNull: false,
        defaultValue: 154,
        type: DataTypes.INTEGER
      },
      totalPrice: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.FLOAT
      },
      trackCode: {
        allowNull: false,
        type: DataTypes.STRING
      },
      urlFileAcuse: { type: DataTypes.STRING },
      urlQRCode: { type: DataTypes.STRING },
      warehouseID: { type: DataTypes.INTEGER },
      needValidateAge: { type: DataTypes.BOOLEAN },
      extra: {
        type: DataTypes.JSONB
      },
      providerName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      providerID: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Orders',
      timestamps: true
    }
  )

export { OrderCreationAttributes, OrderInstance, orderFactory }
