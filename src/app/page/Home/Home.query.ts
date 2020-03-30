import { ParsedUrlQuery } from "querystring";

type HomePageQueryParams = ParsedUrlQuery & {
    addresses?: string;
}

export default HomePageQueryParams;
