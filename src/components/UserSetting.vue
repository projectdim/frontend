<template>
	<ModalTemplate :classList="'grid place-items-end'" :close-func="closeModal"
	:is-modal-visible="isSettingVisible">
    <div class="w-[600px] h-screen overflow-y-auto bg-white p-9
    screen-475:p-2 screen-949:p-2 animate-userSettingsAppear" @click.stop
		:class="{'animate-userSettingsAppear' : isSettingVisible}">
<!--      Header-->
      <div class="flex justify-between mb-6">
        <h1 class="title">Settings</h1>
        <button-text1 class="w-[100px] block" @click="closeModal">Close</button-text1>
      </div>

<!--    FORM-->
      <div class="text-overview-item-mobile text-gray-light-500">

        <label for="setting-name">Ім'я</label>
        <input1 id="setting-name" placeholder="Ім'я" v-model="username"
								class="w-full text-black mt-1 mb-6"></input1>
        <label for="setting-mail">E-mail</label>
        <input1 id="setting-mail" placeholder="E-mail" v-model="email"
								class="w-full text-black mt-1" disabled></input1>
				<div class="flex flex-row-reverse">
					<ButtonOptions :button-color="'blue'" @valueChange="changePassVisibility"
						class="my-6">
						Змінити пароль...
					</ButtonOptions>
				</div>

				<div v-show="isPassChangeVisible">
					<label for="setting-pass">Пароль</label>
					<input-pass id="setting-pass" placeholder="Пароль" class="text-black mt-1 mb-6"
						v-model="oldPass"></input-pass>
					<label for="setting-new-pass">Новий пароль</label>
					<input-pass id="setting-new-pass" placeholder="Новий пароль" class="text-black mt-1 mb-6"
						v-model="newPass"></input-pass>
					<div class="flex flex-row-reverse">
						<button1>
							Зберегти
						</button1>
					</div>
				</div>
      </div>

    </div>
	</ModalTemplate>
</template>

<script>
import ButtonText1 from "./Buttons/Button_text_1.vue";
import Input1 from "./Inputs/Input-1.vue";
import InputPass from "./Inputs/Input-pass.vue";
import ButtonOptions from "./Buttons/Button-options.vue";
import ModalTemplate from "./Modals/ModalTemplate.vue";
import Button1 from "./Buttons/Button_1.vue";
import {mapGetters} from "vuex";
export default {
  name: "UserSetting",
	emits : ["close"],
  components: {Button1, ModalTemplate, InputPass, Input1, ButtonText1, ButtonOptions},
  props : {
    isSettingVisible : {
      type : Boolean,
      default : false
    },
  },
	data () {
		return {
			isPassChangeVisible : false,
			oldPass : "",
			newPass : "",
			username : this.uName,
			email : this.uEmail
		}
	},
	methods : {
		closeModal(){
			this.isPassChangeVisible = false;
			this.$emit("close");
		},
		changePassVisibility(isVisible){
			this.isPassChangeVisible = isVisible;
			/*if(!this.isPassChangeVisible){
				this.oldPass = "";
				this.newPass = "";
			}*/
		}
	},
	computed : {
		...mapGetters(['getUser']),
		uName(){
			return this.getUser.username;
		},
		uEmail(){
			return this.getUser.email;
		}
	}
}
</script>

<style scoped>

</style>
