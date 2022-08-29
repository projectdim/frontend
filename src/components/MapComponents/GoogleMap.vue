<template>
  <div id="mapContainer" class="h-screen">
	<GMapMap
		:center="center"
 		:zoom="15"
		map-type-id="roadmap"
		style="width: 100%; height: 100%"
		:click="true"
		@click="ClickHandler"
	>
	  <GMapMarker
		  :v-if="this.ifClickMarker"
		  key="customMarker"
		  :draggable="false"
		  :position= "ClickMarkerCoords.position"
	  />

	</GMapMap>
  </div>
</template>

<script>
import axios from "axios";
import {API_KEY, URL_PLACE_ID_REQ} from "../../Scripts/MapScripts.js";
import MapMarker from "./MapMarker.vue";

export default {
  name: "GoogleMap",
  components: {
	MapMarker
  },
  data : function (){
	  return {
		center: {lat: 49.23414701332752, lng: 28.46228865225255},
		zoom : 15,
		markers : [],
		ifClickMarker : false,
		ClickMarkerCoords : {lat: Number, lng: Number}
	  }
  },
  methods : {
	ClickHandler(event) {
	  if (event.latLng?.lat) {
		//console.log(JSON.stringify(event));
		this.SetMarker(JSON.stringify(event.latLng));
		/*console.log(event.latLng?.toString());
		console.log(event.latLng?.lat())
		console.log(event.latLng?.lng())*/
	  }
	},
	GetPlaceDetails(placeId){
	  axios.get(URL_PLACE_ID_REQ,{
		params : {
		  placeId: placeId,
		  key : API_KEY
		}
	  })
  	},
	SetMarker(coords){
	  console.log(coords)
	  this.ifClickMarker = true;
	  this.ClickMarkerCoords = coords;
	  console.log(this.center)
	  //console.log(this.ClickMarkerCoords)
	}
}
}

</script>

<style scoped>

</style>


The following map types are available in the Maps JavaScript API:

"roadmap" displays the default road map view. This is the default map type.
"satellite" displays Google Earth satellite images.
"hybrid" displays a mixture of normal and satellite views.
"terrain" displays a physical map based on terrain information.