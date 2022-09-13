<script setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import GoogleMap from "./components/MapComponents/GoogleMap.vue";
import PhotoViewerModal from "./components/PhotoViewerModal.vue";

</script>

<template>
  <div id="container" class="h-full">
	  <Header/>
	  <div class="md:flex h-[calc(100vh-64px)]">
	    <div class="basis-4/12 h-full">
	    	<SideBar v-bind:selected-marker="selectedMarker" v-if="selectedMarker"/>
        <p v-else class="text-center p-24 font-bold text-2xl">No marker selected.</p>
	    </div>
      <div class="md:basis-8/12 h-full md:p-0 p-4">
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
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
* {
  font-family: 'Inter', sans-serif;
}
</style>
