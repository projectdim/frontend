<template>
	<Header/>
  <div class=" flex flex-col items-center px-4 pt-24
  		max-w-[600px] mx-auto
			mobile:text-h4
			text-h3">
    <img src="/src/assets/fullLogo.svg">
    <p class="text-gray-c-500  mt-9 text-justify">
      {{ $t('welcomeScreen.helperText') }}
		</p>
    <div class="mx-[2.5%] w-full border bg-white rounded-xl border-gray-c-300 border-[2px] h-10 flex flex-nowrap mt-6"
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
					:v-model="this.searchRequest"
			/>
      <div class="w-[40px] cursor-pointer rounded-xl" @click="this.ClearSearchRequest">
        <img id="close-button" src="/close.svg" alt="close" class="h-full w-full object-scale-down">
      </div>
    </div>
    <div class="bg-gray-c-200 p-6 mt-12">
      <p class="font-semibold text-black">{{ $t('welcomeScreen.examples') }}: </p>
      <p class="mt-4 font-normal">{{ $t('welcomeScreen.firstExample') }}</p>
      <p class="mt-2 font-normal">{{ $t('welcomeScreen.secondExample') }}</p>
    </div>
<!--		<Test/>-->
  </div>

</template>

<script>
import Header from "./Header.vue";
import Test from "./Test.vue"
import { mapState, mapActions } from "vuex";
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
		...mapActions(["GetMarkerByCoords"]),
    OnInputFocus(arg){
      this.isInputFocused = arg;
    },
    ClearSearchRequest(){
      let autocomplete = document.getElementById('autocomplete');
      autocomplete.value = ''
    },
		GetMarker(arg){
			let payload = {
          lat: arg.geometry.location.lat(),
          lng: arg.geometry.location.lng()
        }
				this.GetMarkerByCoords({position : payload, name : arg.name})
		}
  },
	computed : {
		...mapState(["selectedMarkerData","notFoundedMarkerData"])
	},
	watch : {
		selectedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main/overview");
		},
		notFoundedMarkerData: function (newVal){
			if(newVal !== null)
				this.$router.push("/main/overview");
		}
	},
	mounted(){
		if(this.selectedMarkerData !==null || this.notFoundedMarkerData !==null)
			this.$router.replace("/main");
	}

}
</script>

<style scoped>

</style>
