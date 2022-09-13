import { Response, Router, NextFunction } from 'express'
import { VtexService } from '../../services/vtex'
import { response } from '../../network/response'

const vtex = Router()
const operationRouter = Router()

vtex.use(
    '/vtex',
    operationRouter
)

operationRouter
.route('/register-config')
.get(
    async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { query, body } = req
            const { idEnterprisePlatform } = query
            if(!idEnterprisePlatform)
                throw new Error('idPlatform is required for process.')
            const Vtex = new VtexService(
                { idEnterprisePlatform } as DtoVtexRegisterConfigRequest
            )
            const getConfig = await Vtex.process({type: 'getShippingPolicies'})
            response({success: true, ...getConfig}, res, 200)
        } catch (e) {
            next(e)
        }
    }
)
.post(
    async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            response({success: true, link: 'register'}, res, 200)
        } catch (e) {
            next(e)
        }
    }
)

export { vtex }