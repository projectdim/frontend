<template>
	<div id="sideBarAidWorker" class="h-full shadow-cs1 overflow-y-auto">
	  <h1 class="px-6 font-semibold my-6 text-h1
			mobile:text-h1-m
			tablet:text-h1-m
			mobile:px-4
			tablet:px-4 ">
				Запити на розгляд (тут їх кількість)
		</h1>
	  <div class="flex flex-nowrap text-center text-h3
			mobile:text-h4
			tablet:text-h4">

			<TabItemButton class="w-full" @click="setSelectedTab(`All requests`)" target-tab-value="All requests" :current-tab-value="selectedTabItem">
				Всі запити
			</TabItemButton>

			<TabItemButton class="w-full" @click="setSelectedTab(`My requests`)" target-tab-value="My requests" :current-tab-value="selectedTabItem">
				Мої запити
			</TabItemButton>

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
import TabItemButton from "../../Other/TabItemButton.vue";

export default {
  name: "SideBarAidWorker",
	components: {
		TabItemButton,
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
