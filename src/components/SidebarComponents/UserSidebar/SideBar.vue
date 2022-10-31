<template>
	<div v-if="selectedMarkerData !== null" id="sideBar" class="overflow-y-auto h-full shadow-cs1">
	  <h1 class="px-6 font-semibold my-6 text-h1
			screen-475:text-h1-m
			screen-949:text-h1-m
			screen-475:px-4
			screen-949:px-4">
				{{ selectedMarkerData.address }},
				{{ selectedMarkerData.index }},
				{{ selectedMarkerData.city }}
		</h1>
	  <div class="flex flex-nowrap text-center text-h3
			screen-475:text-h4
			screen-949:text-h4">
			<div class="basis-1/2 pb-2.5 cursor-pointer hover:bg-gray-200 box-border"
				 :class="this.selectedTabItem === `Overview`? `text-blue-c-500 border-blue-c-500 border-b-2` : `text-gray-c-500 border-gray-c-500 border-b`"
				 @click="setSelectedTab(`Overview`)"
			>
				Огляд
			</div>
			<div class="basis-1/2 pb-2.5 cursor-pointer hover:bg-gray-200 box-border"
				 :class="this.selectedTabItem === `History`? `text-blue-c-500 border-blue-c-500 border-b-2` : `text-gray-c-500 border-gray-c-500 border-b`"
				 @click="setSelectedTab(`History`)"
			>
				Історія змін
			</div>
	  </div>
	  <div class="pt-6">
      <keep-alive>
		    <Overview v-if="this.selectedTabItem === `Overview` && selectedMarkerData" />
      </keep-alive>
      <keep-alive>
		    <History v-if="this.selectedTabItem===`History`"/>
      </keep-alive>
	  </div>
	</div>
	<NotFound v-else/>
</template>

<script>
import Overview from "./Overview.vue";
import History from "./History.vue";
import { mapState } from "vuex";
import NotFound from "./NotFound.vue";

export default {
  name: "SideBar",
  props: {
    selectedMarker: Object
  },
  components : {
		History,
		Overview,
		NotFound
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
