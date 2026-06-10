import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import {test, expect} from "vitest";
import About from "../Pages/About"

describe('Life Cycle of About Page', () => {
  test('about me present in about page', () => {
    //arrange
      render (<About/>);
    //act
    const textElement = screen.getByText(/About Me/i);
    //assert
    expect(textElement).toBeInTheDocument();
  });
})