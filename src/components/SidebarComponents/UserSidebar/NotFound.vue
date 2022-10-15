<template>
  <div class="flex flex-col justify-between overflow-y-auto h-full shadow-cs1
		text-overview-item screen-475:text-overview-item-mobile screen-949:text-overview-item">
    <div class="p-6">
      <div v-if="notFoundedMarkerData">
        <p class="font-semibold text-4xl">На жаль, "{{ notFoundedMarkerData.address }}" немає в нашій базі даних</p>
        <p class="mt-2.5 text-base-grey ">
          Можливо варто вказати точнішу адресу.
          Ви також можете запитати інформацію за цією адресою, і наша команда постарається приїхати туди якомога швидше.
        </p>
      </div>
      <div v-else>
        <p class="font-semibold text-4xl">Виберіть на карті місце, яке Вас цікавить.</p>
      </div>
      <button-1 class="w-full my-6" @click="requestReview" :disabled="notFoundedMarkerData===null">
				<span v-if="notFoundedMarkerData">
					Надіслати запит на перевірку адреси
				</span>
				<span v-else>
					Виберіть адресу для запиту
				</span>
			</button-1>
      <p class="text-base-grey">
				Буде корисно, якщо ви повідомите нам через цю форму про будь-які проблеми, пов’язані з використанням нашого сервісу.
			</p>
      <div class="h-min">
		  	<textarea id="issueMessage"
                  class="min-h-[68px] resize-none h-max w-full border-gray-light-300 border rounded-lg px-4 py-2 my-4"
                  placeholder="Залишити повідомлення..." v-model="issueMessage"></textarea>
				<button @click="this.Show(issueMessage)"
								:disabled="this.isDisabled"
								:class="{'bg-gray-light-200 text-gray-light-400' : isDisabled,
											'bg-gray-light-200 text-gray-light-600 ' : !isDisabled,
											'hover:text-gray-light-500 active:bg-gray-light-300 active:text-gray-light-600' : !isDisabled}"
								class="block border rounded-lg px-[50px] py-2 font-medium">
					Відправити
				</button>
      </div>
    </div>
    <div id="contact" class=" p-6 bg-gray-light-100">
      <div class="font-semibold ">Урядові контакти</div>
      <div class="flex flex-wrap justify-between py-1 shadow-cs2 mt-2">
        <p>Служба безпеки України</p>
        <p class="text-right font-semibold text-base-blue">
          <a href="tel: +380800501482">
            0 800 501 482
          </a>
        </p>
      </div>
      <div class="flex flex-wrap justify-between py-1">
        <p>Державна прикордонна служба України</p>
        <p class="text-right font-semibold text-base-blue">
          <a href="tel: +380445276363">
            +38 (044) 527-63-63
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import {API_KEY} from "../../../Scripts/MapScripts.js";
import api from "../../../api/index.js"

export default {
  name: "NotFound",
	data : function () {
		return {
			issueMessage: "",
		}
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
		isDisabled(){
			return this.issueMessage.length < 10;
		},
	},
	methods : {
		Show(string) {
			alert(string);
		},
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
				alert("Не вдалося створити запит, вкажіть точнішу адресу")
				return;
			}
      await api.locations.requestAddressReview(Query).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err.response)
      });
    },
    async getPlaceData (lat, lng) {
      let placeData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${API_KEY}`)
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
