import userRoles from "../mixins/userRoles.js";

export default {
  state(){
    return{
      loggedUserInfo : null,
      loggedUserCredentials : null,
    }
  },
  mutations : {
    setLoggedUserInfo(state, user){
      state.loggedUserInfo = user;
    },
    setLoggedUserCredentials(state, credentials){
      state.loggedUserCredentials = credentials;
    },
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
    getRole(state){
      if(!state.loggedUserInfo) {
        return userRoles.data().userRoles.user;
      }
      else
        return state.loggedUserInfo["role"];
    }
  },
  actions : {},
}