import WelcomeScreen from "../components/WelcomeScreen.vue";
import MainScreen from "../components/MainScreen.vue";
import ErrorPage from "../components/ErrorPage.vue";
import LogIn from "../components/LogIn.vue";


export const mainRouter = [
  { path : "/", component : WelcomeScreen},
  { path : "/main", component : MainScreen},
  {path : "/login", component : LogIn}
  /*{ path : "*", component: ErrorPage}*/
]

