import { parse as urlParse, format as urlFormat } from "url";
import { stringify as queryStringify } from "querystring";

import React, { PureComponent, FormEvent, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import { COLORS } from "../../../theme";

import ShortestRouteResponse from "../../types/ShortestRouteResponse";
import ShortestRouteErrorResponse from "../../types/ShortestRouteErrorResponse";
import AddressesUnresolvedError from "../../types/AddressesUnresolvedError";
import ServerError from "../../types/ServerError";
import AddressField from "../AddressField";
import AddressFormProps from "./AddressForm.props";
import AddressFormState from "./AddressForm.state";
import { AddressFieldMode } from "../AddressField/AddressField.props";
import AddressFieldConfig from "../AddressField/AddressField.config";

class AddressForm extends PureComponent<AddressFormProps, AddressFormState> {
    protected static readonly DEFAULT_ERROR_MESSAGE: string =
        "Sorry, we were unable to fetch the shortest route for you.";

    constructor(props: AddressFormProps) {
        super(props);

        this.state = {
            currentAddress: '',
            addresses: this.props.addresses,
            erroredAddressIndices: []
        };
    }

    protected updateQueryParameters() {
        const addressQuery = '?' + AddressForm.createSearchString(this.state.addresses);
        const newUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            addressQuery;

        window.history.pushState({
            path: newUrl
        }, '', newUrl);
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
            ...this.state,
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
        });
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

    protected clearAllAddressErrors() {
        this.setState({
            ...this.state,
            erroredAddressIndices: []
        });
    }

    protected async submitAddresses(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.clearAllAddressErrors();
        this.updateQueryParameters();

        const rootServerUrlString =
            process.env.REACT_APP_COMMUNITYTECH_TSP_SERVER_URL;
        if(!rootServerUrlString) {
            this.showError(AddressForm.DEFAULT_ERROR_MESSAGE);
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
            await this.handleServerResponse(serverResponse);
        } catch(err) {
            let errorMessage = AddressForm.DEFAULT_ERROR_MESSAGE;
            if(err instanceof AddressesUnresolvedError) {
                errorMessage = err.message;
                this.setErroredAddressIndices(err.erroredAddressIndices);
            }

            this.showError(errorMessage);
        }
    }

    protected async handleServerResponse(serverResponse: Response) {
        if(serverResponse.status === 200) {
            await this.handleSuccessResponse(serverResponse);
            return;
        }

        if(serverResponse.status === 400) {
            await this.handleBadRequestResponse(serverResponse);
            return;
        }

        this.handleServerErrorResponse(serverResponse);
    }

    protected async handleSuccessResponse(serverResponse: Response) {
        const {
            order: shortestRouteOrder
        } = await serverResponse.json() as ShortestRouteResponse;

        const itineraryUrl = this.buildItineraryUrlString(shortestRouteOrder);
        this.props.history.push(itineraryUrl);
    }

    protected async handleBadRequestResponse(serverResponse: Response) {
        const {
            message,
            erroredAddressIndices
        } = await serverResponse.json() as ShortestRouteErrorResponse;

        const addressesUnresolvedError = new AddressesUnresolvedError(message, erroredAddressIndices);
        throw addressesUnresolvedError;
    }

    protected handleServerErrorResponse(serverResponse: Response) {
        const serverError = new ServerError(AddressForm.DEFAULT_ERROR_MESSAGE);
        throw serverError;
    }

    protected setErroredAddressIndices(erroredAddressIndices: number[]) {
        this.setState({
            ...this.state,
            erroredAddressIndices
        });
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

    protected createAddressField(addressFormConfig: AddressFieldConfig) {
        const {
            id,
            label,
            address,
            index,
            error
        } = addressFormConfig;

        return (
            <AddressField
                id={id}
                label={label}
                mode={AddressFieldMode.Normal}
                value={address}
                error={error}
                onChange={(event) => this.changeAddress.call(this, event, index)}
                onDelete={() => this.deleteAddress.call(this, index)}
            />
        );
    }

    protected createComponentForStartAddress() {
        if(this.state.addresses.length === 0)
            return null;

        const [startLocation] = this.state.addresses;
        const addressFieldKey = `address-field-start`;
        const addressFieldConfig: AddressFieldConfig = {
            id: addressFieldKey,
            label: "Starting address",
            address: startLocation,
            index: 0,
        };

        const erroredAddress = this.state.erroredAddressIndices.includes(0);
        if(erroredAddress)
            addressFieldConfig.error = `Cannot find address.`;

        const addressField =
            this.createAddressField(addressFieldConfig);

        const addressFieldWrapper = (
            <Grid item>
                <Card style={{ backgroundColor: COLORS.lightGreen }}>
                    <Typography variant="caption">Your start address</Typography>
                    <Box p={0.8}>{addressField}</Box>
                </Card>
            </Grid>
        );

        return addressFieldWrapper;
    }

    protected createComponentForStopAddresses() {
        if(this.state.addresses.length < 2)
            return null;

        const [, ...stopLocations] = this.state.addresses;
        const stopLocationsListItems = stopLocations.map((address, index) => {
            const addressFieldKey = `address-field-stop-${index}`;

            const addressFieldConfig: AddressFieldConfig = {
                id: addressFieldKey,
                label: "Stop address",
                address,
                index: index + 1,
            };

            const erroredAddress = this.state.erroredAddressIndices.includes(index);
            if(erroredAddress)
                addressFieldConfig.error = `Cannot find address.`;

            const addressField =
                this.createAddressField(addressFieldConfig);

            return (
                <ListItem>{addressField}</ListItem>
            );
        });

        const stopLocationsList = (
            <Grid item>
                <Card>
                    <Typography variant="caption">Your stops</Typography>
                    <List>{stopLocationsListItems}</List>
                </Card>
            </Grid>
        );

        return stopLocationsList;
    }

    render() {
        return (
            <form onSubmit={(event) => this.submitAddresses.call(this, event)}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
            >
            {this.createComponentForStartAddress()}
            {this.createComponentForStopAddresses()}
            <Grid
                container
                item
                direction="row"
                xs={12}
                spacing={1}
                style={{ marginTop: "1em" }}
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <AddressField
                        id="next-address-field"
                        label={this.state.addresses.length === 0 ? "Starting address" : "Next stop address"}
                        mode={AddressFieldMode.Outline}
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
                        size="large"
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
