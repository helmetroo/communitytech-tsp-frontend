import _ from "lodash";
import { ThemeOptions } from "@material-ui/core";

export const COLORS = {
    lightGreen: "#DEF4EF",
    green: "#00CA9D",
    darkBlue: "#150E60",
    purple: "#5D5799",
    white: "#F8F8FF",
    pink: "#E74990",
    darkGray: "#333",
    lightGray: "#A7A6AE",
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
            main: COLORS.pink
        },

        secondary: {
            main: COLORS.green
        },
    },
    typography: {
        fontFamily: [
            "Open Sans",
            "Ariomo",
            "Arial",
            "sans-serif",
        ].join(","),

        h1: {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "1.5rem",
            lineHeight: "33px",
        },

        body1: {
            fontSize: "18px",
            fontWeight: "normal",
            lineHeight: "21px",
        },

        caption: {
            fontSize: "1rem"
        }
    },
};

export default theme;
