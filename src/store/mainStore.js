import api from "../api/index.js"

export const storePrototype = {
/*  strict: process.env.NODE_ENV !== 'production',*/
  state() {   /// данні можна отримати, але не варто змінювати на пряму
    return {
      markers : [],
      selectedMarkerData : Object
    }
  },
  mutations : { // функції для зміни даних мають бути СИНХРОННИМИ
    setMarkerList(state, markers){
      state.markers = markers;
    },
    setSelectedMarker(state, marker){
      state.selectedMarkerData = marker;
    }
  },
  getters : { // функцію для отримання даних зі state з можливістю здійснювати попередні обрахунки
  },
  actions : { // функції для зміни даних шляхом ініціалізації мутацій можуть бути АСИНХРОННИМИ
    async getMarkersByCoords(context, payload){
      await api.locations.searchByCoords(payload.bounds)
        .then((response) => {
          context.commit('setMarkerList', [...response.data]);
        }).catch(err=>{
          console.log(err);
        });
        }
    }
}