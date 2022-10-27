<template>
	<Header/>
	<div class="flex h-[calc(100vh-62px)]
	  	screen-950:h-[calc(100vh-74px)]
	  	screen-475:flex-col-reverse
	  	screen-949:flex-col-reverse
	  	screen-475:overflow-y-auto
			screen-949:overflow-y-auto">
		<div class="shrink-0 screen-950:w-[600px]">
			<router-view></router-view>
		</div>
		<div class="w-full p-0 min-h-[456px]">
			<GoogleMap/>
		</div>
	</div>
</template>

<script>
import SideBar from "./SidebarComponents/UserSidebar/SideBar.vue";
import NotFound from "./SidebarComponents/UserSidebar/NotFound.vue";
import GoogleMap from "./MapComponents/GoogleMap.vue";
import Header from "./Header.vue";
import {mapState} from "vuex";

export default {
	name: "MainScreen",
	components : {
		Header,
		SideBar,
		NotFound,
		GoogleMap
	},
  computed : {
		...mapState(["selectedMarkerData", "notFoundedMarkerData"])
	}
}
</script>

<style scoped>

</style>
