import userRoles from "../components/mixins/userRoles.js";
import api from "../api/index.js";

export default {
  state(){
    return{
      loggedUserInfo : null,
      loggedUserCredentials : null,
      userOrganization : {name : "..."}
    }
  },
  mutations : {
    setLoggedUserInfo(state, user){
      state.loggedUserInfo = user;
    },
    setLoggedUserCredentials(state, credentials){
      state.loggedUserCredentials = credentials;
    },
    setUserOrganization(state, organization){
      state.userOrganization = organization
    }
  },
  getters : {
    getToken(state){
      if(state.loggedUserCredentials === null )
        return null;
      return `${state.loggedUserCredentials['token_type']} ${state.loggedUserCredentials['access_token']}`;
    },
    isAuth(state){
      return state.loggedUserCredentials !== null && state.loggedUserInfo !== null
    },
    getUser(state){
      return state.loggedUserInfo;
    },
    getUserOrganization(state){
      return state.userOrganization;
    },
    getRole(state){
      if(!state.loggedUserInfo) {
        return userRoles.data().userRoles.user;
      }
      else
        return state.loggedUserInfo["role"];
    }
  },
  actions : {
    async GetUserOrganization(context) {
      await api.organizations.getOrganizationsById(context.state.loggedUserInfo.organization)
        .then(res => {
          console.log(res.data)
          context.commit("setUserOrganization",
            {
              name : res.data.name,
              id : res.data.id,
              site : "http://peopleinneed.net/",
              email : "here organization email",
              created_at : (new Date()).toLocaleString()
            })
        })
        .catch(err=>{
          console.log(err)
        })
    },
  }
}