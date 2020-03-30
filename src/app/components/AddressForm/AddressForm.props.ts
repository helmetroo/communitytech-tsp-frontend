import { RouteComponentProps } from "react-router-dom";

import PropType from "../../types/PropType";

type ErrorCallback = (errorMessage: string) => void;
type AddressFormProps = {
    history: PropType<RouteComponentProps, "history">;
    onError: ErrorCallback;
};

export default AddressFormProps;
