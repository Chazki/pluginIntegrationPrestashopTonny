import { getEnterprisePlatformsByName } from "../database";
import { Response, NextFunction } from "express";

export class MultivendeError extends Error {
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
        const enterprisePlatformId = headers['id-platform'] as string
        if(!enterprisePlatformId)
            throw new MultivendeError('id-platform is missing.')

        const idPlatform = await getEnterprisePlatformsByName(enterprisePlatformId)
        req.idPlatform = idPlatform.id

        next()
    } catch (e) {
        console.log(e)
        next( e instanceof MultivendeError ? e : new MultivendeError('Internal error.'))
    }
}