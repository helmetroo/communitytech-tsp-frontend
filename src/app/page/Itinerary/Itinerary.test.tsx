import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

describe("Home page", () => {
    function renderComponent(props) {
        return render(<Home {...props} />, {
            wrapper: MemoryRouter
        });
    }

    afterEach(cleanup);

    it("Renders the home layout with appbar", () => {
        const page = renderComponent();
        expect(page.getByRole("navigation")).toBeInTheDocument();
        expect(page.getByRole("main")).toBeInTheDocument();
    });
});
