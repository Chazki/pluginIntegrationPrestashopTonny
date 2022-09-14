import { Response, Router, NextFunction } from 'express'
import { verifyIdPlatformKey } from '../../utils'
import { PrestashopService } from '../../services/prestashop'
import { response } from '../response'

const prestashop = Router()
const operationRouter = Router()

prestashop.use(
    '/prestashop',
    verifyIdPlatformKey,
    operationRouter
)

operationRouter
.route('/quote')
.post(
    async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { enterpriseID, body } = req
            if(!enterpriseID)
                throw new Error('enterpriseID is required for process.')
            const prestashop = new PrestashopService(
                { enterpriseID, ...body } as DtoPrestashopBranchRequest
            )
            const getBranch = await prestashop.process({type: 'getBranchPoint'})
            response({success: true, ...getBranch}, res, 200)
        } catch (e) {
            next(e)
        }
    }
)

export { prestashop }