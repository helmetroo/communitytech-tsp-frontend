import { ChangeEvent } from "react";

type ChangeCallback = (event: ChangeEvent<HTMLInputElement>) => void;

type AddressFieldProps = {
    label: string;
    value?: string;
    onChange?: ChangeCallback;
}

export default AddressFieldProps;
