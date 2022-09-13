import axios, { AxiosResponse } from 'axios' 
import { 
    setupInterceptorsToAxios, 
} from '../utils'
import { errorHandling } from './utils'
const axiosIntercepted = setupInterceptorsToAxios(axios)
type process = {
    type: 
        | 'refreshToken'
}

type DtoMlVndServiceRequest = 
    | DtoMlVndRefreshTokenRequest

type DtoMlVnServiceResponse = 
    | DtoMlVndCreateClientResponse

class MlVndService {
    #args: DtoMlVndServiceRequest

    constructor(args: DtoMlVndServiceRequest) {
        this.#args = args
    }

    public process({type}: process): Promise<DtoMlVnServiceResponse> {
        switch(type){
            case 'refreshToken':
                return this.#refreshToken()
        }
    }

    async #refreshToken(): Promise<DtoMlVnServiceResponse> {
        try {
            const args = this.#args as DtoMlVndRefreshTokenRequest
            console.log('ARGS FROM REFRESH TOKEN: ', JSON.stringify(args))
            const { idPlatform } = args
            if(!idPlatform)
                throw new Error('idPlatform is required for process.')

            const response = await axios.post<
                DtoMlVndAccessTokenRequest, 
                AxiosResponse<DtoMlVndAccessTokenResponse>
            >(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }
            )
            if(!response) 
                throw new Error('no access token response.')
            const { data } = response
            if(!data) 
                throw new Error('Error: data not found in response for update token.')

            return data 
        } catch (error) {
			console.log('Errors from integration in refreshToken: ', JSON.stringify(error))
			return errorHandling(error, 'Error in register client')
		}
    }
}

export { MlVndService }