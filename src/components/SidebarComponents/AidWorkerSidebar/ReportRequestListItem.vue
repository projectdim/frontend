<template>
	<div class="shadow-cs3 p-4 rounded-lg mb-4 relative"
		:class="{'bg-blue-c-100' : isSelected}">
		<div>
			<div class="flex justify-between mb-3">
				<div class="text-h4 text-gray-c-500 capitalize">
					{{ GetDayDateString(locationRequest.created_at) }}
				</div>
				<div class="text-h4 text-gray-c-500">
					{{locationRequest.city}}
					<img src="/Marker-gray.svg" class="inline-block">
          {{ locationRequest.distance ? locationRequest.distance.toFixed(0) + " km" : 'Невідомо' }}
				</div>
			</div>
			<div class="text-h3 text-blue-c-500 font-semibold pb-2 shadow-cs2 cursor-pointer"
				@click="setSelectedRequest(locationRequest)">
				<img src="/Marker-blue.svg" class="inline-block mr-1">
        {{markerAddress}}
			</div>
			<div class="flex justify-between mt-4 items-baseline">

				<div>
					<button-1 @click="this.Reporting">
            {{ $t('aidWorkerSideBar.takeRequest') }}
					</button-1>
					<button-2 v-if="isMyRequest && itemUsageTabName==='myRequestsList'"
										class="ml-3" @click="RemoveFromMyRequests">
						{{ $t('general.delete') }}
					</button-2>
				</div>

				<button-text-1 @click="AddToMyRequests" v-if="!isMyRequest
					&& itemUsageTabName==='requestsList'">
          {{ $t('aidWorkerSideBar.addToMyList') }}
				</button-text-1>

				<div v-else-if="isMyRequest && itemUsageTabName==='requestsList'"
						 class="text-h3 font-medium text-blue-c-500 p-2">
					<img src="/completed2.svg" class="inline-block mr-2">
          {{ $t('aidWorkerSideBar.myRequest') }}
				</div>

			</div>
		</div>
		<Loader v-if="isLoaderVisible"/>
	</div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import api from "../../../api/index.js";
import Loader from "../../Loader.vue";
import dateFormatter from "../../mixins/dateFormatter.js";

export default {
	name: "ReportRequestListItem",
	components: {Loader},
	emits : ["remove-from-my-list"],
  mixins : [dateFormatter],
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
			AidWorker : state => state.user.loggedUserInfo
		}),
		isSelected(){
			if(!this.selectedLocationRequest || !this.locationRequest)
				return false;
			else
				return this.locationRequest.id === this.selectedLocationRequest.id
		},
		isMyRequest(){
			return this.locationRequest.reported_by === this.AidWorker.id;
		},
    markerAddress(){
      let address = ""
      if(this.locationRequest.address)
        address += `${this.locationRequest.address}, `
      if(this.locationRequest.street_number)
        address += `${this.locationRequest.street_number}, `
      /*if(this.locationRequest.index)
        address += `${this.locationRequest.index}, `*/
      if(this.locationRequest.city)
        address += `${this.locationRequest.city}`
      let trim = 0;
      for (let i = address.length-1; i<=0; i--){
        if(address[i] === " " || address[i] === ",")
          trim++
        else
          break;
      }
      address = address.substring(0, address.length-trim);
      return address.length>0 ? address : this.$t("general.error");
    }
	}
}
</script>

<style scoped>

</style>
