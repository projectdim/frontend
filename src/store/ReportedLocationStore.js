import api from "../api/index.js";
import {createStore} from "vuex";


export default {
  state(){
    return{
      selectedLocationRequest : null
    }
  },
  mutations : {
    setSelectedRequestMutation (state, SelectedRequest) {
      state.selectedLocationRequest = SelectedRequest
    }
  },
  getters : {},
  actions : {
    setSelectedRequest (state, SelectedRequest){
      if(!SelectedRequest)
        return;
      state.commit("setSelectedRequestMutation" ,SelectedRequest);
      state.commit('setMapCenter', SelectedRequest.position)
    }}
}

//export const ReportLocationState = createStore(storePrototype);