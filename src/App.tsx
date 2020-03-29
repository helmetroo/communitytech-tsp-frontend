import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { ThemeProvider } from "styled-components";

import "./App.css";
import theme from "./theme";

import HomePage from "./app/page/Home";

class App extends Component {
    render() {
        const customTheme = createMuiTheme(theme);
        return (
            <>
                <CssBaseline />
                <MuiThemeProvider theme={customTheme}>
                    <ThemeProvider theme={customTheme}>
                        <Router>
                            <div className="App">
                                <Switch>
                                    <Route exact path="/">
                                        <HomePage />
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                    </ThemeProvider>
                </MuiThemeProvider>
            </>
        );
    }
}

export default App;
