<template>
		<div class="px-6" ref="viewport">
			<ReportRequestListItem v-if="unreviewedMarkers.length > 0"
				v-for="item in unreviewedMarkers"
				:key="`request${item.id}`"
				:location-request="item" itemUsageTabName='requestsList'/>
			<div v-else class="mt-6 text-center text-overview-item text-gray-c-800">
				Зараз немає запитів на адресу
			</div>
			<div ref="scrollObserver" class="relative h-[80px]" v-if="pageMax<0">
				<Loader v-show="isLoaderVisible"/>
			</div>
		</div>
</template>

<script>
import ReportRequestListItem from "./ReportRequestListItem.vue";
import api from "../../../api/index.js";
import {mapGetters} from "vuex";
import Loader from "../../Loader.vue";

export default {
	name: "ReportsRequestsList",
	components: {
		ReportRequestListItem,
		Loader
	},
  props: {
    userLocation: Object
  },
	data(){
		return {
			unreviewedMarkers: [],
			page: 0,
			pageMax: -1,
			isLoaderVisible : false
		}
	},
	methods : {
		async GetReportsRequest() {
			if(!this.isAuth)
				return;

			let payload = {
				page: ++this.page,
				limit: 20,
			}
			this.isLoaderVisible = true;

			//TODO Безкінечна лєнта демострація
			//await new Promise(resolve => setTimeout(resolve, 3000));

      navigator.geolocation.getCurrentPosition(async (pos) => {
        payload.user_lat = pos.coords.latitude
        payload.user_lng = pos.coords.longitude
        await api.locations.getReportsRequests(payload).then(res=>{
          if(res.data.length === 0)
            this.pageMax = --this.page;
          else if(res.data.length < 20)
            this.pageMax = this.page;
          this.unreviewedMarkers = [...this.unreviewedMarkers, ...res.data];
        }).catch(err=>{
          alert(err);
        }).finally(()=>{
          this.isLoaderVisible = false
        })
      }, async (err) => {
        await api.locations.getReportsRequests(payload).then(res=>{
          if(res.data.length === 0)
            this.pageMax = --this.page;
          else if(res.data.length < 20)
            this.pageMax = this.page;
          this.unreviewedMarkers = [...this.unreviewedMarkers, ...res.data];
        }).catch(err=>{
          alert(err);
        }).finally(()=>{
          this.isLoaderVisible = false
        })
      }, {timeout: 5000})
		},
	},
	mounted() {
		let options = {
			threshold: 0,
		}
		let callback = (entries, observer) => {
			if(entries[0].isIntersecting && !this.isLoaderVisible && this.pageMax<0) {
				this.GetReportsRequest();
			}
		};
		let observer = new IntersectionObserver(callback, options);
		observer.observe(this.$refs.scrollObserver, );
		this.GetReportsRequest();
	},
	computed : {
		...mapGetters(["isAuth"])
	}
}
</script>

<style scoped>

</style>