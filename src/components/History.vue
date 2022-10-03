<template>
  <div>
		<HistoryItem :log="logItem" v-for="logItem in changeLogs"  :key="`historyItem${logItem.id}`"/>
  </div>
</template>

<script>
import api from "../api/index.js";
import HistoryItem from "./HistoryItem.vue";
export default {
  name: "History",
	components: {HistoryItem},
  watch: {
    locationId: function () {
      this.getLocationLogs()
    },
		selectedMarkerData(){
			this.$store.dispatch("getSelectedDataHistory");
		}
  },
	mounted() {
     this.$store.dispatch("getSelectedDataHistory");
  },
  methods: {
    async getLocationLogs() {
      await api.locations.getLocationChangeLog(this.locationId).then((response) => {
				console.log(JSON.stringify(response.data));
        this.changeLogs = response.data
      });
    },
  },
	computed : {
		changeLogs(){
			return this.$store.state.selectedMarkerHistoryData;
		},
		selectedMarkerData(){
			return this.$store.state.selectedMarkerData;
		}
	}
}
</script>

<style scoped>
</style>
