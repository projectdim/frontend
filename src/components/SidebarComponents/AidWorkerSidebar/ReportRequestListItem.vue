<template>
	<div class="shadow-cs3 p-4 rounded-lg mb-4"
		:class="{'bg-blue-c-100' : isSelected}">
		<div>
			<div class="flex justify-between mb-3">
				<div class="text-overview-item-mobile text-gray-c-500">
					{{getDateStr()}}
				</div>
				<div class="text-overview-item-mobile text-gray-c-500">
					{{locationRequest.city}}
					<img src="/Marker-gray.svg" class="inline-block">
					500m
				</div>
			</div>
			<div class="text-overview-item text-blue-c-500 font-semibold pb-2 shadow-cs2 cursor-pointer"
				@click="this.setSelectedRequest(locationRequest)">
				<img src="/Marker-blue.svg" class="inline-block mr-1">
				{{locationRequest.address}}
			</div>
			<div class="flex justify-between mt-4">

				<button-1 @click="this.Reporting">
					Розглянути
				</button-1>
				<div>
					sadfsdfsd
				</div>
				<button-text-1 @click="AddToMyRequests">
					Додати до "Моїх запитів"
				</button-text-1>
			</div>
		</div>
	</div>
</template>

<script>

import {getDayDate} from "../../../Scripts/Helper.js";
import {mapActions, mapState} from "vuex";
import {Path} from "../../../router/mainRouter.js";

export default {
	name: "ReportRequestListItem",
	props : {
		locationRequest : {
			type : Object,
			required : true
		}
	},
	methods :{
		...mapActions(["setSelectedRequest"]),
		getDateStr(){
			return getDayDate(this.locationRequest.created_at);
		},
		Reporting(){
			this.setSelectedRequest(this.locationRequest);
			this.$router.push(Path.updateReport)
		},
		//TODO
		AddToMyRequests(){
			this.locationRequest.reported_by = this.AidWorker.id;
		}
	},
	computed : {
		...mapState({
			selectedLocationRequest : state => state.reports.selectedLocationRequest,
			AidWorker : state => state.loggedUserInfo
		}),
		isSelected(){
			if(!this.selectedLocationRequest || !this.locationRequest)
				return false;
			else
				return this.locationRequest.id === this.selectedLocationRequest.id
		},
	}
}
</script>

<style scoped>

</style>