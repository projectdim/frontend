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
          id="autocomplete"
          ref="autocomplete"
          placeholder="Пошук..."
          @place_changed="GetMarkerByCoords"
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
  },
	computed : {
		...mapState(["selectedMarkerData","notFoundedMarkerData"])
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
		if(this.selectedMarkerData !==null || this.notFoundedMarkerData !==null)
			this.$router.replace("/main");
	}

}
</script>

<style scoped>

</style>
