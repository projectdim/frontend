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
import MainPlatformAdministration from "../components/PlatformAdministration/MainPlatformAdministration.vue";
import OrganizationsList from "../components/PlatformAdministration/OrganizationsList.vue";


const mainRouter = [
  { path : "/", component : WelcomeScreen},
  {
    path : "/main",
    component : MainScreen,
    children : [
      {
        path : "overview",
        alias : [""],
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
  {
    path : "/admin",
    component: MainPlatformAdministration,
    meta : {requiresAuth  : true},
    children: [
      {
        path: "",
        redirect: to=>{
          return {
            path : "/admin/organizations"
          }
        }
      },
      {
        path: "organizations",
        component: OrganizationsList
      }
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
  history : createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

Router.beforeEach((to, form)=>{
  if(to.meta.requiresAuth && !store.getters.isAuth){
    return {
      path : "/"
    }
  }
})
