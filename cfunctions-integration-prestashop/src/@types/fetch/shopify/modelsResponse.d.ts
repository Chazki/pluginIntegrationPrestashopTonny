interface DtoMlVndTotalPriceSetShopifyResponse {
    "presentmentMoney"?: DtoMlVndMoneyShopifyResponse
    "shopMoney": DtoMlVndMoneyShopifyResponse
}

interface DtoMlVndMoneyShopifyResponse {
    "amount": string
    "currencyCode"?: string
}

interface DtoMlVndCustomerShopifyResponse {
    "id": string
    "firstName": string
    "lastName": string
    "email": string
    "defaultAddress": DtoMlVndDefaultAddressShopifyResponse
}

interface DtoMlVndDefaultAddressShopifyResponse {
    "phone": string | null
}

interface DtoMlVndShippingLineShopifyResponse {
    "carrierIdentifier": string | null
    "code": string
    "custom": boolean
    "deliveryCategory": string | null
    "discountAllocations": (string | null)[]
    "discountedPriceSet": DtoMlVndTotalPriceSetShopifyResponse
    "id": string
    "originalPriceSet": DtoMlVndTotalPriceSetShopifyResponse
    "phone": string | null
    "requestedFulfillmentService": null,
    "shippingRateHandle": string
    "source": string
    "taxLines": (string | null)[]
    "title": string
}

interface DtoMlVndTaxLinesShopifyResponse {
    "rate": number
    "title": string
    "priceSet": DtoMlVndTotalPriceSetShopifyResponse
    "channelLiable": string | null
    "ratePercentage": number
}

interface DtoMlVndShippingAddressShopifyResponse {
    "firstName": string
    "lastName": string
    "name": string
    "phone": string | null
    "zip": string
    "city": string
    "province": string
    "country": string
    "address1": string
    "address2": string | null
}

interface DtoMlVndBillingAddressShopifyResponse extends 
DtoMlVndShippingAddressShopifyResponse {
    "company": string | null
    "countryCodeV2": string
    "formatted": string[]
    "formattedArea": string
    "id": string
    "latitude": number
    "longitude": number
    "provinceCode": string
}

interface DtoMlVndTransactionsShopifyResponse {
    "id": string
    "parentTransaction": string | null
    "status": string
    "gateway": string
    "authorizationCode": string
    "amountSet": DtoMlVndTotalPriceSetShopifyResponse
}

interface DtoMlVndLineItemsShopifyResponse {
    edges: DtoMlVndLineItemsEdgesShopifyResponse[]
}

interface DtoMlVndLineItemsEdgesShopifyResponse {
    node: DtoMlVndLineItemsNodeShopifyResponse
}

interface DtoMlVndLineItemsNodeShopifyResponse {
    "id": string
    "variant": DtoMlVndLineItemsVariantShopifyResponse
    "quantity": number
    "originalUnitPriceSet": DtoMlVndTotalPriceSetShopifyResponse
    "sku": string
    "discountAllocations": (string | null)[]
}

interface DtoMlVndLineItemsVariantShopifyResponse {
    "id": string
}