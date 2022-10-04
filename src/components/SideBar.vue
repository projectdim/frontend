<template>
	<div id="sideBar" class="overflow-y-auto h-full shadow-1cs">
	  <h1 class="px-6 font-semibold my-6 text-sidebar-address
			screen-475:text-sidebar-address-mobile
			screen-949:text-sidebar-address-mobile
			screen-475:px-4
			screen-949:px-4">
				{{ selectedMarkerData.address }},
				{{ selectedMarkerData.index }},
				{{ selectedMarkerData.city }}
		</h1>
	  <div class="flex flex-nowrap text-center text-overview-item
			screen-475:text-overview-item-mobile
			screen-949:text-overview-item-mobile">
			<div class="basis-1/2 pb-2.5 cursor-pointer hover:bg-gray-200 box-border"
				 :class="this.selectedTabItem === `Overview`? `text-base-blue border-base-blue border-b-2` : `text-base-grey border-base-grey border-b`"
				 @click="setSelectedTab(`Overview`)"
			>
				Огляд
			</div>
			<div class="basis-1/2 pb-2.5 cursor-pointer hover:bg-gray-200 box-border"
				 :class="this.selectedTabItem === `History`? `text-base-blue border-base-blue border-b-2` : `text-base-grey border-base-grey border-b`"
				 @click="setSelectedTab(`History`)"
			>
				Історія змін
			</div>
	  </div>
	  <div class="pt-6">
		  <Overview v-if="this.selectedTabItem === `Overview` && selectedMarkerData" />
		  <History v-if="this.selectedTabItem===`History`"/>
	  </div>
	</div>
</template>

<script>
import Overview from "./Overview.vue";
import History from "./History.vue";
import { mapState } from "vuex";

export default {
  name: "SideBar",
  props: {
    selectedMarker: Object
  },
  components : {
		History,
		Overview,
	},
  methods : {
	  setSelectedTab(tabName){
	    this.selectedTabItem = tabName;
	  }
  },
  data : function () {
	  return {
	    selectedTabItem : "Overview"
	  }
  },
	computed : {
		...mapState(["selectedMarkerData"])
	}
}
</script>

<style scoped>

</style>
