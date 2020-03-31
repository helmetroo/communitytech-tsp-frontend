import { parse as parseQueryString } from "querystring";

import React, { PureComponent, SyntheticEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import AddressForm from "../../components/AddressForm";
import { Page } from "../../layout";

import HomePageQueryParams from "./Home.query";
import HomePageState from "./Home.state";

class HomePage extends PureComponent<RouteComponentProps, HomePageState> {
    protected readonly initialAddresses: string[] = [];

    constructor(props: RouteComponentProps) {
        super(props);
        this.initialAddresses = this.getInitialAddresses();
        this.state = {
            errorSnackbar: {
                open: false,
                message: null
            }
        }
    }

    protected getInitialAddresses() {
        const queryString = this.props.location.search.substr(1);
        const parsedQuery: HomePageQueryParams = parseQueryString(queryString);
        if(parsedQuery.addresses) {
            const addresses = parsedQuery.addresses;
            return addresses.split('|');
        }

        return [];
    }

    protected openSnackbar(message: string) {
        this.setState({
            errorSnackbar: {
                open: true,
                message
            }
        });
    }

    protected handleSnackbarClose(event?: SyntheticEvent, reason?: string) {
        if(reason === 'clickway')
            return;

        this.setState({
            errorSnackbar: {
                open: false,
                message: null
            }
        });
    }

    render() {
        return (
            <Page>
                <Snackbar
                    open={this.state.errorSnackbar.open}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose.bind(this)}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity="error"
                        onClose={this.handleSnackbarClose.bind(this)}
                    >
                        {this.state.errorSnackbar.message}
                    </MuiAlert>
                </Snackbar>
                <Box m="2rem">
                    <Typography variant="h1">
                        Input your stops below
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        We'll find you the quickest route
                    </Typography>
                </Box>
                <AddressForm
                    addresses={this.initialAddresses}
                    history={this.props.history}
                    onError={this.openSnackbar.bind(this)} />
            </Page>
        );
    }
};

export default HomePage;
