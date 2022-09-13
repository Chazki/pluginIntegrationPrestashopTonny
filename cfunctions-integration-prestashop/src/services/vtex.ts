import axios, { AxiosResponse } from 'axios' 
import { getEnterprisePlatformsById } from '../database'
import { headersVtex, urlHooks, urlShippingPolicies } from '../utils'
import { errorHandling } from './utils'

type process = {
    type:
        | 'getShippingPolicies'
        | 'postShippingPolicies'
}

type DtoVtexServiceRequest = 
    | DtoVtexRegisterConfigRequest

type DtoVtexServiceResponse = 
    | DtoVtexRegisterConfigResponse

class VtexService {
    #args: DtoVtexServiceRequest

    constructor(args: DtoVtexServiceRequest) {
        this.#args = args
    }

    public process({type}: process): Promise<DtoVtexServiceResponse> {
        switch(type){
            case 'getShippingPolicies':
                return this.#getConfigShop()
            case 'postShippingPolicies':
                return this.#getConfigShop()
        }
    }

    async #getConfigShop(): Promise<DtoVtexServiceResponse> {
        try{
            const args = this.#args as DtoVtexRegisterConfigRequest
            console.log('ARGS FROM GET SHIPPING POLICIES: ', JSON.stringify(args))
            const { idEnterprisePlatform } = args
            if(!idEnterprisePlatform)
                throw new Error('idPlatform is required for process.')

            const ep = await getEnterprisePlatformsById(idEnterprisePlatform)
            
            const [respShippingPolicies, respWebhook] = await Promise.all([
                axios.get<
                    object,
                    AxiosResponse<vtexShippingPolicies>
                >(
                    urlShippingPolicies.replace('@SHOP@', ep.idPlatform),
                    headersVtex(ep.refreshToken, ep.token)
                ),
                axios.get<
                    object,
                    AxiosResponse<vtexWebhook>
                >(
                    urlHooks.replace('@SHOP@', ep.idPlatform),
                    headersVtex(ep.refreshToken, ep.token)
                )
            ])
            if(!respShippingPolicies) 
                throw new Error('no access token response.')
            const { data } = respShippingPolicies
            if(!data) 
                throw new Error('Error: data not found in response for update token.')
            const policies = data.items.filter(
                (item) => 
                    !(item.name.toUpperCase().search('CHAZKI') || 
                    item.shippingMethod.toUpperCase().search('CHAZKI'))
            )
            
            if(!respWebhook) 
                throw new Error('no access token response.')
            if(!respWebhook.data) 
                throw new Error('Error: data not found in response for update token.')
            
            return {
                shop: ep.idPlatform,
                policies: policies ? policies: null,
                hooks: (respWebhook.data) ? respWebhook.data : null
            }
        } catch (error) {
			console.log('Errors from integration in getConfigShop: ', JSON.stringify(error))
			return errorHandling(error, 'Error in register client')
		}
    }

    async #postConfigShop(): Promise<DtoVtexServiceResponse> {
        try {
            const args = this.#args as DtoVtexRegisterConfigRequest
            console.log('ARGS FROM GET SHIPPING POLICIES: ', JSON.stringify(args))
            const { idEnterprisePlatform } = args
            if(!idEnterprisePlatform)
                throw new Error('idPlatform is required for process.')

            const ep = await getEnterprisePlatformsById(idEnterprisePlatform)
        } catch (error) {
			console.log('Errors from integration in postConfigShop: ', JSON.stringify(error))
			return errorHandling(error, 'Error in register client')
		}
    }
}

export { VtexService }