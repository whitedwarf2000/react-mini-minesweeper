import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";

import { setUpComponent } from "../../../utils/helpers";
import { advantage } from "../../../utils/mockData";

import BaseGame from "../../../containers/Game/components/BaseGame";

const mockStartNewGame = jest.fn();
const mockHandleGameStatus = jest.fn();
const mockHandleResetState = jest.fn();

const testProps = {
  error: false,
  isLoading: false,
  size: 16,
  mines: advantage,
  startNewGame: mockStartNewGame,
  handleGameStatus: mockHandleGameStatus,
  handleResetState: mockHandleResetState
};

afterEach(cleanup);

test("Board should be reset properly when click `Reset Game` button", () => {
  const { getByTestId, getByText, rerender } = render(setUpComponent(<BaseGame {...testProps} />));

  rerender(setUpComponent(<BaseGame {...testProps} />));

  // { x: 0, y: 13 }
  const minePosition = getByTestId("board").childNodes[13];

  fireEvent.click(minePosition);

  const resetGameBtn = getByText("Reset game");

  fireEvent.click(resetGameBtn);

  expect(mockStartNewGame).toHaveBeenCalled();
});

test("Should be navigated properly when click `Back to home` button", () => {
  const { getByTestId, getByText, rerender } = render(setUpComponent(<BaseGame {...testProps} />));

  rerender(setUpComponent(<BaseGame {...testProps} />));

  // { x: 0, y: 13 }
  const minePosition = getByTestId("board").childNodes[13];

  fireEvent.click(minePosition);

  const backToHomeBtn = getByText("Back to home");

  fireEvent.click(backToHomeBtn);

  expect(mockHandleResetState).toHaveBeenCalled();
});

test("Game should be won properly if user open all cell except mine", () => {
  const { getByTestId, rerender } = render(setUpComponent(<BaseGame {...testProps} />));

  rerender(setUpComponent(<BaseGame {...testProps} />));

  const numberPosition = getByTestId("board").childNodes[12];

  fireEvent.click(numberPosition);

  expect(mockHandleGameStatus).toHaveBeenCalled();
});
