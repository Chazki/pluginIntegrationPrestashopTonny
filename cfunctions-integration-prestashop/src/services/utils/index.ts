import { MlVndError } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandling = (e: any, message?: string): never => {
  console.log(e)

  if (e instanceof MlVndError) throw e

  throw new MlVndError(message ?? e.message)
}

export { errorHandling }
export * from './messages'
