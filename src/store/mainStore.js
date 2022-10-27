import VuexPersistence from "vuex-persist";
import api from "../api/index.js"
import {createStore} from "vuex";
import ReportLocationState from "./ReportedLocationStore.js";
import UserStore from "./UserStore.js";

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => getCookie(key),
  saveState: (key, state, storage) =>
    setCookie(key, state, 1),
  modules: ['user'],
  filter: (mutation) => mutation.type == 'setLoggedUserInfo' ||
    mutation.type == "setLoggedUserCredentials"
});


const storePrototype = {
/*  strict: process.env.NODE_ENV !== 'production',*/
  modules:{
    reports : ReportLocationState,
    user : UserStore
  },
  state() {   /// данні можна отримати, але не варто змінювати на пряму
    return {
      markers : [],
      unreviewedMarkers: [],
      selectedMarkerData : null,
      selectedMarkerHistoryData : [],
      notFoundedMarkerData : null,
      loggedUserInfo : null,
      loggedUserCredentials : null,
      mapCenter : null
    }
  },
  mutations : { // функції для зміни даних мають бути СИНХРОННИМИ
    setMarkerList(state, markers){
      state.markers = markers.filter((mark) => mark.status === 3);
      state.unreviewedMarkers = markers.filter((mark) => mark.status === 1 || mark.status === 2);
    },
    setSelectedMarker(state, marker){
      state.selectedMarkerData = marker;
      state.mapCenter = marker.position;
      state.selectedMarkerHistoryData = [];
      state.notFoundedMarkerData = null;
    },
    setSelectedMarkerHistory(state, markerHistory){
      state.selectedMarkerHistoryData = markerHistory;
    },
    // marker : {position: coords, address: name}
    setNoDataMarkerMarker(state, marker){
      state.selectedMarkerData = null;
      state.notFoundedMarkerData = marker;
      state.mapCenter = marker.position;
    },
   /* setLoggedUserInfo(state, user){
      state.loggedUserInfo = user;
    },
    setLoggedUserCredentials(state, credentials){
      state.loggedUserCredentials = credentials;
    },*/
    setMapCenter(state, position){
      state.mapCenter = position;
    }
  },
  getters : { // функцію для отримання даних зі state з можливістю здійснювати попередні обрахунки
    /*getToken(state){
      if(state.loggedUserCredentials === null )
        return null;
      return `${state.loggedUserCredentials['token_type']} ${state.loggedUserCredentials['access_token']}`;
    },
    isAuth(state){
      return state.loggedUserCredentials !== null && state.loggedUserInfo !== null
    },
    getUser(state){
      return state.loggedUserInfo;
    },*/
    getMapCenter(state){
      return state.mapCenter ? state.mapCenter : {lat: 49.23414701332752, lng: 28.46228865225255}
    },
    getSelectedLocationRequest(state){
      return state.reports.selectedLocationRequest
    }
  },
  actions : { // функції для зміни даних шляхом ініціалізації мутацій можуть бути АСИНХРОННИМИ
    async getMarkersByScreenBounds(context, payload){
      await api.locations.searchByCoords(payload)
        .then((response) => {
          context.commit('setMarkerList', [...response.data]);
        });
    },

    async getSelectedDataHistory(context){
      if(!context.state.selectedMarkerData)
        return;
      await api.locations.getLocationChangeLog(context.state.selectedMarkerData.id)
        .then((response) => {
          context.commit('setSelectedMarkerHistory', response.data);
      });
    },

    async GetMarkerByCoords(context, arg){
      try{
        let payload = {
          lat: arg.geometry.location.lat(),
          lng: arg.geometry.location.lng()
        }
        await api.locations.exactSearch(payload.lat, payload.lng).then((response) => {
          context.commit("setSelectedMarker", response.data);
        }).catch((err) => {
          if (err.response.status === 400) {
            let notFoundAddress = {
              position: payload,
              address: arg.name
            }
            context.commit("setNoDataMarkerMarker", notFoundAddress);
            throw err;
          }
        });
      }
      catch (err){
        throw err;
      }
    },
    async getMarkerById (context, locationId) {
      await api.locations.searchById(locationId).then((response) => {
        context.commit("setSelectedMarker", response.data)
      })
    }
  },
  plugins : [vuexCookie.plugin]
}

export const store = createStore(storePrototype);

function setCookie(cname, cvalue, exdays = 0) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return {};
}

