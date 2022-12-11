<template>
	<div id="mapContainer" class="h-full relative">
		<div class="absolute z-10 w-full
			mobile:top-3.5
			top-6">
			<div class="border bg-white rounded-xl  border-2 h-10 flex flex-nowrap
				mobile:mx-4 mx-[30px]"
				:class="{'border-blue-c-500': isInputFocused,
									'border-gray-c-300': !isInputFocused}">
				<div class="w-[44px] cursor-pointer rounded-xl">
					<img src="/search.svg" class="h-full w-full object-scale-down">
				</div>
<!--				:options="{
				fields: [`geometry`, `name`]
				}"-->
				<GMapAutocomplete
          id="autocomplete"
					ref="autocomplete"
					placeholder="Пошук..."
					@place_changed="setPlace"
					class="w-full bg-transparent outline-none block text-h3"
					:select-first-on-enter = "true"
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
		:click="true"
		@click="ClickHandler"
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
					v-if="getRole !== userRoles.user"
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
import {mapActions, mapGetters, mapMutations} from "vuex";
import userRoles from "../mixins/userRoles.js";
import helper from "../mixins/helper.js";

export default {
  name: "GoogleMap",
	mixins : [userRoles, helper],
  data : function (){
	  return {
		  currentMapZoom : 17,
		  ifClickMarker : false,
		  ClickMarkerCoords : {lat: Number, lng: Number},
		  isInputFocused : false,
		  searchRequest : "",
	  }
  },
	computed : {
		...mapGetters({
			getMapCenter : "getMapCenter",
			getRole : "getRole",
			reviewedMarkers : "getReviewedMarkers",
			requestedMarkers : "getRequestMarkers"
		}),
		notFoundMarker(){
			//this.SetMarker(this.$store.state.notFoundedMarkerData.position)
			return this.$store.state.notFoundedMarkerData;
		}
	},
	methods : {
		...mapMutations(["setNoDataMarkerMarker", "setSelectedMarker", "setMapCenter"]),
		...mapActions(["getMarkersByScreenBounds","GetMarkerByCoords", "getMarkerById"]),
	  	ClickHandler(event) {
				this.getGooglePlaceInfo(event.latLng)
		  },
			getBounds ( arg ) {
    	  let bounds = {
    	    lat: { hi: arg.getNorthEast().lat(), lo: arg.getSouthWest().lat() },
    	    lng: { hi: arg.getNorthEast().lng(), lo: arg.getSouthWest().lng() }
    	  }
				this.getMarkersByScreenBounds(bounds);
    	},
      onCenterChanged (coords) {
        let payload = {
					...this.coordsFormatter(coords),
          zoom: this.currentMapZoom
        }
        this.getMarkersByScreenBounds(payload);
      },
    	getMarkerInfo(marker) {
				this.ifClickMarker = false;
				if(!this.isPathMatched("/main/overview"))
					this.$router.push("/main/overview");
        this.getMarkerById(marker.location_id);

				setTimeout(()=>{
        	this.currentMapZoom = this.currentMapZoom >= 17 ? this.currentMapZoom : 17;
				}, 500)
    	},
    async getGooglePlaceInfo (coords) {
			coords = this.coordsFormatter(coords)
			//TODO Перевірити чи є ця АДРЕСА в БД
			await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${import.meta.env.VITE_GMAPS_APIKEY}`)
          .then((res =>{
						let ExistedMarker = this.CheckIsReportedMarkerExist(res.data.results)
						let correctMarkerData = res.data.results[0]
						if(ExistedMarker){
							this.getMarkerInfo(ExistedMarker);
							this.ifClickMarker = false;
							this.ClickMarkerCoords = null;
						}
						else {
							let m = ExistedMarker ? ExistedMarker : correctMarkerData;
							let notFoundedMarker = {
								position: this.coordsFormatter(m.geometry.location),
								address: res.data.results[0].formatted_address
							}
							this.setNoDataMarkerMarker(notFoundedMarker);
						}
					}))
          .catch((err) => console.log(err));
    },
		CheckIsReportedMarkerExist(googlePlacesArray){
			let marker = undefined;
			for(let i = 0 ; i < googlePlacesArray.length; i++){
				let m = this.reviewedMarkers.find(x=>{
					let xx = this.coordsFormatter(x.position);
					let yy = this.coordsFormatter(googlePlacesArray[i].geometry.location)
					return  xx.lat == yy.lat && xx .lng== yy.lng
				})
				if(m){
					marker = m;
					break;
				}
			}
			return marker ?? false;
		},
		OnMapZoomChanged(arg){
			this.currentMapZoom = arg;
		},
		OnInputFocus(arg){
		  this.isInputFocused = arg;
		},
		setPlace(arg) {
			/*console.log("Place")
			console.log(arg)*/
			this.GetMarkerByCoords(arg);
			this.$router.push("/main/overview")
		},
		ClearSearchRequest(){
		  let autocomplete = document.getElementById('autocomplete');
      autocomplete.value = ''
		},
		coordsFormatter(coords){
			let res = {};

			if(typeof coords.lat == 'function')
				res.lat = coords.lat();
			else if(typeof coords.lat == 'number')
				res.lat = coords.lat;

			if(typeof coords.lng == 'function')
				res.lng = coords.lng();
			else if(typeof coords.lng == 'number')
				res.lng = coords.lng;

			return res;
		}
  },
	watch : {
		notFoundMarker : function (newValue) {
			if(newValue) {
				this.ifClickMarker = true;
				this.ClickMarkerCoords = newValue.position;
			}
		},
		getMapCenter : function (newValue) {
			setTimeout(()=>{
				this.currentMapZoom = this.currentMapZoom >= 17 ? this.currentMapZoom : 17;
			}, 500)
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
