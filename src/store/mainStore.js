import api from "../api/index.js"

export const storePrototype = {
/*  strict: process.env.NODE_ENV !== 'production',*/
  state() {   /// данні можна отримати, але не варто змінювати на пряму
    return {
      markers : [],
      selectedMarkerData : null,
      selectedMarkerHistoryData : null,
      notFoundedMarkerData : null
    }
  },
  mutations : { // функції для зміни даних мають бути СИНХРОННИМИ
    setMarkerList(state, markers){
      state.markers = markers;
    },
    setSelectedMarker(state, marker){
      state.selectedMarkerData = marker;
      state.selectedMarkerHistoryData = null;
      state.notFoundedMarkerData = null;
    },
    setSelectedMarkerHistory(state, markerHistory){
      state.selectedMarkerHistoryData = markerHistory;
    },
    setNoDataMarkerMarker(state, marker){
      state.selectedMarkerData = null;
      state.notFoundedMarkerData = marker;
    }
  },
  getters : { // функцію для отримання даних зі state з можливістю здійснювати попередні обрахунки
  },
  actions : { // функції для зміни даних шляхом ініціалізації мутацій можуть бути АСИНХРОННИМИ
    async getMarkersByScreenBounds(context, payload){
      await api.locations.searchByCoords(payload.bounds)
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
    }
  }
}