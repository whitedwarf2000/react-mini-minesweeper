import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import { store } from "../configureStore";
import App from "../App";

test("Should go to beginner game if user choose Beginner level", () => {
  const { container, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const beginnerBtn = getByText(/beginner/i);

  fireEvent.click(beginnerBtn);

  expect(container.innerHTML).toMatch('Minesweeper');
});

test("Should go to advantage game if user choose Advantage level", () => {
  const { container, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const advantageBtn = getByText(/advantage/i);

  fireEvent.click(advantageBtn);

  expect(container.innerHTML).toMatch('Minesweeper');
});
