<template>
	<div class="shadow-cs3 p-4 rounded-lg mb-4 relative"
		:class="{'bg-blue-c-100' : isSelected}">
		<div>
			<div class="flex justify-between mb-3">
				<div class="text-overview-item-mobile text-gray-c-500">
					{{getDateStr()}}
				</div>
				<div class="text-overview-item-mobile text-gray-c-500">
					{{locationRequest.city}}
					<img src="/Marker-gray.svg" class="inline-block">
          {{ locationRequest.distance ? locationRequest.distance.toFixed(0) + " km" : 'Невідомо' }}
				</div>
			</div>
			<div class="text-overview-item text-blue-c-500 font-semibold pb-2 shadow-cs2 cursor-pointer"
				@click="this.setSelectedRequest(locationRequest)">
				<img src="/Marker-blue.svg" class="inline-block mr-1">
				{{locationRequest.address}}
			</div>
			<div class="flex justify-between mt-4 items-baseline">

				<div>
					<button-1 @click="this.Reporting">
						Розглянути
					</button-1>
					<button-2 v-if="isMyRequest && itemUsageTabName==='myRequestsList'"
										class="ml-3" @click="RemoveFromMyRequests">
						Видалити
					</button-2>
				</div>

				<button-text-1 @click="AddToMyRequests" v-if="!isMyRequest
					&& itemUsageTabName==='requestsList'">
					Додати до "Моїх запитів"
				</button-text-1>

				<div v-else-if="isMyRequest && itemUsageTabName==='requestsList'"
						 class="text-overview-item font-medium text-blue-c-500 p-2">
					<img src="/completed2.svg" class="inline-block mr-2">
					Мій запит
				</div>

			</div>
		</div>
		<Loader v-if="isLoaderVisible"/>
	</div>
</template>

<script>

import {getDayDateString} from "../../../Scripts/Helper.js";
import {mapActions, mapState} from "vuex";
import api from "../../../api/index.js";
import Loader from "../../Loader.vue";

export default {
	name: "ReportRequestListItem",
	components: {Loader},
	emits : ["remove-from-my-list"],
	props : {
		locationRequest : {
			type : Object,
			required : true
		},
		itemUsageTabName : {
			type : String,
			default : "requestsList",
			validator: function (value){
				return ["requestsList", "myRequestsList"].includes(value);
			}
		}
	},
	data () {
		return {
			isMyRequest: false,
			isLoaderVisible : false
		}
	},
	methods :{
		...mapActions(["setSelectedRequest"]),
		getDateStr(){
			return getDayDateString(this.locationRequest.created_at);
		},
		Reporting(){
			this.setSelectedRequest(this.locationRequest);
			this.$router.push("/main/submit-report")
		},
		async AddToMyRequests(){
			this.isLoaderVisible = true;
			await api.locations.assignRequest(this.locationRequest.id).then(res=>{
				this.locationRequest.reported_by = res.data.reported_by
			}).catch(err=>{
				console.log(err)
			}).finally(()=>{
				this.isLoaderVisible = false;
			})
		},
		async RemoveFromMyRequests(){
			this.isLoaderVisible = true;
			await api.locations.removeAssignRequest(this.locationRequest.id).then(res=>{
				this.locationRequest.reported_by = res.data.reported_by
				this.$emit("remove-from-my-list", this.locationRequest.id)
			}).catch(err=>{
				console.log(err)
			}).finally(()=>{
				this.isLoaderVisible = false;
			})
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
		isMyRequest(){
			return this.locationRequest.reported_by === this.AidWorker.id;
		}
	}
}
</script>

<style scoped>

</style>