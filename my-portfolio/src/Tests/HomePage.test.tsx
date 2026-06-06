import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import Home from "../Pages/Home";

test("renders text on home screen", () => {
  render(<Home />);
  const textElement = screen.getByText(/Laravel Livewire, Flutter\/Dart, React, React Native, SolidWorks,MS Office tools\./i);
  expect(textElement).toBeInTheDocument();
});
