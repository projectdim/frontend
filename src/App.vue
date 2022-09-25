<script setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import GoogleMap from "./components/MapComponents/GoogleMap.vue";
import PhotoViewerModal from "./components/PhotoViewerModal.vue";
import NotFound from "./components/NotFound.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";

</script>

<template>
  <div id="container" class="h-full">
	  <Header/>
    <WelcomeScreen v-if="showWelcome"
                   v-on:changeMarkerView="setMarker" v-on:show-not-found="showNotFound"/>
	  <div class="md:flex h-[calc(100vh-74px)]" v-if="!showWelcome">
	    <div class="basis-4/12 h-full">
	    	<SideBar v-bind:selected-marker="selectedMarker" v-if="selectedMarker"/>
        <NotFound v-if="notFound" v-bind:address="notFoundAddress.address"/>
	    </div>
      <div class="md:basis-8/12 h-full md:p-0 p-4">
        <GoogleMap v-on:changeMarkerView="setMarker" v-on:show-not-found="showNotFound"
                   v-bind:center="selectedMarker ? selectedMarker.position : notFoundAddress.position"/>
      </div>
	  </div>
  </div>

</template>

<script>
	export default {
	  methods : {
		  setMarker (marker) {
        this.notFound = false
        this.showWelcome = false
        this.selectedMarker = marker
      },
      showNotFound (address) {
        this.showWelcome = false
        this.notFound = true
        this.selectedMarker = null
        this.notFoundAddress = address
      }
		},
	  data : function() {
		  return {
			  msg : "qwerty",
        selectedMarker: null,
        notFound: false,
        notFoundAddress: "",
        showWelcome: true,
        currentCenter: {},
        currentZoom: 14
		  }
	  }
	}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
* {
  font-family: 'Inter', sans-serif;
}
</style>
