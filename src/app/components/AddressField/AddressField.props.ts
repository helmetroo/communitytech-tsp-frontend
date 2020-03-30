import { ChangeEvent } from "react";

type ChangeCallback = (event: ChangeEvent<HTMLInputElement>) => void;
type DeleteCallback = () => void;

type AddressFieldProps = {
    label: string;
    value?: string;
    onChange?: ChangeCallback;
    onDelete?: DeleteCallback;
}

export default AddressFieldProps;
