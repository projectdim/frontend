import api from "../api/index.js"
import {createStore} from "vuex";
import ReportLocationState from "./ReportedLocationStore.js";

const storePrototype = {
/*  strict: process.env.NODE_ENV !== 'production',*/
  modules:{
    reports : ReportLocationState
  },
  state() {   /// данні можна отримати, але не варто змінювати на пряму
    return {
      markers : [],
      unreviewedMarkers: [],
      selectedMarkerData : null,
      selectedMarkerHistoryData : null,
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
      state.selectedMarkerHistoryData = null;
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
    setLoggedUserInfo(state, user){
      state.loggedUserInfo = user;
    },
    setLoggedUserCredentials(state, credentials){
      state.loggedUserCredentials = credentials;
    },
    setMapCenter(state, position){
      state.mapCenter = position;
    }
  },
  getters : { // функцію для отримання даних зі state з можливістю здійснювати попередні обрахунки
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
    getMapCenter(state){
      return state.mapCenter ? state.mapCenter : {lat: 49.23414701332752, lng: 28.46228865225255}
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
      console.log(context.state.selectedMarkerData);
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
  }
}

export const store = createStore(storePrototype);
