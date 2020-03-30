import { parse as urlParse, format as urlFormat } from "url";
import { stringify as queryStringify } from "querystring";

import React, { PureComponent, FormEvent, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import ShortestRouteResponse from "../../types/ShortestRouteResponse";
import AddressField from "../AddressField";
import AddressFormProps from "./AddressForm.props";
import AddressFormState from "./AddressForm.state";

class AddressForm extends PureComponent<AddressFormProps, AddressFormState> {
    constructor(props: AddressFormProps) {
        super(props);

        this.state = {
            currentAddress: '',
            addresses: []
        }
    }

    protected setAddress(event: ChangeEvent<HTMLInputElement>) {
        const address = event.target.value;

        this.setState({
            ...this.state,
            currentAddress: address,
        });
    }

    protected addAddress() {
        const newAddresses =
            this.state.addresses.concat(this.state.currentAddress);

        this.setState({
            currentAddress: "",
            addresses: newAddresses
        });
    }

    protected changeAddress(event: ChangeEvent<HTMLInputElement>, addressIndex: number) {
        const newAddresses = [...this.state.addresses];
        newAddresses[addressIndex] = event.target.value;

        this.setState({
            ...this.state,
            addresses: newAddresses
        })
    }

    protected deleteAddress(addressIndex: number) {
        const newAddresses = this.state.addresses.filter(
            (_, index) => (index !== addressIndex)
        );

        this.setState({
            ...this.state,
            addresses: newAddresses
        });
    }

    protected async submitAddresses(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const rootServerUrlString =
            process.env.REACT_APP_COMMUNITYTECH_TSP_SERVER_URL;
        if(!rootServerUrlString) {
            this.showError('Unable to connect to server.');
            return;
        }

        const addressesSearchString =
            AddressForm.createSearchString(this.state.addresses);

        const serverUrl = urlParse(rootServerUrlString);
        serverUrl.pathname = '/shortest-route';
        serverUrl.search = addressesSearchString;

        try {
            const serverUrlString = urlFormat(serverUrl);
            const serverResponse = await fetch(serverUrlString);
            const {
                order: shortestRouteOrder
            } = await serverResponse.json() as ShortestRouteResponse;

            const itineraryUrl = this.buildItineraryUrlString(shortestRouteOrder);
            this.props.history.push(itineraryUrl);
        } catch(err) {
            this.showError('Unable to connect to server.');
        }
    }

    protected static createSearchString(addresses: string[], order?: number[]) {
        const addressesString = addresses.join('|');
        const queryObject = {
            addresses: addressesString,
            order: ''
        };

        if(order)
            queryObject.order = order.join(',');

        const addressesStringQuery = queryStringify(queryObject);

        return addressesStringQuery;
    }

    protected buildItineraryUrlString(addressOrder: number[]) {
        const addressesStringQuery =
            AddressForm.createSearchString(this.state.addresses, addressOrder);

        const itineraryUrl = {
            pathname: '/itinerary',
            search: addressesStringQuery
        };

        return urlFormat(itineraryUrl);
    }

    protected showError(message: string) {
        if(this.props.onError)
            this.props.onError(message);
    }

    render() {
        return (
            <form onSubmit={(event) => this.submitAddresses.call(this, event)}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >

                    {
                        this.state.addresses.map(
                            (address, index) => {
                                const addressKey = `address-${index}`;
                                return (
                                    <Grid item key={addressKey}>
                                        <AddressField
                                            label="Address"
                                            value={address}
                                            onChange={(event) => this.changeAddress.call(this, event, index)}
                                            onDelete={() => this.deleteAddress.call(this, index)}
                                        />
                                    </Grid>
                                );
                            }
                        )
                    }

                    <Grid
                        container
                        item
                        direction="row"
                        xs={12}
                        spacing={1}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <AddressField
                                label="New address"
                                value={this.state.currentAddress}
                                onChange={this.setAddress.bind(this)}
                            />
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                fullWidth
                                onClick={this.addAddress.bind(this)}
                                disabled={this.state.currentAddress.length === 0}
                            >+</Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={this.state.addresses.length < 2}
                            >Calculate itinerary</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default AddressForm;
