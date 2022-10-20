<template>
  <div>
<!--		<HistoryItem :log="logItem" v-for="logItem in changeLogs"  :key="`historyItem${logItem.id}`"/>-->
		<HistoryItem :logs="logItem" v-for="logItem in sortedChangedLogs"  :key="`historyItem${logItem[0].id}`"/>
  </div>
</template>

<script>
import HistoryItem from "./HistoryItem.vue";
import {mapActions, mapState} from "vuex";
import {isSameDay} from "../../../Scripts/Helper.js";

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
		sortedChangedLogs(){
			let result = this.changeLogs.reduce((dates, log)=>{
				let date = log.created_at.split("T")[0];
				if(!dates[date])
					dates[date] = []
				dates[date].push(log)
				return dates
			}, {});

			return result;
		}
	}
}
</script>

<style scoped>
</style>
