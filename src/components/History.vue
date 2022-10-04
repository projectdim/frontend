<template>
  <div>
		<HistoryItem :log="logItem" v-for="logItem in changeLogs"  :key="`historyItem${logItem.id}`"/>
  </div>
</template>

<script>
import HistoryItem from "./HistoryItem.vue";
import {mapActions, mapState} from "vuex";
export default {
  name: "History",
	components: {HistoryItem},
  watch: {
		selectedMarkerData(){
			this.updateSelectedMarkerHistory();
		}
  },
	mounted() {
		this.updateSelectedMarkerHistory();
  },
  methods: {
		...mapActions({
			updateSelectedMarkerHistory : "getSelectedDataHistory"
		}),
  },
	computed : {
		...mapState({
			changeLogs: state => state.selectedMarkerHistoryData,
			selectedMarkerData: state => state.selectedMarkerData
		}),
	}
}
</script>

<style scoped>
</style>
