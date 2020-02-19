import React from "react";
import { render } from "@testing-library/react";

import BaseGame from "../BaseGame";
import { beginner, advantage } from "../../../../utils/mockData";
import { setUpComponent } from "../../../../utils/helpers";

test("BaseGame should display error properly if fetch data unsuccessful", () => {
  const mockProps = {
    error: true
  };
  const { getByText } = render(<BaseGame {...mockProps} />);

  expect(getByText(/wrong/i).textContent).toBe("Somethings when wrong???");
});

test("BaseGame should display loading properly while fetching data", () => {
  const mockProps = {
    error: false,
    isLoading: true
  };
  const { getByText } = render(<BaseGame {...mockProps} />);

  expect(getByText(/.../i).textContent).toBe("Chờ tí nha...");
});

test("BaseGame should set up advantage board properly", () => {
  const mockProps = {
    error: false,
    isLoading: false,
    size: 16,
    mines: advantage
  };
  const { getByTestId } = render(setUpComponent(<BaseGame {...mockProps} />));

  expect(getByTestId("board").className).toBe("board advantage-board");
  console.log('getByTestId', getByTestId("board"))
});

test("BaseGame should set up beginner board properly", () => {
  const mockProps = {
    error: false,
    isLoading: false,
    size: 9,
    mines: beginner
  };
  const { getByTestId } = render(setUpComponent(<BaseGame {...mockProps} />));

  expect(getByTestId("board").className).toBe("board beginner-board");
});
