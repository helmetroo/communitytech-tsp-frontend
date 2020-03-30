import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { parse as parseQueryString } from "querystring";
import Typography from "@material-ui/core/Typography";

import { Page } from "../../layout";

import ItineraryList from "../../components/ItineraryList";
import ItineraryPageQueryParams from "./Itinerary.query";

class ItineraryPage extends PureComponent<RouteComponentProps> {
    protected readonly itinerary: string[] = [];
    protected readonly order: number[] = [];

    constructor(props: RouteComponentProps) {
        super(props);

        const queryString = props.location.search.substr(1);
        const parsedQuery: ItineraryPageQueryParams = parseQueryString(queryString);
        if(parsedQuery.addresses) {
            const itinerary = parsedQuery.addresses;
            this.itinerary = itinerary.split('|');
        }

        if(parsedQuery.order) {
            const orderString = parsedQuery.order;
            this.order = orderString.split(',').map(
                numberStr => parseInt(numberStr, 10)
            );
        }
    }

    render() {
        return (
            <Page>
                <Typography>
                    <h1>Here's your itinerary</h1>
                    <ItineraryList addresses={this.itinerary} order={this.order} />
                </Typography>
            </Page>
        );
    }
};

export default ItineraryPage;
