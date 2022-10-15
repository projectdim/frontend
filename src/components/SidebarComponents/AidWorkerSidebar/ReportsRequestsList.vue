<template>
		<div class="px-6">
			<ReportRequestListItem v-for="item in unreviewedMarkers" :key="`request${item.id}`"
				:location-request="item"/>
		</div>
</template>

<script>
import ReportRequestListItem from "./ReportRequestListItem.vue";
import api from "../../../api/index.js";
import {mapGetters} from "vuex";

export default {
	name: "ReportsRequestsList",
	components: {
		ReportRequestListItem
	},
	data(){
		return {
			unreviewedMarkers: [],
			page: 1
		}
	},
	methods : {
		async GetReportsRequest(){
			if(!this.isAuth)
				return;
			let payload = {
				'page' : this.page,
				'limit' : 20
			}
			await api.locations.getReportsRequests(payload).then(res=>{
				console.log(res.data);
				this.unreviewedMarkers = res.data;
			}).catch(err=>{
				alert(err);
			})
		}
	},
	mounted() {
		this.GetReportsRequest();
	},
	computed : {
		...mapGetters(["isAuth"])
	}
}
</script>

<style scoped>

</style>