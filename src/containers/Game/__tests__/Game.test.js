import React from "react";

import { render, wait, fireEvent } from "@testing-library/react";
import Game from "../Game";
import { setUpComponent } from "../../../utils/helpers";
import { beginner } from "../../../utils/mockData";

const mockDefaultParams = {
  size: 9,
  mines: 10
};

test("Game should has two components Timer and Board", () => {
  const mockComponent = setUpComponent(
    <Game defaultParams={mockDefaultParams} />
  );
  const { container } = render(mockComponent);

  const firstElm = container.childNodes[0].innerHTML;
  const secondElm = container.childNodes[1].innerHTML;
  // Expect has loaded component Timer
  expect(firstElm).toBe("Time: 00:00:00");

  // Expect has loaded component BaseGame
  expect(secondElm).toBe("Chờ tí nha...");
});

const mockProps = {
  defaultParams: mockDefaultParams,
  mines: beginner,
  isLoading: false,
  error: false
};

test("Game should render Board with mines", async () => {
  const mockComponent = setUpComponent(<Game {...mockProps} />);
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          msg: "success",
          data: beginner
        })
    })
  );
  const { getByTestId } = render(mockComponent);

  await wait(() => getByTestId("board"));

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(getByTestId("board").className).toBe("board beginner-board");

  global.fetch.mockClear();
});

test("Game should be over when user click the boom", async () => {
  const mockComponent = setUpComponent(<Game {...mockProps} />);
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          msg: "success",
          data: beginner
        })
    })
  );

  jest.spyOn(window, "alert").mockImplementation(() => "You lost");

  const { getByTestId } = render(mockComponent);

  await wait(() => getByTestId("board"));

  // { x: 1, y: 5 }
  const minePosition = getByTestId("board").childNodes[14];

  fireEvent.click(minePosition);

  // Open all cells if game over
  expect(getByTestId("board").textContent).toBe(
    "1111111💣11💣11111111112💣22💣211124432💣111💣💣💣💣21💣1123321"
  );

  global.fetch.mockClear();
});

test("Cell should be showed properly", async () => {
  const mockComponent = setUpComponent(<Game {...mockProps} />);
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          msg: "success",
          data: beginner
        })
    })
  );
  const { getByTestId } = render(mockComponent);

  await wait(() => getByTestId("board"));

  const numberPosition = getByTestId("board").childNodes[13];

  fireEvent.click(numberPosition);

  expect(getByTestId("board").textContent).toBe("1");
  expect(numberPosition.className).toBe("cell cell_visible");
  expect(numberPosition.children[0].className).toBe("show");

  global.fetch.mockClear();
});
