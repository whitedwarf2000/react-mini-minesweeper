import WelcomeScreen from "./containers/Welcome";

import Advantage from "./containers/Game/Advantage";
import Beginner from "./containers/Game/Beginner";

export const routes = [
  {
    path: "/welcome",
    component: WelcomeScreen
  },
  {
    path: "/beginner",
    component: Beginner
  },
  {
    path: "/advantage",
    component: Advantage
  }
];
