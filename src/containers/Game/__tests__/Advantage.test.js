import React from "react";
import { render } from "@testing-library/react";

import Advantage from "../Advantage";
import { setUpComponent } from "../../../utils/helpers";

test("Advantage should be rendered properly", () => {
  const { container } = render(setUpComponent(<Advantage />));

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
