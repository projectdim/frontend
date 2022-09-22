<template>
	<SVG_building_condition v-if="this.icon==='buildingCondition'" :class="this.classList"
		:width="this.width" :height="this.height"/>
	<SVG_hospital v-else-if="this.icon==='hospital'" :class="this.classList"
		:width="this.width" :height="this.height"/>
	<SVG_car_entrance v-else-if="this.icon==='carEntrance'" :class="this.classList"
		:width="this.width" :height="this.height"/>
	<SVG_electricity v-else-if="this.icon==='electricity'" :class="this.classList"
		:width="this.width" :height="this.height"/>
	<SVG_fuel_station v-else-if="this.icon==='fuelStation'" :class="this.classList"
		:width="this.width" :height="this.height"/>
	<SVG_water v-else-if="this.icon==='water'"/>
</template>

<script>
import SVG_building_condition from "./SVG_building_condition.vue";
import SVG_hospital from "./SVG_hospital.vue";
import SVG_electricity from "./SVG_electricity.vue";
import SVG_fuel_station from "./SVG_fuel_station.vue";
import SVG_water from "./SVG_water.vue";
export default {
	name: "SVG_status_list",
	components: {SVG_water, SVG_fuel_station, SVG_electricity, SVG_hospital, SVG_building_condition},
	props : {
		icon : String,
		classList : String,
		width : Number,
		height : Number
	}
}
</script>

<style scoped>

</style>