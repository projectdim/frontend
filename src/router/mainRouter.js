import WelcomeScreen from "../components/WelcomeScreen.vue";
import MainScreen from "../components/MainScreen.vue";
import ErrorPage from "../components/ErrorPage.vue";
import Test from "../components/Test.vue";
import SideBar from "../components/SidebarComponents/UserSidebar/SideBar.vue";
import SideBarAidWorker from "../components/SidebarComponents/AidWorkerSidebar/SideBarAidWorker.vue";


export const mainRouter = [
  { path : "/", component : WelcomeScreen},
  {
    path : "/main",
    component : MainScreen,
    children : [
      {
        path : "",
        component : SideBar
      },
      {
        path : "overview",
        component : SideBar
      },
      {
        path: "requests",
        component: SideBarAidWorker,
        /*meta : {requiresAuth : true}*/
      }
    ]
  },
  { path : "/test", component : Test},
  /*{ path : "*", component: ErrorPage}*/
]

