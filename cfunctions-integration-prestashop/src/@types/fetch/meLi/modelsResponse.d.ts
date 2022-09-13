interface DtoMlVndOrderRequestMeLiResponse {
    return: string | null
    change: string | null
}

interface DtoMlVndCouponMeLiResponse {
    id: string | null
    amount: number
}

interface DtoMlVndOrderItemsMeLiResponse {
    item: DtoMlVndOrderItemMeLiResponse
    quantity: number
    requested_quantity: DtoMlVndOrderItemRequestedQuantityMeLiResponse
    picked_quantity: number | null
    unit_price: number
    full_unit_price: number
    currency_id: string
    manufacturing_days: string | null
    sale_fee: number
    listing_type_id: string | null
}

interface DtoMlVndOrderItemMeLiResponse {
    id: string
    title: string
    category_id: string
    variation_id: number | null
    seller_custom_field: string
    variation_attributes: (string | null)[],
    warranty: number | null
    condition: string
    seller_sku: string | null
    global_price: number | null
    net_weight: string | null
}

interface DtoMlVndOrderItemRequestedQuantityMeLiResponse {
    Value: number
    measure: string
}

interface DtoMlVndOrderItemPaymentResponse {
    id: number
    order_id: number
    payer_id: number
    collector: DtoMlVndPaymentsCollectorResponse
    card_id: number
    site_id: string
    reason: string
    payment_method_id: string
    currency_id: string
    installments: number
    issuer_id: string
    atm_transfer_reference: DtoMlVndPaymentsTransferReferenceResponse
    coupon_id: number | null
    activation_uri: string | null
    operation_type: string
    payment_type: string
    available_actions: (string | null)[]
    status: string
    status_code: string | null
    status_detail: string
    transaction_amount: number
    transaction_amount_refunded: number
    taxes_amount: number
    shipping_cost: number
    coupon_amount: number
    overpaid_amount: number
    total_paid_amount: number
    installment_amount: number
    deferred_period: string | null
    date_approved: string
    authorization_code: string
    transaction_order_id: number | null
    date_created: string
    date_last_modified: string
}

interface DtoMlVndPaymentsCollectorResponse {
    id: number
}

interface DtoMlVndPaymentsTransferReferenceResponse {
    company_id: string | null
    transaction_id: string | null
}

interface DtoMlVndOrderItemShippingResponse {
    receiver_id: number
    base_cost: number
    status_history: DtoMlVndOrderItemStatusHistoryMeLiResponse
    return_details: string | null
    sender_id: number
    mode: string
    order_cost: number
    carrier_id: number | null
    service_id: number | null
    shipping_items: DtoMlVndShippingItemsMeLiResponse[]
    tracking_number: string | null
    cost_components: DtoMlVndCostComponentsMeLiResponse
    id: number
    tracking_method: string | null
    last_updated: string
    comments: string | null
    substatus: string | null
    date_created: string
    date_first_printed: string | null
    created_by: string
    shipping_option: DtoMlVndShippingOptionMeLiResponse
    tags: (string | null)[]
    sender_address: DtoMlVndSenderAddressMeLiResponse
    return_tracking_number: string | null
    site_id: string
    carrier_info: string | null
    market_place: string
    receiver_address: DtoMlVndReceiverAddressMeLiResponse
    order_id: number
    status: string
    cost: number
}

interface DtoMlVndOrderItemStatusHistoryMeLiResponse {
    date_shipped: string | null
    date_delivered: string | null
}

interface DtoMlVndShippingItemsMeLiResponse {
    quantity: number
    dimensions_source: string | null
    description: string
    id: string
    dimensions: string | null
}

interface DtoMlVndCostComponentsMeLiResponse {
    special_discount: number 
}

interface DtoMlVndShippingOptionMeLiResponse {
    cost: number
    name: string | null
    id: string
    list_cost: number
    currency_id: string
    speed: string | null
}

interface DtoMlVndSenderAddressMeLiResponse {
    country: DtoMlVndCountryCityMunicipalityMeLiResponse
    address_line: string | null
    'types': (string | null)[]
    agency: string | null
    city: DtoMlVndCountryCityMunicipalityMeLiResponse
    geolocation_type: string
    latitude: number
    municipality: DtoMlVndCountryCityMunicipalityMeLiResponse
    location_id: number | null
    street_name: string
    zip_code: string | null
    geolocation_source: string
    intersection: string | null
    street_number: string
    comment: string | null
    id: number
    state: DtoMlVndCountryCityMunicipalityMeLiResponse
    neighborhood: DtoMlVndCountryCityMunicipalityMeLiResponse
    geolocation_last_updated: string
    longitude: number
}

interface DtoMlVndCountryCityMunicipalityMeLiResponse {
    id: string
    name: string
}

interface DtoMlVndReceiverAddressMeLiResponse extends 
DtoMlVndSenderAddressMeLiResponse { 
    delivery_preference: string
    receiver_name: string
    receiver_phone: string
}

interface DtoMlVndFeedbackMeLiResponse {
    buyer: string | null
    seller: string | null
}

interface DtoMlVndContextMeLiResponse {
    channel: string | null
    site: string | null
    flows: (string | null)[]
}

interface DtoMlVndBuyerMeLiResponse {
    id: number
    nickname: string
    email: string
    first_name: string
    last_name: string
    phone: DtoMlVndPhoneMeLiResponse
    alternative_phone: DtoMlVndPhoneMeLiResponse
}

interface DtoMlVndPhoneMeLiResponse {
    extension: string | null
    area_code: string | null
    number: string | null
    verified?: boolean
}

interface DtoMlVndTaxesMeLiResponse {
    amount: string | null
    currency_id: string | null
    id: number | null
}

interface DtoMlVndRemoteOrderExtraBillingInformationMeLiResponse {
    billing_info: DtoMlVndBillingInfoMeLiResponse
}

interface DtoMlVndBillingInfoMeLiResponse {
    doc_type: string | null
    doc_number: string | null
    additional_info: (string | null)[]
}