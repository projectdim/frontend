<template>
	<div id="sideBar" class="overflow-y-auto h-full shadow-1cs p-4">

	  <h1 class="px-5 text-3xl font-semibold my-3">{{ selectedMarker.address }}, {{ selectedMarker.index }}, {{ selectedMarker.city }}</h1>
	  <div class="text-base flex flex-nowrap text-center">
		<div class="basis-1/2 py-2.5  cursor-pointer hover:bg-gray-200 box-border"
			 :class="this.selectedTabItem==`Overview`? `text-blue border-[#2E60B3] border-b-4` : `text-grey border-[#64748C] border-b-2`"
			 @click="setSelectedTab(`Overview`)"
		>
		  Overview
		</div>
		<div class=" basis-1/2 py-2.5 cursor-pointer hover:bg-gray-200 box-border"
			 :class="this.selectedTabItem==`History`? `text-blue border-[#2E60B3] border-b-4` : `text-grey border-[#64748C] border-b-2`"
			 @click="setSelectedTab(`History`)"
		>
		  Change history
		</div>
	  </div>
	  <div>
		  <Overview v-if="this.selectedTabItem === `Overview` && selectedMarker" v-bind:marker-reports="selectedMarker.reports"/>
		  <History v-if="this.selectedTabItem===`History`"/>
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