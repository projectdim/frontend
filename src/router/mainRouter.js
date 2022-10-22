import WelcomeScreen from "../components/WelcomeScreen.vue";
import MainScreen from "../components/MainScreen.vue";
import ErrorPage from "../components/ErrorPage.vue";
import Test from "../components/Test.vue";
import SideBar from "../components/SidebarComponents/UserSidebar/SideBar.vue";
import SideBarAidWorker from "../components/SidebarComponents/AidWorkerSidebar/SideBarAidWorker.vue";
import ReportTools from "../components/SidebarComponents/AidWorkerSidebar/ReportTools.vue";
import RequestCompletedPreview from "../components/SidebarComponents/AidWorkerSidebar/RequestCompletedPreview.vue";

import {store} from "../store/mainStore.js";

import {createRouter, createWebHistory} from "vue-router";


const mainRouter = [
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
        path : "requests",
        component : SideBarAidWorker,
        meta : {requiresAuth : true}
      },
      {
        path: "submit-report",
        component : ReportTools,
        meta : {requiresAuth  : true}
      },
      {
        path: "submit-report-preview",
        component : RequestCompletedPreview,
        meta : {requiresAuth  : true}
      },
    ]
  },
  { path : "/test", component : Test},
  {
    path: '/:pathMatch(.*)*',
    redirect: to=>{
      return {
        path : "/main"
      }
    }
  },
]

export const Router = createRouter({
  routes : mainRouter,
  history : createWebHistory()
});

Router.beforeEach((to, form)=>{
  if(to.meta.requiresAuth && !store.getters.isAuth){
    return {
      path : "/"
    }
  }
})
