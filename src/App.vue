<script setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import GoogleMap from "./components/MapComponents/GoogleMap.vue";
import PhotoViewerModal from "./components/PhotoViewerModal.vue";

</script>

<template>
  <div id="container" class="h-full">
	<Header/>
	<div class="flex h-[calc(100vh-64px)]">
	  <div class="basis-4/12 h-full">
	  	<SideBar v-if="selectedMarker" v-bind:selected-marker="selectedMarker"/>
	  </div>
	  <div class="basis-8/12">
	  	<GoogleMap v-on:changeMarkerView="setMarker"/>
	  </div>
	</div>
  </div>

</template>

<script>
	export default {
	  methods :{
		  setMarker (marker) {
        this.selectedMarker = marker
      }
		},
	  data : function() {
		  return {
			  msg : "qwerty",
        selectedMarker: null
		  }
	  }
	}
</script>

<style scoped>

</style>
