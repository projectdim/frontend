<template>
  <div v-for="logItem in changeLogs"  :key="logItem.id">
		<HistoryItem :log="logItem"/>
  </div>
</template>

<script>
import api from "../api/index.js";
import SVG_fuel_station from "./ComponentsSVG/SVG_fuel_station.vue";
import SVG_hospital from "./ComponentsSVG/SVG_hospital.vue";
import {getDayDate, getTime} from "../Scripts/Helper.js";
import SVG_status_list from "./ComponentsSVG/SVG_status_list.vue";
import HistoryItem from "./HistoryItem.vue";
export default {
  name: "History",
	components: {HistoryItem, SVG_status_list, SVG_hospital, SVG_fuel_station},
	props: {
    locationId: Number
  },
  data: function () {
    return {
      changeLogs: []
    }
  },
  watch: {
    locationId: function () {
      this.getLocationLogs()
    }
  },
  async mounted() {
    await this.getLocationLogs();
  },
  methods: {
    async getLocationLogs() {
      await api.locations.getLocationChangeLog(this.locationId).then((response) => {
				console.log(JSON.stringify(response.data));
        this.changeLogs = response.data
      });
    },
		getDayDate(strDate){
			//console.log(strDate)
			return `${getDayDate(strDate)}`;
		}
  }
}
</script>

<style scoped>
</style>
