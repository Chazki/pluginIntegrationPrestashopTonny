interface DtoMlVndCreateClientRequest {
    code: string
}

interface DtoMlVndCallbackRequest {
    CheckoutId: string
    MerchantId: string
    MerchantAppId: string
    OauthClient: DtoMlVndOauthClientRequest
    resource: string
    attemps: number
    received: string
}

interface DtoMlVndRefreshTokenRequest {
    idPlatform: string
}

interface DtoMlVndOauthClientRequest {
    _id: string
    client_id: string
}