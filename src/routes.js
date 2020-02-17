import WelcomeScreen from "./containers/Welcome";

import Advantage from "./containers/Game/Advantage";
import Beginner from "./containers/Game/Beginner";

export const routes = [
  {
    path: "/welcome",
    component: WelcomeScreen
  },
  {
    path: "/game/beginner",
    component: Beginner
  },
  {
    path: "/game/advantage",
    component: Advantage
  }
];
