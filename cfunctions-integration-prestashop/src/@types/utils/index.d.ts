type LngLatPoint = [longitude: number, latitude: number]
type Point = {
    coordinates: LngLatPoint
    type: 'point'
}

type Polygon = {
    coordinates: LngLatPoint
    type: 'Polygon'
}

interface Metadata {
    [key: string]: any
}

interface DtoLegacyCLMetadata {
    [key: string]: string | number | boolean
}

interface AttentionHour {
    startHour: string
    endHour: string
}

interface ContactPerson {
    area: string
    name: string
    email: string[]
    phone: string[]
    currentContact: boolean
}

interface paramsValidateAddress {
    values: DtoOiDcAddressRequest[] 
    cityID: number 
    region: string
}

interface errorsItem {
    line: number
    type: string
    field: string
    input: string
    label: string
    messages: string[]
    trackCode: string
}