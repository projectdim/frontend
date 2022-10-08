<template>
  <div class="flex flex-col justify-between overflow-y-auto h-full shadow-1cs
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
      <button-1 class="w-full my-6">
				Надіслати запит на перевірку адреси
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
      <div class="flex flex-wrap justify-between py-1 shadow-2cs mt-2">
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
	}
}
</script>

<style scoped>

</style>
