import React from "react";

import { render, wait } from "@testing-library/react";
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
