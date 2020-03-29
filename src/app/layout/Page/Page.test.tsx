import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

import Page from "./Page";
import { PageContainer } from "./Page.style";
import PageProps from "./Page.props";
import { MemoryRouter } from "react-router-dom";

describe("Page Layout", () => {
  function renderComponent(props?: PageProps) {
      return render(<Page {...props} />, {
          wrapper: MemoryRouter
      });
  }

  afterEach(cleanup);

  it("Renders the page layout with a default appbar", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeTruthy();
    expect(page.getByRole("main")).toBeTruthy();
  });
});
