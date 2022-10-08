import WelcomeScreen from "../components/WelcomeScreen.vue";
import MainScreen from "../components/MainScreen.vue";
import ErrorPage from "../components/ErrorPage.vue";
import Test from "../components/Test.vue";


export const mainRouter = [
  { path : "/", component : WelcomeScreen},
  { path : "/main", component : MainScreen},
  { path : "/test", component : Test},
  /*{ path : "*", component: ErrorPage}*/
]

