<template>
  <div id="mapContainer" class="h-full">
    <input class="absolute z-10 top-32 right-24 w-3/5 p-4 border bg-white rounded-2xl" placeholder="Search">
	<GMapMap
      class="z-0"
      ref="map"
		:center="center"
 		:zoom="15"
		map-type-id="roadmap"
		style="width: 100%; height: 100%"
		:click="true"
		@click="ClickHandler"
    @bounds_changed="getBounds"
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
        v-if="showMarkers"
		  v-for="(m, index) in markers"
		  :key="index"
		  :position="m.position"
		  icon="./public/map-pin.svg"
		  :clickable="true"
		  :draggable="false"
      @click="getMarkerInfo(m)"
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
		  // {
			// position: {
			//   lat: 49.23424701332752, lng: 28.46228865225255
			// },
		  // },
		  // {
			// position: {
			//   lat: 49.23434701332752, lng: 28.46228865225255
			// },
		  // },
		  // {
			// position: {
			//   lat: 49.23574701332752, lng: 28.46228865225255
			// },
		  // },
		  // {
			// position: {
			//   lat: 49.23934701332752, lng: 28.46228865225255
			// },
		  // },
		  // {
			// position: {
			//   lat: 49.23419601332752, lng: 28.46228865225255
			// },
		  // },
		  // {
			// position: {
			//   lat: 49.24414701332752, lng: 28.46228865225255
			// },
		  // },
		],
      showMarkers: false,
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
    async getBounds ( arg ) {
      let bounds = {
        lat: { hi: arg.Bb.hi, lo: arg.Bb.lo },
        lng: { hi: arg.Va.hi, lo: arg.Va.lo }
      }
      await api.locations.searchByCoords(bounds).then((response) => {
        this.markers = []
        response.data.forEach((loc) => {
          this.markers.push(loc)
          this.showMarkers = true;
        })
      });
    },
    async getMarkerInfo(marker) {
      this.$emit('changeMarkerView', marker)
      this.$refs["map"].moveCamera()
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

      let addressData = this.currentPlaceData.results[0].address_components;
      let coordsData = this.currentPlaceData.results[0].geometry;

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
      //       // coordinates: coordsData.location.lat + "," + coordsData.location.lng,
      //       lat: coordsData.location.lat,
      //       lng: coordsData.location.lng
      //     }
      // )

      // await api.locations.searchByCoords(
      //     {
      //       lat: coordsData.location.lat,
      //       lng: coordsData.location.lng
      //     }
      // ).then((response) => {
      //   this.markers = []
      //   response.data.forEach((loc) => {
      //     this.markers.push(loc)
      //     this.showMarkers = true;
      //   })
      //   console.log(this.markers)
      // });
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
