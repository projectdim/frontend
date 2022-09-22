<template>
  <div v-for="log in changeLogs" :key="log.id" class="p-4">
    <div v-if="log.action_type === 1">
      <div class="bg-[#F7F9FC] p-4 w-full">
        <p class="font-semibold text-black text-xl capitalize">
					{{getDayDate(log.created_at).replace(' ', ", ")}}
				</p>
      </div>
      <div class="flex p-4">
        <p class="text-grey font-normal">
					{{new Date(log.created_at).toTimeString().split(' ')[0]}}
				</p>
        <div v-for="change in Object.keys(log.old_flags)" class="flex mx-auto gap-4">
<!--          <img class="fill-dangerous-red"
               :src="`/src/assets/buildingState/${change}.svg`">-->
					<p class="w-4 h-5">
						<SVG_hospital class="fill-dangerous-red"/>
					</p>
          <p class="grow font-semibold text-overview-item my-auto uppercase text-base"
             :class="log.old_flags[change] === `Неушкоджена` ? 'text-safety-green' : 'text-dangerous-red'">
            {{log.old_flags[change]}}
          </p>
        </div>
        <img src="/src/assets/change-arrow.svg">
        <div v-for="change in Object.keys(log.new_flags)" class="flex mx-auto gap-4">
          <img class="fill-dangerous-red"
               :src="`/src/assets/buildingState/${change}.svg`">
          <p class="grow font-semibold text-overview-item my-auto uppercase text-base"
             :class="log.new_flags[change] === `Неушкоджена` ? 'text-safety-green' : 'text-dangerous-red'">
            {{log.new_flags[change]}}
          </p>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import api from "../api/index.js";
import SVG_fuel_station from "./ComponentsSVG/SVG_fuel_station.vue";
import SVG_hospital from "./ComponentsSVG/SVG_hospital.vue";
import {getDayDate, getTime} from "../Scripts/Helper.js";
export default {
  name: "History",
	components: {SVG_hospital, SVG_fuel_station},
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
