<template>
	<div id="mapContainer" class="h-full relative">
		<div class="absolute z-10 top-2 w-full">
			<div class="mx-[2.5%] w-[95%] border bg-white rounded-2xl border border-[3px] flex flex-nowrap max-h-10"
			:class="{'border-base-blue': isInputFocused}"
			>
				<GMapAutocomplete
					placeholder="Search..."
					@place_changed="setPlace"
					class="w-[90%] p-1.5 bg-transparent rounded-2xl outline-none block"
					:options="{
							  fields: [`geometry`, `name`]
						  }"
					@focusin="OnInputFocus(true)"
					@focusout="OnInputFocus(false)"
		  		/>
				<div class="w-[10%] cursor-pointer rounded-2xl bg-blue-200 hover:bg-blue-400">
					<img src="../../../public/search2.png" class="h-full w-full object-contain">
				</div>
	  		</div>
		</div>
	<GMapMap
    	class="z-0"
    	ref="map"
		:center="center"
 		:zoom="this.currentMapZoom"
		map-type-id="roadmap"
		style="width: 100%; height: 100%"
		:click="true"
		@click="ClickHandler"
    	@bounds_changed="getBounds"
		@zoom_changed="OnMapZoomChanged"
		:options="{
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: true,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			disableDefaultUI: true,
			styles:[
				{
					'featureType': 'administrative',
					'elementType': 'geometry',
					'stylers': [
						{ 'visibility': 'off' }
					]
				},
				{
					'featureType': 'poi',
					'stylers': [
						{ 'visibility': 'off' }
					]
				},
				{
					'featureType': 'road',
					'elementType': 'labels.icon',
					'stylers': [
						{ 'visibility': 'off' }
					]
				},
				{
					'featureType': 'transit',
					'stylers': [
						{ 'visibility': 'off' }
					]
				}
			]

   		}"
	>
	  <GMapMarker
		  :v-if="this.ifClickMarker"
		  key="customMarker"
		  :draggable="false"
		  :position= "this.ClickMarkerCoords"
		  :icon= '{
			url: "./public/map-marker.svg",
			scaledSize: {width: 40, height: 40},
      	  }'
		  :clickable="true"
		  @click="this.CustomMarkerClick"
	  />
	  <GMapCluster
		  :styles="[
         	{
			   textColor: 'black',
			   url: `./public/m1.png`,
			   height: 52,
			   width: 53,
			   textSize: 16,
			   textLineHeight: 52,
         	},
      	  ]"
		  :minimumClusterSize="2"
		  :zoomOnClick="true"
		  :maxZoom="11"
	  >
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
	  </GMapCluster>
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
		  currentMapZoom : 14,
		  ifClickMarker : false,
		  ClickMarkerCoords : {lat: Number, lng: Number},
		  markers: [],
		  showMarkers: false,
		  currentPlaceData: [],
		  isInputFocused : false
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
	  console.log(JSON.stringify(marker))
      this.$emit('changeMarkerView', marker)
	  this.center = marker.position;
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
	SetCustomMarkerKursantEdition(coords){
	  this.ifClickMarker = true;
	  this.ClickMarkerCoords = coords;
	  this.currentMapZoom = this.currentMapZoom >= 15 ? this.currentMapZoom : 15;
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
	  },
	OnMapZoomChanged(arg){
		console.log(arg);
		this.currentMapZoom = arg;
	},
	OnInputFocus(arg){
	  this.isInputFocused = arg;
	},
	setPlace(arg){
	  this.center = arg.geometry.location;
	  this.SetCustomMarkerKursantEdition(arg.geometry.location);
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
