/**
 * request geolocation
 */
interface DtoOiDcGetCoordinatesRequest {
    region: string
    cityID: number
    addresses: DtoOiDcAddressRequest[]
}

interface DtoOiDcAddressRequest {
    address: string
    zipCode: string | null
    typeAddress: string
    key: string
    origin: string
    orderNumber: number
    trackCode: string
    latitude?: number
    longitude?: number
    inCoverage?: boolean
    message?: string
    point?: Point
}

type GeneralProps = {
    errorMessage: string
  }

type GetDistanceStandardForOrdersProps = {
    OSRMurl: string
    dropOffCoordinates: LngLatPoint
    pickupCoordinates: LngLatPoint
    trackCode: string
}

interface DtoOSRMResponse {
    code: string
    routes: Route[]
    waypoints: Waypoint[]
}

interface DtoPlanSameDayRoutesBody {
    cityID: number
    immediateOffering: boolean
    orderIDs: string[]
    startingTime: string
    vehicleType: VehicleType
}

interface PlanRouteFromOrderIDsArgs extends DtoPlanSameDayRoutesBody {
    orderServiceIDs: number[]
}

interface Route {
    distance: number
    duration: number
    geometry: string
    legs: Leg[]
    weight: number
    weight_name: string
}

interface Waypoint {
    distance: number
    hint: string
    location: number[]
    name: string
}

interface DtoGetShippingCostBody {
    cityID: number
    enterpriseID: number
    serviceID?: number
    packageSizeID?: number
    numPackages?: number
    vehicleTypeID?: number
    weekendTariff?: boolean
    pickupPoint: ShippingPoint
    dropPoint: ShippingPoint[]
}

interface DtoGetQuotationRouteBody {
    distanceRoute?: number
    routeID: number | null | undefined
    numStops: number
    returnRate: number
}