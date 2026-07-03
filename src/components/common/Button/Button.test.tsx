import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { describe, it, expect } from "vitest";

describe("Button", () => {
    it("should render correctly", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });
});