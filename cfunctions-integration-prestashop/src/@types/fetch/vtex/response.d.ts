interface vtexWeekendAndHolidays {
    saturday: boolean
    sunday: boolean
    holiday: boolean
}

interface vtexMaxDimension {
    largestMeasure: number
    maxMeasureSum: number
}

interface vtexAdditionalPrice {
    method: number
    value: number
}

interface vtexDeliveryScheduleSettings {
    useDeliverySchedule: boolean
    dayOfWeekForDelivery: string[]
    maxRangeDelivery: number
    dayOfWeekBlockeds: string[]
}

interface vtexCubicWeightSettings {
    volumetricFactor: number
    minimunAcceptableVolumetricWeight: number
}

interface vtexModalSettings {
    modals: string[]
    useOnlyItemsWithDefinedModal: boolean
}

interface vtexBusinessHourSettings {
    carrierBusinessHours: vtexCarrierBusinessHours[]
    isOpenOutsideBusinessHours: boolean
}

interface vtexCarrierBusinessHours {
    dayOfWeek: number
    openingTime: string
    closingTime: string
}

interface vtexPickupPointsSettings {
    pickupPointIds: string[]
    pickupPointTags: string[]
    sellers: string[]
}

interface vtexProcessingStatus {
    status: number
    errorMessage: string | null
    errorsMetadata: string | null
}

interface vtexShippingHoursSettings {
    shippingHours: vtexCarrierBusinessHours[]
    acceptOrdersOutsideShippingHours: boolean
}

interface vtexShippingPoliciesItem {
    id: string
    name: string
    shippingMethod: string
    weekendAndHolidays: vtexWeekendAndHolidays
    maxDimension: vtexMaxDimension
    numberOfItemsPerShipment: number
    minimumValueAceptable: number
    maximumValueAceptable: number
    additionalTime: string
    additionalPrice: vtexAdditionalPrice
    deliveryScheduleSettings: vtexDeliveryScheduleSettings
    carrierSchedule: string[]
    cubicWeightSettings: vtexCubicWeightSettings
    modalSettings: vtexModalSettings
    businessHourSettings: vtexBusinessHourSettings
    pickupPointsSettings: vtexPickupPointsSettings
    processingStatus: vtexProcessingStatus
    deliveryChannel: string
    calculationType: number
    isActive: boolean
    lastIndexedAt: string
    shippingHoursSettings: vtexShippingHoursSettings
}

interface vtexPaging {
    page: number
    perPage: number
    total: number
    pages: number
}

interface vtexFilterHook {
    status: string[]
    type: string
}

interface vtexHook {
    url: string
    headers: object
}

interface vtexShippingPolicies {
    items: vtexShippingPoliciesItem[]
    paging: vtexPaging
}

interface vtexWebhook {
    filter: vtexFilterHook
    hook: vtexHook
}