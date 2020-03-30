import React, { PureComponent, ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import AddressFieldProps from './AddressField.props';

class AddressField extends PureComponent<AddressFieldProps> {
    protected onChangeValue(event: ChangeEvent<HTMLInputElement>) {
        if(this.props.onChange)
            this.props.onChange(event);
    }

    protected onDelete() {
        if(this.props.onDelete)
            this.props.onDelete();
    }

    render() {
        let deleteButton = null;
        if(this.props.onDelete) {
            deleteButton = (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="delete address"
                        onClick={this.props.onDelete}
                        edge="end"
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </InputAdornment>
            );
        }

        return (
            <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{this.props.label}</InputLabel>
            <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={this.props.value}
            onChange={this.onChangeValue.bind(this)}
            labelWidth={104}
            endAdornment={(this.props.onDelete) ? deleteButton : null}
            />
            </FormControl>
        );
    }
}

export default AddressField;
