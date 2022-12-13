<template>
	<div v-if="selectedMarkerData !== null"
			 id="sideBar" class="overflow-y-auto h-full shadow-cs1 flex flex-col">
	  <h1 class="px-6 font-semibold my-6 text-h1
			mobile:text-h1-m
			tablet:text-h1-m
			mobile:px-4
			tablet:px-4">
				{{ selectedMarkerData.address }},
				<span v-if="selectedMarkerData.address">
					{{ selectedMarkerData.street_number }},
				</span>
				{{ selectedMarkerData.index }},
				{{ selectedMarkerData.city }}
		</h1>
	  <div class="flex flex-nowrap text-center text-h3
			mobile:text-h4
			tablet:text-h4">
			<TabItemButton class="w-full" target-tab-value="Overview" :current-tab-value="selectedTabItem" @click="setSelectedTab('Overview')">
				{{ $t('userSideBar.overview') }}
			</TabItemButton>
			<TabItemButton class="w-full" target-tab-value="History" :current-tab-value="selectedTabItem" @click="setSelectedTab(`History`)">
				{{ $t('userSideBar.change-history') }}
			</TabItemButton>
	  </div>
	  <div class="pt-6 grow">
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
import TabItemButton from "../../Other/TabItemButton.vue";

export default {
  name: "SideBar",
  props: {
    selectedMarker: Object
  },
  components : {
		TabItemButton,
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
