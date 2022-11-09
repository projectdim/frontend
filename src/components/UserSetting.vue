<template>
	<ModalTemplate :classList="'grid place-items-end mobile:place-items-center' +
	 ' mobile:px-4'" :close-func="closeModal"
	:is-modal-visible="isSettingVisible">
    <div class="w-[600px] h-screen overflow-y-auto bg-white p-9
    mobile:p-4 tablet:p-4 animate-userSettingsAppear relative
		mobile:w-full tablet:w-[480px]
		mobile:h-min mobile:rounded-lg" @click.stop
		:class="{'animate-userSettingsAppear' : isSettingVisible}">
			<Loader v-if="isShowLoader"></Loader>
<!--      Header-->
      <div class="mb-6 text-h1 mobile:text-h2 mobile:text-center relative
			font-semibold">
        Налаштування
				<img class="w-min h-min absolute top-0 mobile:right-0 hidden mobile:block " @click="closeModal"
						 src="/close.svg">
      </div>
			<button-text1 class="w-[100px] absolute top-9 right-9 mobile:hidden" @click="closeModal">
				Закрити
			</button-text1>
<!--    FORM-->
      <div class="text-h4 text-gray-c-500"
				:class="{'mobile:flex mobile:flex-col-reverse' : isPassChangeVisible}">

				<div :class="{'mobile:hidden' : isPassChangeVisible}">
					<label for="setting-name">Ім'я</label>
					<input1 id="setting-name" placeholder="Ім'я" v-model="username"
									class="w-full text-black mt-1 mb-6"/>
					<label for="setting-mail">E-mail</label>
					<input1 id="setting-mail" placeholder="E-mail" v-model="email"
									class="w-full text-black mt-1" disabled/>
				</div>

				<div class="flex flex-row-reverse gap-3 py-6"
					:class="{'mobile:hidden' : isPassChangeVisible}">
					<Button1 :disabled="isSaveButtonDisabled" @click="updateUserData">
						Зберегти
					</Button1>
					<ButtonOptions :button-color="'blue'" @valueChange="changePassVisibility"
						:checked="isPassChangeVisible">
						Змінити пароль...
					</ButtonOptions>
				</div>

				<div v-show="isPassChangeVisible">
					<label for="setting-pass">Пароль</label>
					<input-pass id="setting-pass" placeholder="Пароль" class="text-black mt-1 mb-6"
						v-model="oldPass"/>
					<label for="setting-new-pass">Новий пароль</label>
					<input-pass id="setting-new-pass" placeholder="Новий пароль" class="text-black mt-1"
						v-model="newPass"/>

					<div class="flex flex-row-reverse gap-3 py-6">
						<button1 :disabled="isChangePassButtonDisabled"
							@click="updateUserPassword">
							Зберегти
						</button1>
						<ButtonOptions :button-color="'blue'"  class="hidden mobile:block"
													 @valueChange="changePassVisibility" :checked="isPassChangeVisible">
							Змінити пароль...
						</ButtonOptions>
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
