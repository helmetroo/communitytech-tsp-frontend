import { parse as urlParse, format as urlFormat } from "url";
import { parse as parseQueryString } from "querystring";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Page } from "../../layout";

import ItineraryList from "../../components/ItineraryList";
import ItineraryPageQueryParams from "./Itinerary.query";

class ItineraryPage extends PureComponent<RouteComponentProps> {
    protected readonly addresses: string[] = [];
    protected readonly order: number[] = [];

    constructor(props: RouteComponentProps) {
        super(props);

        const queryString = props.location.search.substr(1);
        const parsedQuery: ItineraryPageQueryParams = parseQueryString(queryString);
        if(parsedQuery.addresses) {
            const itinerary = parsedQuery.addresses;
            this.addresses = itinerary.split('|');
        }

        if(parsedQuery.order) {
            const orderString = parsedQuery.order;
            this.order = orderString.split(',').map(
                numberStr => parseInt(numberStr, 10)
            );
        }
    }

    protected buildMapsUrl() {
        const googleMapsBaseUrlStr = 'https://www.google.com/maps/dir/';
        const googleMapsUrl = urlParse(googleMapsBaseUrlStr);
        const addressPathname = this.getPathnameForAddresses();
        googleMapsUrl.pathname += addressPathname;
        return urlFormat(googleMapsUrl);
    }

    protected getPathnameForAddresses() {
        const addressesInShortestRouteOrder =
            this.order.map((orderIndex) => {
                const address = this.addresses[orderIndex];
                return address.replace(/ /g, '+');
            });

        return addressesInShortestRouteOrder.join('/');
    }

    render() {
        const mapsUrl = this.buildMapsUrl();

        return (
            <Page>
                <Typography>
                    <h1>Here's your itinerary</h1>
                </Typography>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <ItineraryList addresses={this.addresses} order={this.order} />
                    </Grid>

                    <Grid item container direction="row" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            href={mapsUrl}
                        >View route in Google Maps</Button>
                    </Grid>
                    </Grid>
                </Grid>
            </Page>
        );
    }
};

export default ItineraryPage;
