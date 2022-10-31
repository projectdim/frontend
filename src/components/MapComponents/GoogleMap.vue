<template>
	<div id="mapContainer" class="h-full relative">
		<div class="absolute z-10 w-full
			screen-475:top-3.5
			top-6">
			<div class="border bg-white rounded-xl border-gray-c-300 border-2 h-10 flex flex-nowrap
				screen-475:mx-4 mx-[30px]"
				:class="{'border-blue-c-500': isInputFocused}"
			>
				<div class="w-[44px] cursor-pointer rounded-xl">
					<img src="/search.svg" class="h-full w-full object-scale-down">
				</div>
				<GMapAutocomplete
          id="autocomplete"
					ref="autocomplete"
					placeholder="Пошук..."
					@place_changed="setPlace"
					class="w-full bg-transparent outline-none block text-h3"
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
<!--		:click="true"
		@click="ClickHandler"-->
	<GMapMap
		class="z-0"
		ref="map"
		:center="getMapCenter"
 		:zoom="this.currentMapZoom"
		map-type-id="roadmap"
		style="width: 100%; height: 100%"
		@zoom_changed="OnMapZoomChanged"
    @center_changed="onCenterChanged"
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
			   	textSize: 16,
			   	textLineHeight: 40,
			   	textColor : 'white',
			   	url : '/clusters/m3.png',
					height: 44,
					width: 40,
					boxShadow : '2px 2px 10px 0px rgba(115, 118, 128, 0.11)'
        },
     	]"
		  :minimumClusterSize="2"
		  :zoomOnClick="true"
		  :maxZoom="13">
			<GMapMarker
				v-for="(m, index) in this.$store.state.markers"
				:key="index"
				:position="m.position"
				icon="/map-pin.svg"
				:clickable="true"
				:draggable="false"
				@click="getMarkerInfo(m)"
			/>
<!--      Синие маркера -->
      <GMapMarker
          v-for="(m, index) in this.$store.state.unreviewedMarkers"
          :key="index"
          :position="m.position"
          icon="/question-map-pin.svg"
          :clickable="false"
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
import {URL_PROXY_PLACE_REQUEST} from "../../Scripts/MapScripts.js";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "GoogleMap",
  data : function (){
	  return {
		  currentMapZoom : 17,
		  ifClickMarker : false,
		  ClickMarkerCoords : {lat: Number, lng: Number},
		  currentPlaceData: [],
		  isInputFocused : false,
		  searchRequest : "",
	  }
  },
	computed : {
		...mapGetters(["getMapCenter"]),
		notFoundMarker(){
			return this.$store.state.notFoundedMarkerData;
		}
	},
	methods : {
		...mapMutations(["setNoDataMarkerMarker", "setSelectedMarker"]),
		...mapActions(["getMarkersByScreenBounds","GetMarkerByCoords", "getMarkerById"]),
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
				//this.$store.dispatch("getMarkersByScreenBounds", {bounds});
				this.getMarkersByScreenBounds(bounds);
    	},
      onCenterChanged (coords) {
        let payload = {
          lat: coords.lat(),
          lng: coords.lng(),
          zoom: this.currentMapZoom
        }
        this.getMarkersByScreenBounds(payload);
      },
    	getMarkerInfo(marker) {
				if(this.$router.path !== "/main/overview")
					this.$router.push("/main/overview");
        this.getMarkerById(marker.location_id);

				setTimeout(()=>{
        	this.currentMapZoom = this.currentMapZoom >= 17 ? this.currentMapZoom : 17;
				}, 500)
    	},
		async GetPlaceDetails(placeId){
		    await axios.get(URL_PROXY_PLACE_REQUEST,{
		  	  params : {
		  	    placeId: placeId,
		  	    key : import.meta.env.VITE_GMAPS_APIKEY
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
			await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat()},${coords.lng()}&key=${import.meta.env.VITE_GMAPS_APIKEY}`)
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
    },
		OnMapZoomChanged(arg){
			this.currentMapZoom = arg;
		},
		OnInputFocus(arg){
		  this.isInputFocused = arg;
		},
		setPlace(arg) {
			this.GetMarkerByCoords(arg);
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
		},
		getMapCenter : function (newValue) {
			setTimeout(()=>{
				this.currentMapZoom = this.currentMapZoom >= 17 ? this.currentMapZoom : 17;
			}, 1000)
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
