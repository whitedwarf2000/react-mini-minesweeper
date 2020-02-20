import React from "react";
import { render } from "@testing-library/react";

import { setUpComponent } from "../../../utils/helpers";
import WelcomeScreen from "../WelcomeScreen";

test("Welcome screen should have 2 button to select level", () => {
  const { getByText } = render(setUpComponent(<WelcomeScreen />));

  const beginnerBtn = getByText("Beginner");
  const advantageBtn = getByText("Advantage");

  expect(beginnerBtn.className).toBe("button beginner-level");
  expect(advantageBtn.className).toBe("button advantage-level");
});
