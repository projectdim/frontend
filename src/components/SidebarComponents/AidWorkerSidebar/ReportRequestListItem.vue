<template>
	<div class="shadow-cs3 p-4 rounded-lg hover:bg-blue-c-100 mb-4">
		<div>
			<div class="flex justify-between mb-3">
				<div class="text-overview-item-mobile text-gray-light-500">
					{{getDateStr()}}
				</div>
				<div class="text-overview-item-mobile text-gray-light-500">
					{{locationRequest.city}}
					<img src="/Marker-gray.svg" class="inline-block">
					500m
				</div>
			</div>
			<div class="text-overview-item text-blue-c-500 font-semibold pb-2 shadow-cs2 cursor-pointer"
				@click="setMapCenter(locationRequest.position)">
				<img src="/Marker-blue.svg" class="inline-block mr-1">
				{{locationRequest.address}}
			</div>
			<div class="flex justify-between mt-4">
				<button-1>
					Розглянути
				</button-1>
				<button-text-1>
					Додати до "Моїх запитів"
				</button-text-1>
			</div>
		</div>
	</div>
</template>

<script>

import {getDayDate} from "../../../Scripts/Helper.js";
import {mapMutations} from "vuex";

export default {
	name: "ReportRequestListItem",
	props : {
		locationRequest : {
			type : Object,
			required : true
		}
	},
	methods :{
		...mapMutations(["setMapCenter"]),
		getDateStr(){
			return getDayDate(this.locationRequest.created_at);
		}
	}
}
</script>

<style scoped>

</style>