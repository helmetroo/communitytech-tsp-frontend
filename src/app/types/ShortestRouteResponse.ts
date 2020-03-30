import Geolocation from "./Geolocation";

type ShortestRouteResponse = {
    geolocations: Geolocation[];
    order: number[];
}

export default ShortestRouteResponse;
