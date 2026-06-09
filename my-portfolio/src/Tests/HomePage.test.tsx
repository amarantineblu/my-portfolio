import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import Home from "../Pages/Home";

test('adds and removes body class', () => {
  const { unmount } = render(<Home />)
  expect(document.body.classList.contains('home')).toBe(true)
  unmount()
  expect(document.body.classList.contains('home')).toBe(false)
});

test("renders text on home screen", () => {
  render(<Home />);
  const textElement = screen.getByText(/Laravel Livewire, Flutter\/Dart, React, React Native, SolidWorks,MS Office tools\./i);
  expect(textElement).toBeInTheDocument();
});
