import React, { PureComponent, FormEvent, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

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

    protected submitAddresses(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
                                disabled={this.state.addresses.length === 0}
                            >Calculate itinerary</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default AddressForm;
