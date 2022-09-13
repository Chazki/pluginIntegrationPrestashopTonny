interface DtoMlVndOwnerResponse {
    _id: string
    name: string
    email: string
    profile: DtoMlVndOwnerProfileResponse
    token: DtoMlVndOwnerTokenResponse
}

interface DtoMlVndOwnerProfileResponse {
    name: string
    fullName: string
}

interface DtoMlVndOwnerTokenResponse {
    _id: string
}

interface DtoMlVndMarketplaceConnectionResponse {
    _name: string
    _id: string
    provider?: string
    name?: string
}

interface DtoMlVndClientResponse {
    fullName: string | null
    _id: string | null
    name: string | null
    lastName: string | null
    activity: string | null
    contactName: string | null
    comune: string | null
    city: string | null
    documentType: string | null
    taxId: string | null
    birthday: string | null
    code: string | null
    email: string | null
    phoneNumber: string | null
    comment: string | null
    type: string | null
    tags: string | null
    status: string | null
    createdAt: string | null
    updatedAt: string | null
    CreatedById: string | null
    UpdatedById: string | null
    MerchantId: string | null
    BillingAddresses: DtoMlVndShippingAddressResponse[]
}

interface DtoMlVndShippingAddressResponse {
    _id: string
    name: string
    address_1: string
    address_2: string | null
    description: string
    indications: string
    receiverName: string | null
    zipCode: string | null
    city: string | null
    state: string | null
    country: string | null
    street: string | null
    number: string | null
    neighborhood: string | null
    position: number
    status: string
    importance: string
    createdAt: string
    updatedAt: string
    CreatedById: string
    UpdatedById: string
    ClientId: string
    MerchantId: string
}

interface DtoMlVndDeliveryTypeResponse {
    _id: string
    name: string
    code: string
    description: string
    position: number
    tags: string | null
    status: string
    createdAt: string
    updatedAt: string
}

interface DtoMlVndMerchantResponse {
    _id: string
    name: string
    businessName: string | null
    description: string | null
    code: string | null
    address: string | null
    zipCode: string | null
    activity: string | null
    taxId: string | null
    email: string | null
    phoneNumber: number
    city: string | null
    status: string
    createdAt: string | null
    updatedAt: string
    MerchantActivityId: string
    LocationId: string
    TimezoneId: string
    MerchantAccountId: string
}

interface DtoMlVndCurrencyResponse {
    _id: string
    status: string
    createdAt: string
    updatedAt: string
    CreatedById: string
    UpdatedById: string
    PlatformCurrencyId: string
    MerchantId: string
    PlatformCurrency: DtoMlVndPlatformCurrencyResponse
}

interface DtoMlVndCheckoutLinksResponse {
    _id: string
    externalId: string
    externalOrderNumber: string
    externalCustomerOrderNumber: string
    externalContent: DtoMlVndExternalContentMeLiResponse |
                    DtoMlVndExternalContentShopifyResponse
    synchronizationStatus: string
    status: string
    externalCreatedAt: string
    externalUpdatedAt: string
    createdAt: string
    updatedAt: string
    CreatedById: string | null
    UpdatedById: string | null
    MarketplaceConnectionId: string
    MerchantId: string
    CheckoutId: string
    MarketplaceConnection: DtoMlVndMarketplaceConnectionResponse
}

interface DtoMlVndPlatformCurrencyResponse {
    _id: string
    symbol: string
    name: string
    code: string
    decimalPlaces: number
    position: number
    description: string | null
    status: string
    createdAt: string
    updatedAt: string
}

interface DtoMlVndCheckoutsDeliveryOrderInCheckoutsResponse {
    _id : string
    status : string
    inventoryStatus : string
    createdAt : string
    updatedAt : string
    CreatedById : string | null
    UpdatedById : string | null
    DeliveryOrderId : string
    CheckoutId : string
    MerchantId : string
    DeliveryOrder: DtoMlVndCheckoutsDeliveryOrderResponse
}

interface DtoMlVndCheckoutsDeliveryOrderResponse {
    _id: string
    code: string
    cost: number
    isDeliveryPaid: string
    tags: string | null
    estimatedDeliveryDateFrom: string | null
    estimatedDeliveryDateTo: string | null
    effectiveDeliveryClosingDate: string | null
    promisedDeliveryDate: string | null
    handlingDateLimit: string | null
    comment: string | null
    deliveryClosingComment: string | null
    status: string
    inventoryStatus: string
    shippingLabelStatus: string | null
    shippingLabelPrintStatus: string
    deliveryStatus: string
    deliveryAddress: string | null
    trackingNumber: string | null
    trackingUrl: string | null
    courierName: string | null
    shippingMode: string | null
    createdAt: string
    updatedAt: string
    CreatedById: string | null
    UpdatedById: string | null
    AssignedToId: string | null
    OwnerId: string | null
    CurrencyId: string | null
    ShippingAddressId: string | null
    DeliveryTypeId: string
    MerchantId: string
    WarehouseId: string
    CourierId: string | null
    DeliveryOrderStatusId: string | null
    MerchantCourierId: string | null
    ShippingAddress: DtoMlVndDeliveryOrderShippingAddressResponse | null
}

