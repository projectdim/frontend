<template>
	<div id="sideBarAidWorker" class="h-full shadow-cs1 overflow-y-auto">
	  <h1 class="px-6 font-semibold my-6 text-sidebar-address
			screen-475:text-sidebar-address-mobile
			screen-949:text-sidebar-address-mobile
			screen-475:px-4
			screen-949:px-4 ">
				Запити на розгляд (тут їх кількість)
		</h1>
	  <div class="flex flex-nowrap text-center text-overview-item
			screen-475:text-overview-item-mobile
			screen-949:text-overview-item-mobile">
			<div class="basis-1/2 pb-2.5 cursor-pointer hover:bg-gray-200 box-border"
				 :class="this.selectedTabItem === `All requests`? `text-blue-c-500 border-blue-c-500 border-b-2` : `text-gray-c-500 border-gray-c-500 border-b`"
				 @click="setSelectedTab(`All requests`)">
				Всі запити
			</div>
			<div class="basis-1/2 pb-2.5 cursor-pointer hover:bg-gray-200 box-border"
				 :class="this.selectedTabItem === `My requests`? `text-blue-c-500 border-blue-c-500 border-b-2` : `text-gray-c-500 border-gray-c-500 border-b`"
				 @click="setSelectedTab(`My requests`)">
				Мої запити
			</div>
	  </div>
	  <div class="py-6">
			<keep-alive>
				<ReportsRequestsList v-if="selectedTabItem===`All requests`"/>
			</keep-alive>
				<MyReportRequestList v-if="selectedTabItem===`My requests`"/>
	  </div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ReportsRequestsList from "./ReportsRequestsList.vue";
import MyReportRequestList from "./MyReportRequestList.vue";

export default {
  name: "SideBarAidWorker",
	components: {
    MyReportRequestList, ReportsRequestsList
  },
	props: {
    selectedMarker: Object
  },
	data : function () {
		return {
			selectedTabItem : "All requests",
		}
	},
  methods : {
	  setSelectedTab(tabName){
	    this.selectedTabItem = tabName;
	  }
  },
	computed : {
		...mapState(["selectedMarkerData"])
	}
}
</script>

<style scoped>

</style>
