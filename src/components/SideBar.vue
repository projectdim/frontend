<template>
	<div id="sideBar" class="overflow-y-auto h-full shadow-1cs">
	  <h1 class="px-6 font-semibold my-6 text-sidebar-address
			screen-475:text-sidebar-address-mobile
			screen-949:text-sidebar-address-mobile
			screen-475:px-4
			screen-949:px-4">
				{{this.$store.state.selectedMarkerData.address }},
				{{ this.$store.state.selectedMarkerData.index }},
				{{ this.$store.state.selectedMarkerData.city }}
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
		  <Overview v-if="this.selectedTabItem === `Overview` && selectedMarker" v-bind:marker-reports="selectedMarker.reports"/>
		  <History v-if="this.selectedTabItem===`History`" v-bind:location-id="selectedMarker.id"/>
	  </div>
	</div>
</template>

<script>
import { SelectedDataItem } from "../Scripts/DataProvider.js";
import Overview from "./Overview.vue";
import History from "./History.vue";

export default {
  name: "SideBar",
  props: {
    selectedMarker: Object
  },
  components: { History, Overview },
  methods : {
	  setSelectedTab(tabName){
	    this.selectedTabItem = tabName;
	  }
  },
  watch: {
    selectedMarker: function (newMark) {
      this.selectedItem = newMark
    }
  },
  data : function () {
	  return {
	    selectedItem: null,
	    selectedTabItem : "Overview"
	  }
  }
}
</script>

<style scoped>

</style>
