<template>
  <div class="flex flex-nowrap flex-col h-full">
    <Header class="shrink-0 grow-0"/>
    <div class="flex flex-col justify-start items-center px-4 pt-24
        w-[600px] mx-auto
        mobile:text-h4 mobile:w-full
        text-h3 grow shrink">
      <img src="/src/assets/fullLogo.svg">
      <p class="text-gray-c-500  mt-9 text-justify">
        {{ $t('welcomeScreen.helperText') }}
      </p>
      <div class="mx-[2.5%] w-full border bg-white rounded-xl border-gray-c-300 border-[2px] h-10 flex flex-nowrap mt-6 mb-12"
           :class="{'border-blue-c-500': isInputFocused}"
      >
        <div class="w-[44px] cursor-pointer rounded-xl">
          <img alt="search" src="/search.svg" class="h-full w-full object-scale-down">
        </div>
        <GMapAutocomplete
            id="autocomplete"
            ref="autocomplete"
            :placeholder="$t('welcomeScreen.searchPlaceholder')"
            @place_changed="GetMarker"
            class="w-full bg-transparent outline-none block text-h3"
            :options="{
                  fields: [`geometry`, `name`]
                }"
            @focusin="OnInputFocus(true)"
            @focusout="OnInputFocus(false)"
            v-model="this.searchRequest"
            :select-first-on-enter="true"
        />
        <div class="w-[40px] cursor-pointer rounded-xl" @click="this.ClearSearchRequest">
          <img id="close-button" src="/close.svg" alt="close" class="h-full w-full object-scale-down">
        </div>
      </div>

      <div class="w-full" v-if="recentReports.length>0">
        <div class="font-semibold mb-2">Recently completed reports</div>
				<WelcomeScreenReportList :reports-list="recentReports" :delay="5000" @report-click="GetReportById" class="w-full"/>
      </div>


  <!--    <div class="bg-gray-c-200 p-6 mt-12">
        <p class="font-semibold text-black">{{ $t('welcomeScreen.examples') }}: </p>
        <p class="mt-4 font-normal">{{ $t('welcomeScreen.firstExample') }}</p>
        <p class="mt-2 font-normal">{{ $t('welcomeScreen.secondExample') }}</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import Test from "../Test.vue"
import { mapState, mapActions } from "vuex";
import SVG_building_condition from "../ComponentsSVG/SVG_building_condition.vue";
import WelcomeScreenReportList from "./WelcomeScreenReportList.vue";
import api from "../../api/index.js";
export default {
  name: "WelcomeScreen",
  components: {
		WelcomeScreenReportList,
    SVG_building_condition,
    Header,
		Test
  },
  data: function () {
    return {
      searchRequest: null,
      isInputFocused: false,
			recentReports : []
    }
  },
  methods: {
		...mapActions(["GetMarkerByCoords", "getMarkerById"]),
    OnInputFocus(arg){
      this.isInputFocused = arg;
    },
    ClearSearchRequest(){
      let autocomplete = document.getElementById('autocomplete');
      autocomplete.value = ''
    },
		GetMarker(arg){
      console.log(arg)
      let payload = {}
      try {
        payload = {
          lat: arg.geometry.location.lat(),
          lng: arg.geometry.location.lng()
        }
      }
      catch  {
        this.$toast.error(this.$t("welcomeScreen.requestError", {address : arg.name ?? ""}))
        return;
      }
			this.GetMarkerByCoords({position : payload, name : arg.name})
			this.$router.push("/main/overview");
		},
    GetReportById(report){
      this.getMarkerById(report.id);
      this.$router.push("/main/overview");
    },
		async GetRecentReports(){
			await api.locations.getRecentReports(20)
				.then(res=>{
					this.recentReports = res.data ?? [];
				})
				.catch(err=>{
					console.error(err);
				})
		}
  },
	computed : {
		...mapState(["selectedMarkerData","notFoundedMarkerData"]),
	},
	/*watch : {
		selectedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main/overview");
		},
		notFoundedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main/overview");
		}
	},*/
	mounted(){
		//if(this.selectedMarkerData !==null || this.notFoundedMarkerData !==null)
		//	this.$router.replace("/main");
		this.GetRecentReports();
	}
}
</script>

<style scoped>

</style>
