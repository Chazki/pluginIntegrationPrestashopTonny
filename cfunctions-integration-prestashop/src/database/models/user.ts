import { DataTypes, Model, ModelCtor, Optional, Sequelize } from 'sequelize'
import { AffiliateInstance, GeneralTypeInstance } from '.'

interface UserAttributes {
  id: string
  names?: string
  lastname?: string
  email: string
  password?: string
  phone?: string
  cityID?: number
  countryID?: number
  statusID?: number
  roleID?: number
  documentTypeID?: number
  enterpriseID?: number
  documentNumber?: string
  personalRUC?: string
  birthdate?: Date
  studyLevelID?: number
  hasCovid?: boolean
  bankID?: number
  accountNumber?: string
  documentFrontPhoto?: string
  documentBackPhoto?: string
  passportPhoto?: string
  picture?: string
  emailVerified?: boolean
  clientIDs?: string[]
  polygonID?: number
  principalEnterpriseUser?: boolean
  createdAt?: Date
  updatedAt?: Date
  deleted?: boolean
  documentBirthCertificate?: string
  documentProofAddress?: string
  documentProofStudies?: string
  documentRFS?: string
  documentCV?: string
  documentEmploymentLetters?: string
  documentPersonalLetters?: string
  documentRecordEvaluation?: string
  documentPsychometricEvaluation?: string
  atariID?: number
  atariChileID?: string
  classificationUser?: number
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  Affiliate?: AffiliateInstance
  DocumentType?: GeneralTypeInstance
}

const userFactory = (sequelize: Sequelize): ModelCtor<UserInstance> =>
  sequelize.define<UserInstance>(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      names: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      cityID: {
        type: DataTypes.NUMBER,
        defaultValue: 1
      },
      countryID: {
        type: DataTypes.NUMBER,
        defaultValue: 1
      },
      statusID: {
        type: DataTypes.NUMBER,
        defaultValue: 110
      },
      roleID: {
        type: DataTypes.NUMBER
      },
      documentTypeID: {
        type: DataTypes.NUMBER
      },
      enterpriseID: {
        type: DataTypes.NUMBER
      },
      documentNumber: {
        type: DataTypes.STRING
      },
      personalRUC: {
        type: DataTypes.STRING
      },
      birthdate: {
        type: DataTypes.DATE
      },
      studyLevelID: {
        type: DataTypes.NUMBER
      },
      hasCovid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      bankID: {
        type: DataTypes.NUMBER
      },
      accountNumber: {
        type: DataTypes.STRING
      },
      documentFrontPhoto: {
        type: DataTypes.STRING
      },
      documentBackPhoto: {
        type: DataTypes.STRING
      },
      passportPhoto: {
        type: DataTypes.STRING
      },
      picture: {
        type: DataTypes.STRING
      },
      emailVerified: {
        type: DataTypes.BOOLEAN
      },
      clientIDs: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      polygonID: {
        type: DataTypes.NUMBER
      },
      principalEnterpriseUser: {
        type: DataTypes.BOOLEAN
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      documentBirthCertificate: {
        type: DataTypes.STRING
      },
      documentProofAddress: {
        type: DataTypes.STRING
      },
      documentProofStudies: {
        type: DataTypes.STRING
      },
      documentRFS: {
        type: DataTypes.STRING
      },
      documentCV: {
        type: DataTypes.STRING
      },
      documentEmploymentLetters: {
        type: DataTypes.STRING
      },
      documentPersonalLetters: {
        type: DataTypes.STRING
      },
      documentRecordEvaluation: {
        type: DataTypes.STRING
      },
      documentPsychometricEvaluation: {
        type: DataTypes.STRING
      },
      atariID: {
        type: DataTypes.NUMBER
      },
      atariChileID: {
        type: DataTypes.STRING
      },
      classificationUser: {
        type: DataTypes.NUMBER,
        defaultValue: 241
      }
    },
    {
      tableName: 'Users'
    }
  )

export { UserCreationAttributes, UserInstance, userFactory }
