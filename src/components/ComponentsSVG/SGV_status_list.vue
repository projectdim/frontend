<template>
	<SVG_building_condition/>
	<SVG_hospital/>
	<SVG_car_entrance/>
	<SVG_electricity/>
	<SVG_fuel_station/>
	<SVG_water/>
</template>

<script>
import SVG_building_condition from "./SVG_building_condition.vue";
import SVG_hospital from "./SVG_hospital.vue";
import SVG_electricity from "./SVG_electricity.vue";
import SVG_fuel_station from "./SVG_fuel_station.vue";
import SVG_water from "./SVG_water.vue";
export default {
	name: "SGV_status_list",
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