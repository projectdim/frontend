<template>
	<Header/>
  <div class=" flex flex-col items-center px-4 pt-24
  		max-w-[600px] mx-auto
			screen-475:text-overview-item-mobile
			text-overview-item">
    <img src="/src/assets/fullLogo.svg">
    <p class="text-base-grey  mt-9 text-justify">
			Шукайте адресу, щоб переглянути краудсорсингові звіти про своє місто
		</p>
    <div class="mx-[2.5%] w-full border bg-white rounded-xl border-gray-light-300 border-[2px] h-10 flex flex-nowrap mt-6"
         :class="{'border-base-blue': isInputFocused}"
    >
      <div class="w-[44px] cursor-pointer rounded-xl">
        <img src="/search.svg" class="h-full w-full object-scale-down">
      </div>
      <GMapAutocomplete
          v-model="searchRequest"
          id="autocomplete"
          ref="autocomplete"
          placeholder="Пошук..."
          @place_changed="setPlace"
          class="w-full bg-transparent outline-none block text-overview-item"
          :options="{
							  fields: [`geometry`, `name`]
						  }"
          @focusin="OnInputFocus(true)"
          @focusout="OnInputFocus(false)"
          :v-model="this.searchRequest"
      />
      <div class="w-[40px] cursor-pointer rounded-xl" @click="this.ClearSearchRequest">
        <img src="/close.svg" class="h-full w-full object-scale-down">
      </div>
    </div>
    <div class="bg-gray-light-200 p-6 mt-12">
      <p class="font-semibold text-black">Приклади: </p>
      <p class="mt-4 font-normal">проспект Незалежності, Харків, Харківська область, Україна, 61000</p>
      <p class="mt-2 font-normal">Жилянська,12 , Київ, Україна, 02000</p>
    </div>
<!--		<Test/>-->
  </div>

</template>

<script>
import Header from "./Header.vue";
import Test from "./Test.vue"
import api from "../api/index.js";
export default {
  name: "WelcomeScreen",
  components: {
    Header,
		Test
  },
  data: function () {
    return {
      searchRequest: null,
      isInputFocused: false
    }
  },
  methods: {
		setPlace (arg) {
     /* this.center = arg.geometry.location;
      let payload = {
        lat: arg.geometry.location.lat(),
        lng: arg.geometry.location.lng()
      }
      await api.locations.exactSearch(payload.lat, payload.lng).then((response) => {
        this.$emit('changeMarkerView', response.data);
      }).catch((err) => {
        if (err.response.status === 400) {
          let notFoundAddress = {
            position: payload,
            address: arg.name
          }
          this.currentMapZoom = this.currentMapZoom >= 17 ? this.currentMapZoom : 17;
					this.$store.commit('setNoDataMarkerMarker', notFoundAddress);
					this.$emit('show-not-found', notFoundAddress);
          return
        }
      });*/
			this.$store.dispatch("GetMarkerByCoords", arg);
    },
    OnInputFocus(arg){
      this.isInputFocused = arg;
    },
    ClearSearchRequest(){
      let autocomplete = document.getElementById('autocomplete');
      autocomplete.value = ''
    },
  },
	computed : {
		selectedMarkerData(){
			return this.$store.state.selectedMarkerData;
		},
		notFoundedMarkerData(){
			return this.$store.state.notFoundedMarkerData;
		}
	},
	watch : {
		selectedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main");
		},
		notFoundedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main");
		}
	},
	mounted(){
		if(this.$store.state.selectedMarkerData !==null || this.$store.state.notFoundedMarkerData !==null)
			this.$router.replace("/main");
	}

}
</script>

<style scoped>

</style>
