import axios, { AxiosResponse } from 'axios' 
import { getEnterpriseByID } from '../database'
import { urlQuoteCost } from '../utils'
import { errorHandling } from './utils'

type process = {
    type:
        | 'getBranchPoint'
}

type DtoPrestashopServiceRequest = 
    | DtoPrestashopBranchRequest

type DtoPrestashopServiceResponse = 
    | DtoPrestashopBranchResponse

class PrestashopService {
    #args: DtoPrestashopServiceRequest

    constructor(args: DtoPrestashopServiceRequest) {
        this.#args = args
    }

    public process({type}: process): Promise<DtoPrestashopServiceResponse> {
        switch(type){
            case 'getBranchPoint':
                return this.#getBranchPoint()
        }
    }

    async #getBranchPoint(): Promise<DtoPrestashopServiceResponse> {
        try{
            const args = this.#args as DtoPrestashopBranchRequest
            console.log('ARGS FROM GET BRANCH POINT: ', JSON.stringify(args))
            const { enterpriseID, pickupAddress, serviceName, dropAddress } = args
            if(!enterpriseID)
                throw new Error('idPlatform is required for process.')

            const enterprise = await getEnterpriseByID(enterpriseID)
            
            const service = enterprise.Services.filter( item => item.name === serviceName)
            const dropPoint = await Promise.all(
                dropAddress.map(itm => {
                    return {
                        type: 'dropAddress',
                        address: itm
                    }
                })
            )
            const bodyQuote = {
                enterpriseID,
                vehicleTypeID: 36,
                serviceID: (service.length > 0)? service[0].id : 0,
                pickupPoint: {
                    type: 'pickUpAddress',
                    address: pickupAddress
                },
                dropPoint
            }

            const response = await axios.post<DtoNintendoQuoteRequest, AxiosResponse<DtoNintendoQuoteResponse>>(
                urlQuoteCost,
                bodyQuote
            )

            const { data } = response
            if(!data) throw new Error('NOT RESPONSE QUOTATION')
            
            const quotes = data.response.quotations
            if(!(quotes.length > 0)) throw new Error('QUOTATION NOT FOUND')

            const quoteService = (quotes[0].quotationEnterprise.length > 0) 
                ? quotes[0].quotationEnterprise[0].cost 
                : (quotes[0].quotationAffiliate.length > 0) 
                    ? quotes[0].quotationAffiliate[0].cost
                    : 0
            
            return {
                quote: quoteService
            }
        } catch (error) {
			console.log('Errors from integration in getBranchPoint: ', JSON.stringify(error))
			return errorHandling(error, 'Error in branch of enterprise')
		}
    }
}

export { PrestashopService }