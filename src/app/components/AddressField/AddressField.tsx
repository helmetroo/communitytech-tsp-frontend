import React, { PureComponent, ChangeEvent } from "react";
import { get } from 'lodash';
import { TextField } from '@material-ui/core';

import AddressFieldProps from './AddressField.props';

class AddressField extends PureComponent<AddressFieldProps> {
    protected onChangeValue(event: ChangeEvent<HTMLInputElement>) {
        if(this.props.onChange)
            this.props.onChange(event);
    }

    render() {
        return (
            <TextField
                id="outlined-basic"
                variant="outlined"
                required
                value={this.props.value}
                onChange={this.onChangeValue.bind(this)}
                label={this.props.label}
            />
        );
    }
}

export default AddressField;
