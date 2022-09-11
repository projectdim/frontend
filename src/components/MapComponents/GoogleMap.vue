<template>
  <div id="mapContainer" class="h-full">
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
		  :position= "this.ClickMarkerCoords"
		  icon="./public/vite.svg"
		  :clickable="true"
		  @click="this.CustomMarkerClick"
	  />

	  <GMapMarker
		  v-for="(m, index) in markers"
		  :key="index"
		  :position="m.position"
		  icon="./public/vite.svg"
		  :clickable="true"
		  :draggable="true"
	  />

	</GMapMap>
  </div>
</template>

<script>
import axios from "axios";
import {API_KEY, URL_PROXY_PLACE_REQUEST, URL_PLACE_ID_REQ} from "../../Scripts/MapScripts.js";
import VueGoogleMaps from "@fawmi/vue-google-maps";

export default {
  name: "GoogleMap",
  data : function (){
	  return {
		center: {lat: 49.23414701332752, lng: 28.46228865225255},
		zoom : 15,
		ifClickMarker : false,
		ClickMarkerCoords : {lat: Number, lng: Number},
		markers: [
		  {
			position: {
			  lat: 49.23424701332752, lng: 28.46228865225255
			},
		  },
		  {
			position: {
			  lat: 49.23434701332752, lng: 28.46228865225255
			},
		  },
		  {
			position: {
			  lat: 49.23574701332752, lng: 28.46228865225255
			},
		  },
		  {
			position: {
			  lat: 49.23934701332752, lng: 28.46228865225255
			},
		  },
		  {
			position: {
			  lat: 49.23419601332752, lng: 28.46228865225255
			},
		  },
		  {
			position: {
			  lat: 49.24414701332752, lng: 28.46228865225255
			},
		  },
		]
	  }
  },
  methods : {
	ClickHandler(event) {
	  console.log(event)
	  console.log(event.placeId)
	  if(event.placeId){
		this.GetPlaceDetails(event.placeId);
	  }
	  else if (event.latLng) {
		this.SetMarker(event.latLng);
	  }
	},
	async GetPlaceDetails(placeId){
	  await axios.get(URL_PROXY_PLACE_REQUEST,{
		params : {
		  placeId: placeId,
		  key : API_KEY
		}
	  }).then(res=>{
		console.log(res);
	  }).catch(err=>{
		console.log(err);
	  })
  	},
	SetMarker(coords){
	  this.ifClickMarker = true;
	  this.ClickMarkerCoords = coords;
	  //console.log(this.ClickMarkerCoords)
	},
	CustomMarkerClick(){
	  this.ifClickMarker = true;
	  this.ClickMarkerCoords = null;
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