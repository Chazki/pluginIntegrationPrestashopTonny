interface DtoMlVndExternalContentMeLiResponse {
    id: number
    date_created: string
    date_closed: string
    last_updated: string
    manufacturing_ending_date: string | null
    comment: string | null
    pack_id: string | null
    pickup_id: string | null
    order_request: DtoMlVndOrderRequestMeLiResponse
    fulfilled: string | null
    mediations: (string | null)[]
    total_amount: number
    paid_amount: number
    coupon: DtoMlVndCouponMeLiResponse
    expiration_date: string
    order_items: DtoMlVndOrderItemsMeLiResponse[]
    currency_id: string
    payments: DtoMlVndOrderItemPaymentResponse[]
    shipping: DtoMlVndOrderItemShippingResponse
    status: string
    status_detail: string | null
    tags: (string | null)[]
    feedback: DtoMlVndFeedbackMeLiResponse
    context: DtoMlVndContextMeLiResponse
    buyer: DtoMlVndBuyerMeLiResponse
    seller: DtoMlVndBuyerMeLiResponse
    taxes: DtoMlVndTaxesMeLiResponse
    total_amount_with_shipping: number
    remote_order_extra_billing_information: DtoMlVndRemoteOrderExtraBillingInformationMeLiResponse
}
