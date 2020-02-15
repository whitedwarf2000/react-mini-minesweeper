import WelcomeScreen from "./containers/Welcome";
import Game from "./containers/Game";

import Advantage from "./containers/Game/Advantage";
import Beginner from "./containers/Game/Beginner";

export const routes = [
  {
    path: "/welcome",
    component: WelcomeScreen
  },
  {
    path: "/game",
    component: Game,
    routes: [
      {
        path: "/game/beginner",
        component: Beginner
      },
      {
        path: "/game/advance",
        component: Advantage
      }
    ]
  }
];
