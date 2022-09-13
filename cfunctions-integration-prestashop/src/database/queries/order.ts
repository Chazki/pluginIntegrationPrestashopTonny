import {  Order, OrderInstance, sequelizeConnection } from ".."
import { QueryTypes } from "sequelize"

export const getOrderByTrackCode = async (
    enterpriseID: number,
    trackCode: string
): Promise<OrderInstance | null> => {
    try {
        if(!enterpriseID)
            throw new Error('enterpriseID not found and required.')
        if(!trackCode)
            throw new Error('trackCode not found and required.')
        
        const orderData = await Order.findOne({
            where: { enterpriseID, trackCode, deleted: false }
        })

        return orderData
    } catch(error: any){
        console.log(error)
        throw new Error(error.message)
    }
}

