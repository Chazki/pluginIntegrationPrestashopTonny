import { getEnterpriseIDByKey } from "../database";
import { Response, NextFunction } from "express";

export class PrestashopError extends Error {
    public status: number

    constructor(public message: string) {
        super()
        this.status = 400
    }
}

export const verifyIdPlatformKey =async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { headers } = req
        const enterpriseKey = headers['enterprise-key'] as string
        if(!enterpriseKey)
            throw new PrestashopError('id-platform is missing.')

        const enterpriseId = await getEnterpriseIDByKey(enterpriseKey)
        req.enterpriseID = enterpriseId

        next()
    } catch (e) {
        console.log(e)
        next( e instanceof PrestashopError ? e : new PrestashopError('Internal error.'))
    }
}