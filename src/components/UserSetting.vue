<template>
	<ModalTemplate :classList="'grid place-items-end screen-475:place-items-center' +
	 ' screen-475:px-4'" :close-func="closeModal"
	:is-modal-visible="isSettingVisible">
    <div class="w-[600px] h-screen overflow-y-auto bg-white p-9
    screen-475:p-4 screen-949:p-4 animate-userSettingsAppear relative
		screen-475:w-full screen-949:w-[480px]
		screen-475:h-min screen-475:rounded-lg" @click.stop
		:class="{'animate-userSettingsAppear' : isSettingVisible}">
			<Loader v-if="isShowLoader"></Loader>
<!--      Header-->
      <div class="mb-6 text-sidebar-address screen-475:text-sidebar-title screen-475:text-center relative
			font-semibold">
        Налаштування
				<img class="w-min h-min absolute top-0 screen-475:right-0 hidden screen-475:block " @click="closeModal"
						 src="/close.svg">
      </div>
			<button-text1 class="w-[100px] absolute top-9 right-9 screen-475:hidden" @click="closeModal">
				Закрити
			</button-text1>
<!--    FORM-->
      <div class="text-overview-item-mobile text-gray-light-500">

        <label for="setting-name">Ім'я</label>
        <input1 id="setting-name" placeholder="Ім'я" v-model="username"
								class="w-full text-black mt-1 mb-6"></input1>
        <label for="setting-mail">E-mail</label>
        <input1 id="setting-mail" placeholder="E-mail" v-model="email"
								class="w-full text-black mt-1" disabled></input1>
				<div class="flex flex-row-reverse gap-3 py-6">
					<Button1 :disabled="isSaveButtonDisabled" @click="updateUserData">
						Зберегти
					</Button1>
					<ButtonOptions :button-color="'blue'" @valueChange="changePassVisibility">
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
						<button1 :disabled="isChangePassButtonDisabled"
							@click="updateUserPassword">
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
import {mapGetters, mapMutations} from "vuex";
import api from "../api/index.js";
import Loader from "./Loader.vue";

export default {
  name: "UserSetting",
	emits : ["close"],
  components: {Loader, Button1, ModalTemplate, InputPass, Input1, ButtonText1, ButtonOptions},
  props : {
    isSettingVisible : {
      type : Boolean,
      default : false
    },
  },
	data () {
		return {
			isPassChangeVisible : false,
			isSaveButtonDisabled : true,
			isChangePassButtonDisabled : true,
			isShowLoader : false,
			oldPass : "",
			newPass : "",
			username : "",
			email : ""
		}
	},
	methods : {
		...mapMutations(['setLoggedUserInfo']),
		closeModal(){
			this.isPassChangeVisible = false;
			this.$emit("close");
		},
		changePassVisibility(isVisible){
			this.isPassChangeVisible = isVisible;
		},
		updateSaveButDisable(){
			if(this.username !== this.getUser.username ||
				this.email !== this.getUser.email)
				this.isSaveButtonDisabled = false;
			else
				this.isSaveButtonDisabled = true;
		},
		updateSavePassDisable(){
			if(this.oldPass.length >= 8 &&
				this.newPass.length >= 8)
				this.isChangePassButtonDisabled = false;
			else
				this.isChangePassButtonDisabled = true;
		},
		async updateUserData(){
			let updatedData = {
				"username": this.username,
				"email": this.email,
				"full_name": "Ivan Oliunyk",
			}
			this.isShowLoader = true;
			await api.user.UpdateUserData(updatedData).then(res=>{
				this.setLoggedUserInfo(res.data);
				alert("Оновлення даних успішне")
			}).catch(err=>{
				alert("Помилка оновлення даних")
			}).finally(()=>{
				this.isShowLoader = false;
			})
		},
		async updateUserPassword(){
			let updatedPass = {
				"old_password": this.oldPass,
				"new_password": this.newPass
			}
			console.log(updatedPass)
			this.isShowLoader = true;
			await api.user.UpdateUserPass(updatedPass).then(res=>{
				alert("Оновлення паролю успішне")
			}).catch(err=>{
				alert("Помилка оновлення паролю")
			}).finally(()=>{
				this.newPass = "";
				this.oldPass = "";
				this.isShowLoader = false;
			})
		}
	},
	computed : {
		...mapGetters(['getUser']),
	},
	watch : {
		getUser(newValue){
			if(this.getUser) {
				this.username = this.getUser.username;
				this.email = this.getUser.email;
			}
		},
		username(newVal){
			this.updateSaveButDisable()
		},
		email(newVal){
			this.updateSaveButDisable()
		},
		newPass(newVal){
			this.updateSavePassDisable()
		},
		oldPass(newVal){
			this.updateSavePassDisable()
		}
	},
	mounted(){
		if(this.getUser) {
			this.username = this.getUser.username;
			this.email = this.getUser.email;
		}
	}

}
</script>

<style scoped>

</style>
