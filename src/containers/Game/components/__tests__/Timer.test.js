import React from "react";
import { render, act, cleanup } from "@testing-library/react";

import Timer from "../Timer";

jest.useFakeTimers();
afterEach(cleanup);

test("Timer should be run properly", () => {
  const mockProps = {
    isGameStart: true,
    isRefresh: false
  };
  const { getByText } = render(<Timer {...mockProps} />);

  expect(getByText(/time/i).textContent).toBe("Time: 00:00:00");

  act(() => {
    // expect callback to have been called by setInterval 11 times
    jest.runTimersToTime(11000);
  });

  expect(getByText(/time/i).textContent).toBe("Time: 00:00:11");
});

test("Timer should be refresh properly", () => {
  const mockProps = {
    isGameStart: false,
    isRefresh: true
  };
  const { getByText } = render(<Timer {...mockProps} />);

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(getByText(/time/i).textContent).toBe("Time: 00:00:00");
});