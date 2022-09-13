/**
 * Response geolocation
 */
interface DtoOiDcValidateAddressResponse {
    lat: number
    lng: number
    inCoverage: boolean
    error?: string
    error_description?: string
}

interface DtoGeolocationTokenResponse {
    access_token: string
    expires_in: number
    token_type: string
    error?: string
    error_description?: string
}

/**
 * Response Planner
 */
interface DtoPlanSameDayRoutesResponse {
    message: string
    status: number
}

interface DtoGetShippingCostResponse {
    success: boolean
    message: string
    response: DtoGetShippingCostResponseData | null
}

interface DtoGetShippingCostResponseData {
    polyline: string
    totalDistanceEstimate: number
    totalTimeEstimate: number
    totalDistanceEstimateUnits: string
    totalTimeEstimateUnits: string
    quotations: Quotation[]
    steps?: Step[]
}

interface DtoGetQuotationRouteResponse {
    success: boolean
    message: string
    response: QuotationRoute
}