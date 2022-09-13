export const urlShippingPolicies = '@SHOP@/api/logistics/pvt/shipping-policies'
export const urlHooks = '@SHOP@/api/orders/hook/config'

export const headersVtex = (appKey: string, appToken: string) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': appKey,
            'X-VTEX-API-AppToken': appToken
        }
    }
}

export const modelShippingPolicies = {
    'id': '2947',
    'name': 'Chazki - Express',
    'shippingMethod': 'Chazki - Express',
    'weekendAndHolidays': {
        'saturday': true,
        'sunday': true,
        'holiday': false
    },
    'maxDimension': {
        'largestMeasure': 250.0,
        'maxMeasureSum': 250.0
    },
    'numberOfItemsPerShipment': 1,
    'minimumValueAceptable': 0.0,
    'maximumValueAceptable': 0.0,
    'deliveryScheduleSettings': {
        'useDeliverySchedule': false,
        'dayOfWeekForDelivery': [],
        'maxRangeDelivery': 0
    },
    'carrierSchedule': [],
    'cubicWeightSettings': {
        'volumetricFactor': 0.0,
        'minimunAcceptableVolumetricWeight': 0.0
    },
    'modalSettings': {
        'modals': [],
        'useOnlyItemsWithDefinedModal': false
    },
    'businessHourSettings': {
        'carrierBusinessHours': [
            {
                'dayOfWeek': 0,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            },
            {
                'dayOfWeek': 1,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            },
            {
                'dayOfWeek': 2,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            },
            {
                'dayOfWeek': 3,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            },
            {
                'dayOfWeek': 4,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            },
            {
                'dayOfWeek': 5,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            },
            {
                'dayOfWeek': 6,
                'openingTime': '00:00:00',
                'closingTime': '23:59:59'
            }
        ],
        'isOpenOutsideBusinessHours': true
    },
    'pickupPointsSettings': {
        'pickupPointIds': [],
        'pickupPointTags': [],
        'sellers': []
    },
    'isActive': true
}

