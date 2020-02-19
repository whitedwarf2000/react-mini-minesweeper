import React from "react";
import { render } from "@testing-library/react";

import Beginner from "../Beginner";
import { setUpComponent } from "../../../utils/helpers";

test("Beginner should be rendered properly", () => {
  const { container } = render(setUpComponent(<Beginner />));

  expect(container).toMatchInlineSnapshot(`
 <div>
   <h2>
     Time: 
     00:00:00
   </h2>
   <p>
     Chờ tí nha...
   </p>
 </div>
`);
});
