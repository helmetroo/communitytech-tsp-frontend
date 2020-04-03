import { parse as urlParse, format as urlFormat } from "url";
import { parse as parseQueryString } from "querystring";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
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

    protected goBackToHome() {
        this.props.history.goBack();
    }

    render() {
        const mapsUrl = this.buildMapsUrl();

        return (
            <Page>
                <Box m="2rem">
                    <Typography variant="h1">Here's your itinerary</Typography>
                </Box>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item style={{ maxWidth: "305px", width: "100%" }}>
                        <ItineraryList addresses={this.addresses} order={this.order} />
                    </Grid>

                    <Grid item container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                href={mapsUrl}
                            >View route in Google Maps</Button>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.goBackToHome.bind(this)}
                            >&lt;&lt; EDIT STOPS</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Page>
        );
    }
};

export default ItineraryPage;
