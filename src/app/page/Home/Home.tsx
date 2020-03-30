import React, { PureComponent, SyntheticEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

import AddressForm from "../../components/AddressForm";
import { Page } from "../../layout";

import HomePageState from "./Home.state";

class HomePage extends PureComponent<RouteComponentProps, HomePageState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            errorSnackbar: {
                open: false,
                message: null
            }
        }
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
                <Typography>
                    <h1>Input your stops below</h1>
                    <p>We'll find you the quickest route</p>
                </Typography>
                <AddressForm history={this.props.history} onError={this.openSnackbar.bind(this)} />
            </Page>
        );
    }
};

export default HomePage;
