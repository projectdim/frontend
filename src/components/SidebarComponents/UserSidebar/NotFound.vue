<template>
  <div class="flex flex-col justify-between overflow-y-auto h-full shadow-cs1
		text-h3 mobile:text-h4 tablet:text-h3">
    <div class="p-6">
      <div v-if="notFoundedMarkerData">
        <p class="font-semibold text-4xl">
          {{ $t("notFoundAddress.noDBItem", {address : notFoundedMarkerData.address}) }}
        </p>
        <p class="mt-2.5 text-gray-c-500 ">
          {{ $t("notFoundAddress.tips") }}
        </p>
      </div>
      <div v-else>
        <p class="font-semibold text-4xl">{{ $t('userSideBar.choose-location') }}</p>
      </div>
      <button-1 class="w-full my-6" @click="requestReview" :disabled="notFoundedMarkerData===null">
				<span v-if="notFoundedMarkerData">
					{{ $t('userSideBar.choose-location-button') }}
				</span>
				<span v-else>
					{{ $t('userSideBar.choose-location-button') }}
				</span>
			</button-1>
<!--			<FeedBackForm/>-->
    </div>
    <Contacts/>
<!--		<Loader/>-->
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import api from "../../../api/index.js"
import Loader from "../../Loader.vue";
import Contacts from "./Contacts.vue";
import FeedBackForm from "./FeedBackForm.vue";

export default {
  name: "NotFound",
	components: {
		FeedBackForm,
		Contacts,
		Loader
	},

	computed : {
		/*...mapState({
      notFoundedMarkerData : state =>{
        return state.notFoundedMarkerData ? state.notFoundedMarkerData : {
          address : "asd"
        }
      }
    }),*/
    ...mapState(["notFoundedMarkerData"]),
	},
	methods : {
    async requestReview () {
      const { address, coords } = await this.getPlaceData(
          this.notFoundedMarkerData.position.lat,
          this.notFoundedMarkerData.position.lng
      );
			let Query;
			try {
				Query = {
					address: address.route.long_name + ',' + address.street_number.long_name,
					index: address.postal_code.long_name,
					country: address.country.long_name,
					city: address.locality.long_name,
					lat: coords.location.lat,
					lng: coords.location.lng
				}
			}
			catch (err){
				this.$toast.error("Не вдалося створити запит, вкажіть точнішу адресу")
				return;
			}
			/*Query = {
				lng : coords.location.lng,
				lat : coords.location.lat,
			}*/

			await api.locations.requestAddressReview(Query).then((response) => {
        console.log(response)
				this.$toast.success(`Запит на адресу ${Query.address} надіслано успішно`)
      }).catch((err) => {
				//TODO localization
				let errMess = "error"
				if(err.response.status == 400)
					errMess = "Already exist"
				this.$toast.error(errMess)
        //console.log(err.response)
      });
    },
    async getPlaceData (lat, lng) {
      let placeData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${import.meta.env.VITE_GMAPS_APIKEY}`)
          .then((res => res.data))
          .catch((err) => console.log(JSON.stringify(err)));
      if (!placeData) return
      let addressData = placeData.results[0].address_components;
      let coordsData = placeData.results[0].geometry;
      let formattedAddress = {};
      for (var i = 0; i < addressData.length; i++) {
        var c = addressData[i];
        formattedAddress[c.types[0]] = c;
      }
      return {
        address: formattedAddress, coords: coordsData
      }
    }
	}
}
</script>

<style scoped>

</style>
