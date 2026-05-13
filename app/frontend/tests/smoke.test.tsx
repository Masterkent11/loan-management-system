import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthLayout } from "../src/components/layout/AuthLayout";

describe("AuthLayout", () => {
  it("renders the supplied title", () => {
    render(
      <MemoryRouter>
        <AuthLayout title="Loan Management" subtitle="Test subtitle">
          <span>Form content</span>
        </AuthLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Loan Management" })).toBeInTheDocument();
  });
});
