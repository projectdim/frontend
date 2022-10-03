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
	  <div class="flex h-[calc(100vh-62px)]
	  	screen-950:h-[calc(100vh-74px)]
	  	screen-475:flex-col-reverse
	  	screen-949:flex-col-reverse
	  	screen-475:overflow-y-auto
			screen-949:overflow-y-auto" v-if="!showWelcome">
				<div class="shrink-0 screen-950:w-[600px]">
					<SideBar v-if="this.$store.state.selectedMarkerData"
									 v-bind:selected-marker="this.$store.state.selectedMarkerData"/>
					<NotFound v-else v-bind:address="this.$store.state.notFoundedMarkerData.address"/>
				</div>
				<div class="w-full p-0 min-h-[456px]">
					<GoogleMap v-on:changeMarkerView="setMarker" v-on:show-not-found="showNotFound"/>
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
	  },
	}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
* {
  font-family: 'Inter', sans-serif;
}
</style>
