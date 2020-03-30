import { ParsedUrlQuery } from "querystring";

type ItineraryPageQueryParams = ParsedUrlQuery & {
    order?: string;
    addresses?: string;
}

export default ItineraryPageQueryParams;
