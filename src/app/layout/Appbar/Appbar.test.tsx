import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

import Appbar from "./Appbar";
import { MemoryRouter } from "react-router-dom";

describe("Appbar Layout", () => {
    function renderComponent() {
        return render(<Appbar />, {
            wrapper: MemoryRouter
        });
    }

    afterEach(cleanup);

    it("Render the default appbar ", () => {
        const appBar = renderComponent();

        const container = appBar.getByRole("navigation");
        const logoIcon = appBar.getByTitle("MutualAidLogo");

        expect(container).toHaveStyle("height: 89px");
        expect(container).toBeTruthy();

        // Accessibility
        expect(logoIcon).toBeTruthy();
    });
});