interface DtoMlVndDeliveryOrderShippingAddressResponse {
    _id: string
    name: string | null
    address_1: string | null
    address_2: string | null
    description: string | null
    indications: string
    receiverName: string | null
    zipCode: string | null
    city: string
    state: string
    country: string
    street: string
    number: string
    neighborhood: string | number
    position: string
    status: string
    importance: string
    createdAt: string
    updatedAt: string
    CreatedById: string | null
    UpdatedById: string | null
    ClientId: string
    MerchantId: string
    ShippingAddressReceivers: DtoMlVndDeliveryOrderShippingAddressResponse
}

interface DtoMlVndDeliveryOrderShippingAddressResponse {
    fullName: string
    _id: string
    documentType: string | null
    taxId: string | null
    name: string
    lastName: string | null
    contactName: string
    code: string | null
    email: string | null
    phoneNumber: string
    status: string
    createdAt: string
    updatedAt: string
    CreatedById: string | null
    UpdatedById: string | null
    ShippingAddressId: string
    MerchantId: string
}

interface DtoMlVndCheckoutPaymentsResponse {
    _id: string
    code: string | null
    amount: number
    amountPaid: number
    change: number
    paymentStatus: string
    authorizationCode: string | null
    detail: string | null
    status: string
    verificationStatus: string | null
    cardNumber: string | null
    installments: string | null
    datePaid: string | null
    dateVerificated: string | null
    createdAt: string
    updatedAt: string
    CreatedById: string
    UpdatedById: string
    CheckoutId: string
    PaymentMethodId: string
    PaymentGatewayId: string | null
    CurrencyId: string
    MerchantId: string
    PaymentMethod: DtoMlVndPaymentMethodResponse
    PaymentGateway: string | null
    PaymentGateway: object[]
}

interface DtoMlVndPaymentMethodResponse {
    _id: string
    tags: string
    code: string
    name: string
    description: string
    position: number
    status: string
    createdAt: string | null
    updatedAt: string | null
    codeTranslated: string
}

interface DtoMlVndCheckoutItemsResponse {
    _id: string
    code: string | null
    net: number
    tax: number
    gross: number
    count: number
    tags: string | null
    status: string
    createdAt: string
    updatedAt: string
    CreatedById: string
    UpdatedById: string
    CheckoutId: string
    ProductVersionId: string
    MerchantId: string
    CheckoutItemDiscounts: object[]
    ProductVersion: DtoMlVndProductVersionResponse
    total: number
    discount: number
    totalWithDiscount: number
    paymentByItem: number
}

interface DtoMlVndProductVersionResponse {
    _id: string
    code: string
    internalCode: string | null
    providerCode: string | null
    position: number
    width: number
    length: number
    height: number
    weight: number
    status: string
    createdAt: string
    updatedAt: string
    CodeTypeId: string | null
    InternalCodeTypeId: string | null
    ColorId: string
    SizeId: string
    CreatedById: string
    UpdatedById: string
    InventoryTypeId: string
    ProductId: string
    MerchantId: string
    Size: DtoMlVndProductVersionSizeResponse
    Color: DtoMlVndGeneralVersionResponse
    Product: DtoMlVndProductVersionProductResponse
}

interface DtoMlVndGeneralVersionResponse {
    _id: string
    name: string
    code: string | null
    tags?: string | null
    status: string
    createdAt: string
    updatedAt: string
    CreatedById: string
    UpdatedById: string
    MerchantId: string
}

interface DtoMlVndProductVersionSizeResponse extends 
DtoMlVndGeneralVersionResponse {
    position: number
}

interface DtoMlVndProductVersionProductResponse extends 
DtoMlVndGeneralVersionResponse {
    model: string
    internalCode: string | null
    providerCode: string | null
    CodeTypeId: string | null
    InternalCodeTypeId: string | null
    ProductCategoryId: string
    BrandId: string
    BrandTaxonomyItemId: string | null
    SeasonId: string | null
    WarrantyId: string
    ShippingClassId: string
    OfficialStoreId: string
    ProductTypeId: string
}

interface DtoMlVndWarehouseResponse {
    _id: string
    name: string
    code: string | null
    address: string | null
    description: string | null
    type: string
    phoneAreaCode: string | null
    phoneNumber: string | null
    latitude: number
    longitude: number
    openHours: string | null
    tags: string | null
    position: number
    status: string
    createdAt: string
    updatedAt: string
    CreatedById: string
    UpdatedById: string
    LocationId: string | null
    TimezoneId: string | null
    MerchantId: string
    SalesGroupId: string | null
}

interface FtMlVndUpdateDeliveryOrderInCheckoutsResponse {
    _id  : string
    status  : string
    inventoryStatus  : string
    createdAt  : string
    updatedAt  : string
    CreatedById  : string | null
    UpdatedById  : string | null
    DeliveryOrderId  : string
    CheckoutId  : string
    MerchantId  :string
}