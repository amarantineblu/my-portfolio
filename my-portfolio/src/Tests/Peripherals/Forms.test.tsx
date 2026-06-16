import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Form from "../../components/Form";

// Tests for `Form` component
// Uses Arrange-Act-Assert (AAA) pattern in each test.
describe("Life Cycle and details of project forms", () => {
  // Arrange: common props used by the tests
  const fields = [{ name: "url", label: "URL", type: "text", required: true }];
  // `vi.fn()` creates a mock function we can inspect after submit
  const onSubmit = vi.fn();

  test("ensures the form is loaded on the page", () => {
    // Arrange: render the component
    render(<Form fields={fields} onSubmit={onSubmit} />);

    // Act: find the submit button (form element itself has no accessible name)
    const submit = screen.getByRole("button", { name: /submit/i });

    // Assert: submit button exists which implies the form rendered
    expect(submit).toBeInTheDocument();
  });

  test("ensures theres a url to be submitted to", () => {
    // Arrange: render the component and get the input
    render(<Form fields={fields} onSubmit={onSubmit} />);
    const input = screen.getByLabelText(/url/i);

    // Act: fill the input and submit the form
    fireEvent.change(input, { target: { value: "https://example.com" } });
    const submit = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submit);

    // Assert: `onSubmit` called once with the expected values
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ url: "https://example.com" });
  });
});
