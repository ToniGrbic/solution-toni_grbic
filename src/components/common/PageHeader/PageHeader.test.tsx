import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the required title and subtitle", () => {
    render(
      <PageHeader
        title="Katalog proizvoda"
        subtitle="Pregledajte i filtrirajte proizvode"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Katalog proizvoda" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pregledajte i filtrirajte proizvode"),
    ).toBeInTheDocument();
  });
});
