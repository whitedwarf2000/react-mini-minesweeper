import WelcomeScreen from "./containers/Welcome";
import Game from "./containers/Game";

export const routes = [
  {
    path: "/welcome",
    component: WelcomeScreen
  },
  {
    path: "/game",
    component: Game,
  }
];
