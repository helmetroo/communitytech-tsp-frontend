import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';

import AddressForm from '../../components/AddressForm';
import { Page } from "../../layout";

class HomePage extends Component {
    render() {
        return (
            <Page>
                <Typography>
                    <h1>Input your stops below</h1>
                    <p>We'll find you the quickest route</p>
                </Typography>
                <AddressForm />
            </Page>
        );
    }
};

export default HomePage;
