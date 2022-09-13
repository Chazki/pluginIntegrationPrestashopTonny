interface DtoMlVndExternalContentShopifyResponse {
    id: number
    name: string
    email: string
    totalPriceSet: DtoMlVndTotalPriceSetShopifyResponse
    customer: DtoMlVndCustomerShopifyResponse
    currentTotalDiscountsSet: DtoMlVndTotalPriceSetShopifyResponse
    currentTotalTaxSet: DtoMlVndTotalPriceSetShopifyResponse
    shippingLine: DtoMlVndShippingLineShopifyResponse
    taxLines: DtoMlVndTaxLinesShopifyResponse[]
    totalTaxSet: DtoMlVndTotalPriceSetShopifyResponse
    totalShippingPriceSet: DtoMlVndTotalPriceSetShopifyResponse
    discountApplications: object
    displayFinancialStatus: string
    physicalLocation: string | null
    currencyCode: string
    shippingLines: object
    processedAt: string
    shippingAddress: DtoMlVndShippingAddressShopifyResponse
    billingAddress: DtoMlVndBillingAddressShopifyResponse
    cancelReason: string | null
    cancelledAt: string | null
    transactions: DtoMlVndTransactionsShopifyResponse[]
    lineItems: DtoMlVndLineItemsShopifyResponse
    fulfillments: (string | null)[]
    createdAt: string
    updatedAt: string
}