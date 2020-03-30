import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import theme from "./theme";

import HomePage from "./app/page/Home";

class App extends Component {
    render() {
        const muiTheme = createMuiTheme(theme);

        return (
            <>
                <CssBaseline />
                <MuiThemeProvider theme={muiTheme}>
                    <Router>
                        <div className="App">
                            <Switch>
                                <Route exact path="/">
                                    <HomePage />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </>
        );
    }
}

export default App;
