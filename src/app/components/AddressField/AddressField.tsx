import React, { PureComponent, ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import AddressFieldProps, { AddressFieldMode } from './AddressField.props';

class AddressField extends PureComponent<AddressFieldProps> {
    protected onChangeValue(event: ChangeEvent<HTMLInputElement>) {
        if(this.props.onChange)
            this.props.onChange(event);
    }

    protected onDelete() {
        if(this.props.onDelete)
            this.props.onDelete();
    }

    protected createNormalInput(deleteButton: JSX.Element | null) {
        return (
            <Input
            id={this.props.id}
            type="text"
            value={this.props.value}
            onChange={this.onChangeValue.bind(this)}
            endAdornment={deleteButton}
            />
        );
    }

    protected createOutlinedInput(deleteButton: JSX.Element | null) {
        return (
            <>
            <InputLabel htmlFor={this.props.id}>
            {this.props.label}
            </InputLabel>
            <OutlinedInput
            id={this.props.id}
            type="text"
            value={this.props.value}
            onChange={this.onChangeValue.bind(this)}
            labelWidth={140}
            endAdornment={deleteButton}
            />
            </>
        );
    }

    render() {
        let deleteButton: JSX.Element | null = null;
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

        const inputToRender =
            (this.props.mode === AddressFieldMode.Normal)
            ? this.createNormalInput(deleteButton)
            : this.createOutlinedInput(deleteButton);

        return (
            <FormControl variant="outlined">
                {inputToRender}
            </FormControl>
        );
    }
}

export default AddressField;
