interface DtoNintendoQuoteRequest {
    enterpriseID: number
    vehicleTypeID: number
    serviceID: number
    pickupPoint: DtoNintendoQuotePointRequest
    dropPoint: DtoNintendoQuotePointRequest[]
}

interface DtoNintendoQuotePointRequest {
    type: string
    address: string
}