import { isEmpty } from "lodash";
import React, { PureComponent, ChangeEvent } from "react";
import parse from "autosuggest-highlight/parse";
import Autocomplete, { RenderInputParams } from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import AddressFieldProps, { AddressFieldMode } from "./AddressField.props";
import AddressFieldState from "./AddressField.state";
import GoogleMaps from "../../classes/GoogleMaps";

class AddressField extends PureComponent<AddressFieldProps, AddressFieldState> {
    constructor(props: AddressFieldProps) {
        super(props);

        this.initGoogleMaps();
        this.state = {
            options: []
        };
    }

    protected initGoogleMaps() {
    }

    protected onChangeValue(event: ChangeEvent<HTMLInputElement>) {
        if(this.props.onChange)
            this.props.onChange(event);
    }

    protected onDelete() {
        if(this.props.onDelete)
            this.props.onDelete();
    }

    protected createNormalInputRenderer(deleteButton: JSX.Element | null) {
        return (params: RenderInputParams) => (
            <TextField
                {...params}
                id={this.props.id}
                type="text"
                value={this.props.value}
                onChange={this.onChangeValue.bind(this)}
                error={!isEmpty(this.props.error)}
                helperText={this.props.error}
                InputProps={{
                    endAdornment: deleteButton
                }}
            />
        );
    }

    protected createOutlinedInputRenderer(deleteButton: JSX.Element | null) {
        return (params: RenderInputParams) => (
            <>
                <InputLabel htmlFor={this.props.id}>
                    {this.props.label}
                </InputLabel>
                <OutlinedInput
                    {...params}
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

    componentDidMount() {
        this.effect();
    }

    componentDidUpdate() {
        this.effect();
    }

    componentWillUnmount() {
        this.effect();
    }

    protected effect() {
        let active = true;

        if(!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new google.maps.places.AutocompleteService();
        }

        if(!autocompleteService.current) {
            return undefined;
        }

        if(inputValue === '') {
            setOptions([]);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: PlaceType[]) => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
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

        const inputRenderer =
            (this.props.mode === AddressFieldMode.Normal)
            ? this.createNormalInputRenderer(deleteButton)
            : this.createOutlinedInputRenderer(deleteButton);

        return (
            <FormControl variant="outlined">
                <Autocomplete
                    style={{ width: 300 }}
                    getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
                    filterOptions={(x) => x}
                    options={options}
                    autoComplete
                    includeInputInList
                    renderInput={(params) => inputRenderer(params)}
                    renderOption={(option) => {
                        const matches = option.structured_formatting.main_text_matched_substrings;
                        const parts = parse(
                            option.structured_formatting.main_text,
                            matches.map((match: any) => [match.offset, match.offset + match.length]),
                        );

                        return (
                            <Grid container alignItems="center">
                                <Grid item>
                                    <LocationOnIcon />
                                </Grid>
                                <Grid item xs>
                                    {parts.map((part, index) => (
                                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                            {part.text}
                                        </span>
                                    ))}
                                    <Typography variant="body2" color="textSecondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    }}
                />
            </FormControl>
        );
    }
}

export default AddressField;
