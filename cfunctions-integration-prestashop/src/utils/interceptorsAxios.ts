import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getEnterprisePlatformsByName, updateEnterprisePlatform } from "../database";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if(config.headers)
        config.headers['Authorization'] = `${config.headers['Authorization']}`
    return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response
}

const refreshTokenInterceptors = async (merchantId: string) => {
    const platform = await getEnterprisePlatformsByName(merchantId)
    /*const response = await axios.post<
        DtoMlVndAccessTokenRequest, 
        AxiosResponse<DtoMlVndAccessTokenResponse>
    >(
        urlAccessToken,
        bodyRefreshToken(platform.refreshToken)
    )*/
    // RESPONSE OF EXAMPLE
    const response = {
        data: {
            token: 'XXXXXXXXXXXXXXXxxxxxXXX',
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
    }
    const { data } = response
    /*await updateEnterprisePlatform(
        platform.id,
        {
            refreshToken: data.refreshToken,
            token: data.token
        }
    )*/
    console.log('Refresh Token for Interceptors: ', merchantId)
    console.log('data response multivende: ', JSON.stringify(data))
    return response
}

const onValidateRefreshToken = async (error: AxiosError): Promise<AxiosError | AxiosResponse> => {
    const config = error.config
    if(!(error.response) || error.response.status !== 401)
        return Promise.reject(error)
    let merchant = (config.headers) ? config.headers['MerchantId'] as string: ''
    if(!merchant) 
        return Promise.reject(error)

    let res = await refreshTokenInterceptors(merchant)
    if(res.data.token && error.config.headers)
        error.config.headers['Authorization'] = `Bearer ${res.data.token}`
    return axios(error.config)
}

export const setupInterceptorsToAxios = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest)
    axiosInstance.interceptors.response.use(onResponse, onValidateRefreshToken)
    return axiosInstance
}