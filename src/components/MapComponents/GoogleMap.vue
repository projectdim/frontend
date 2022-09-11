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
		  icon="./public/map-pin.svg"
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
import api from "../../api/index.js";
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
		],
      currentPlaceData: []
	  }
  },
  methods : {
	  ClickHandler(event) {
      console.log(event)
	    if(event.placeId) {
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
	    }).then( res => {
	  	  console.log(res);
	    }).catch( err => {
	  	  console.log(err);
	    });
    },
	  SetMarker(coords){
	    this.ifClickMarker = true;
	    this.ClickMarkerCoords = coords;
      this.getPlaceInfo(coords)
	  },
    async getPlaceInfo (coords) {
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat() + ',' + coords.lng()}&key=${API_KEY}`)
          .then((res => this.currentPlaceData = res.data))
          .catch((err) => console.log(JSON.stringify(err)));

      // let addressData = this.currentPlaceData.results[0].address_components;
      // let coordsData = this.currentPlaceData.results[0].geometry;
      //
      // let formattedAddress = {};
      //
      // for (var i = 0; i < addressData.length; i++) {
      //   var c = addressData[i];
      //   formattedAddress[c.types[0]] = c;
      // }
      //
      // await api.locations.addLocation(
      //     {
      //       address: formattedAddress.route.long_name + "," + formattedAddress.street_number.long_name,
      //       index: formattedAddress.postal_code.long_name,
      //       country: formattedAddress.country.long_name,
      //       city: formattedAddress.locality.long_name,
      //       coordinates: coordsData.location.lat + "," + coordsData.location.lng
      //     }
      // )

      await api.locations.searchByCoords(
          {
            coordinates: coordsData.location.lat + "," + coordsData.location.lng
          }
      ).then((response) => {
        console.log(response)
      });
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
