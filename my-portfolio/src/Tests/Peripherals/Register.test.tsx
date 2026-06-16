import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, test, expect } from "vitest";

// Mock firebase and react-router modules (use factories so vi.mock hoisting works)
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock("firebase/auth", () => {
  const createUserWithEmailAndPassword = vi.fn(() =>
    Promise.resolve({ user: { uid: "abc" } }),
  );
  const getAuth = vi.fn(() => ({ mockedAuth: true }));
  return {
    getAuth,
    createUserWithEmailAndPassword,
  };
});

vi.mock("react-router-dom", () => {
  const __mockNavigate = vi.fn();
  return {
    __mockNavigate,
    useNavigate: () => __mockNavigate,
  };
});

import Register from "../../Pages/Register";

// grab the mocked modules so we assert against the same spy instances
const firebaseAuth = require("firebase/auth");
const rr = require("react-router-dom");

describe("Life Cycle of Register Page", () => {
  test("register form present in register page", () => {
    // Arrange
    render(<Register />);

    // Act
    const header = screen.getByText(/Register/i);

    // Assert
    expect(header).toBeInTheDocument();
  });

  test("register form authenticates user", async () => {
    // Arrange: render component
    render(<Register />);

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const submit = screen.getByRole("button", { name: /register/i });

    // Act: fill fields and submit
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "secret" } });
    fireEvent.click(submit);

    // Assert: in-page Alert component shows success message
    const alertNode = await screen.findByText(/User registered successfully!/i);
    expect(alertNode).toBeInTheDocument();
  });
});
