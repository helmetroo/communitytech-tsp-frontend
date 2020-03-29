import _ from "lodash";
import { ThemeOptions } from "@material-ui/core";

const COLORS = {
    green: '#00CA9D',
    darkBlue: '#150E60',
    purple: '#5D5799',
    white: '#F8F8FF',
    pink: '#E74990',
    darkGray: '#333',
    lightGray: '#A7A6AE',
};

// utils to extract style
export const extractStyle = (props: ThemeOptions, path: string) => {
    const extract = _.get(props, path, {});
    const transform = _.reduce(
        extract,
        (result, value, key) => {
            return `${result} ${_.kebabCase(key)}: ${value};`;
        },
        ""
    );
    return transform;
};

const theme: ThemeOptions = {
    spacing: 12,
    palette: {
        primary: {
            main: COLORS.darkGray
        },
    },
    typography: {
        h1: {
            fontFamily: "Open Sans, Ariomo, Arial, sans-serif",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "24px",
            lineHeight: "33px",
        },
        body1: {
            fontFamily: "Open Sans, Ariomo, Arial, sans-serif",
            fontSize: "18px",
            fontWeight: "normal",
            lineHeight: "21px",
        },
    },
};

export default theme;
