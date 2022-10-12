<template>
	<div id="mapContainer" class="h-full relative">
		<div class="absolute z-10 w-full
			screen-475:top-3.5
			top-6">
			<div class="border bg-white rounded-xl border-gray-light-300 border-2 h-10 flex flex-nowrap
				screen-475:mx-4 mx-[30px]"
				:class="{'border-base-blue': isInputFocused}"
			>
				<div class="w-[44px] cursor-pointer rounded-xl">
					<img src="/search.svg" class="h-full w-full object-scale-down">
				</div>
				<GMapAutocomplete
          id="autocomplete"
					ref="autocomplete"
					placeholder="Пошук..."
					@place_changed="setPlace"
					class="w-full bg-transparent outline-none block text-overview-item"
					:options="{
							  fields: [`geometry`, `name`]
						  }"
					@focusin="OnInputFocus(true)"
					@focusout="OnInputFocus(false)"
					:v-model="this.searchRequest"
		  		/>
				<div class="w-[40px] cursor-pointer rounded-xl" @click="this.ClearSearchRequest">
          <img src="/close.svg" class="h-full w-full object-scale-down">
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
			zoomControl: false,
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
				url: "/map-marker.svg",
				scaledSize: {width: 40, height: 40},
      }'
		  :clickable="false"
	  />
	  <GMapCluster
		  :styles="[
      	{
			   	textColor: 'black',
			   	url: `/m1.png`,
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
				v-for="(m, index) in this.$store.state.markers"
				:key="index"
				:position="m.position"
				icon="/map-pin.svg"
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
import {API_KEY, URL_PROXY_PLACE_REQUEST} from "../../Scripts/MapScripts.js";
import {mapMutations} from "vuex";

export default {
  name: "GoogleMap",
  /*props: {
    center: Object
  },*/
  data : function (){
	  return {
		  //center: {lat: 49.23414701332752, lng: 28.46228865225255},
		  currentMapZoom : 17,
		  ifClickMarker : false,
		  ClickMarkerCoords : {lat: Number, lng: Number},
		  currentPlaceData: [],
		  isInputFocused : false,
		  searchRequest : ""
	  }
  },
	computed : {
		center(){
			if(this.$store.state.selectedMarkerData)
				return this.$store.state.selectedMarkerData.position;
			else if(this.$store.state.notFoundedMarkerData)
				return this.$store.state.notFoundedMarkerData.position
			else
				return {lat: 49.23414701332752, lng: 28.46228865225255};
		},
		notFoundMarker(){
			return this.$store.state.notFoundedMarkerData;
		}
	},
	methods : {
		...mapMutations(["setNoDataMarkerMarker"]),
	  	ClickHandler(event) {
		  if(event.placeId) {
		  	  this.GetPlaceDetails(event.placeId);
    	  }
    	  else if (event.latLng) {
		  	  this.SetMarker(event.latLng);
		    }
		  },
			getBounds ( arg ) {
    	  let bounds = {
    	    lat: { hi: arg.getNorthEast().lat(), lo: arg.getSouthWest().lat() },
    	    lng: { hi: arg.getNorthEast().lng(), lo: arg.getSouthWest().lng() }
    	  }
				this.$store.dispatch("getMarkersByScreenBounds", {bounds});
    	},
    	getMarkerInfo(marker) {
				this.$store.commit("setSelectedMarker", marker);
        this.currentMapZoom = this.currentMapZoom >= 17 ? this.currentMapZoom : 17;
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
			if(coords !== this.ClickMarkerCoords)
				this.getPlaceInfo(coords)
			this.ifClickMarker = true;
		  this.ClickMarkerCoords = coords;
		},
    	async getPlaceInfo (coords) {
				await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat()},${coords.lng()}&key=${API_KEY}`)
    	      .then((res =>{
							let notFoundedMarker = {
								position :
									{
										lat: coords.lat(),
										lng: coords.lng()
									},
								address : res.data.results[0].formatted_address
							}
							this.setNoDataMarkerMarker(notFoundedMarker);
							this.currentPlaceData = res.data
						}))
    	      .catch((err) => console.log(err));

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
    	  //   })
    	  //   console.log(this.markers)
    	  // });
    	},
		OnMapZoomChanged(arg){
			console.log(arg);
			this.currentMapZoom = arg;
		},
		OnInputFocus(arg){
		  this.isInputFocused = arg;
		},
		setPlace(arg) {
			this.$store.dispatch("GetMarkerByCoords", arg);
		},
		ClearSearchRequest(){
		  let autocomplete = document.getElementById('autocomplete');
      autocomplete.value = ''
		}
  },
	watch : {
		notFoundMarker : function (newValue) {
			if(newValue)
				this.SetMarker(newValue.position)
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
