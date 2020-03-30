import { ParsedUrlQuery } from "querystring";

type ItineraryPageQueryParams = ParsedUrlQuery & {
    addresses?: string
}

export default ItineraryPageQueryParams;
