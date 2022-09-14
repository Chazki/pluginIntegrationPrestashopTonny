interface DtoNintendoQuoteResponse {
    success: boolean
    message: string
    response: DtoNintendoQuoteResItmResponse
}

interface DtoNintendoQuoteResItmResponse {
    polyline: string
    totalDistanceEstimate: number
    totalTimeEstimate: number
    totalDistanceEstimateUnits: string
    totalTimeEstimateUnits: string
    quotations: DtoNintendoQuoteQuotationItmResponse[]
}

interface DtoNintendoQuoteQuotationItmResponse {
    vehicleTypeID: number
    serviceID: number
    quotationEnterprise: DtoNintendoQuoteQuotationValueResponse[]
    quotationAffiliate: DtoNintendoQuoteQuotationValueResponse[]
}

interface DtoNintendoQuoteQuotationValueResponse {
    typeQuote: string
    weekendTariff: boolean
    cost: number
}