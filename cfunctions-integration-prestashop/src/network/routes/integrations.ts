import { Response, Router, NextFunction } from 'express'
import { response } from '../../network/response'
import { MlVndService } from '../../services'

const integration = Router()
const operationRouter = Router()

integration.use(
    '/integration',
    operationRouter
)

operationRouter
.route('/example-get')
.get(
    async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const lv = new MlVndService({idPlatform: 'xxxxXXXXXxxxXX'})
            const result = await lv.process({type: 'refreshToken'})
            console.log(result)
            response({success: true, message: result}, res, 200)
        } catch (e) {
            next(e)
        }
    }
)

operationRouter
.route('/example-post')
.post(
    async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { body } = req
            if(!body)
                throw new Error('idPlatform is required for process.')
            const MlVnd = new MlVndService(
                body as DtoMlVndRefreshTokenRequest
            )
            const refresh = await MlVnd.process({type: 'refreshToken'}) as DtoMlVndCreateClientResponse
            response({success: true, ...refresh}, res, 200)
        } catch (e) {
            next(e)
        }
    }
)

operationRouter
.route('/callback')
.post(
    async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            response({success: true, message: 'example for response'}, res, 200)
        } catch (e) {
            next(e)
        }
    }
)

export { integration }