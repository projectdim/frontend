<template>
	<div class="flex flex-col h-screen">
	<Header class="grow-0"/>
		<div class="grow flex items-center justify-center mobile:p-4">
				<div class="w-[480px] mobile:w-full  overflow-y-auto">
					<div class="text-center text-h1 font-semibold mb-9 text-gray-c-800">Вітаємо в DIM!</div>
					<div class="text-center text-body-2 font-semibold mb-6">Створіть свій профіль</div>
					<div>
						<div class="mb-6">
							<label for="user-name" class="block mb-1 text-h4 text-gray-c-500">Ім'я</label>
							<input-1 v-model="userName" validation-type="name" id="user-name" class="w-full mt-1 outline-none" placeholder="Повне ім'я"
							 @validation="onNameValidate" validation-message="Мінімальна довжина імені 3 символи"/>
						</div>
						<div class="mb-6">
							<label for="user-mail" class="block mb-1 text-h4 text-gray-c-500">Пошта</label>
							<input-1 v-model="userMail" validation-type="mail" id="user-mail" class="w-full mt-1 outline-none" placeholder="Пошта"
							@validation="onMailValidate" validation-message="Пошта не валідна"/>
						</div>
						<div class="mb-6">
							<label for="user-pass" class="block mb-1 text-h4 text-gray-c-500">Пароль</label>
							<input-pass validation-message="Пароль повинен містити мінімум 8 символів з них мінімум одну велику літеру, одну малу та одну цифру"
													v-model="pass" @validation="onPassValid" class="outline-none" id="user-pass" placeholder="Пароль"/>
						</div>
						<div class="mb-6">
							<label for="user-pass-conf" class="block mb-1 text-h4 text-gray-c-500">Підтвердження паролю</label>
							<input-pass v-model="passConfirm" class="outline-none" id="user-pass-conf" placeholder="Повторіть пароль"
							:validation-func="isPassEquals" validation-message="Паролі не співпадають"/>
						</div>
					</div>

					<div class="flex gap-2 flex-nowrap items-center mb-9">
						<input v-model="isTermsAccept" class="block w-6 h-6 accent-blue-c-500 hover:accent-blue-c-400 m-0 p-0" type="checkbox"/>
						<div>Я приймаю умови
							<a href="" class="link-1" target="_blank">Користувацької Згоди</a>
							та
							<a href="" class="link-1" target="_blank">
								Політики Конфіденційності
							</a>
						</div>
					</div>

					<button1 @click="CreateUser" class="w-full" :disabled="!isRegEnabled">
						Створити профіль
					</button1>
				</div>
		</div>
	</div>
	<Loader v-if="isLoaderVisible" class="z-[9999]"/>
	<SuccessMessage :is-visible="isSuccessMesVisible"
	:message="successMess" :close-func="closeSuccessMess"/>
	<ErrorModal :is-visible="isErrorMessageVisible"
							:message="errorMess" :close-func="closeErrorMessage"/>
</template>
<script>
import Header from "./Header.vue";
import input1 from "./Inputs/Input-1.vue"
import InputPass from "./Inputs/Input-pass.vue";
import Button1 from "./Buttons/Button_1.vue";
import regex from "./mixins/regex.js";
import Loader from "./Loader.vue";
import api from "../api/index.js";
import SuccessMessage from "./Modals/SuccessMessage.vue";
import ErrorModal from "./Modals/ErrorModal.vue";
export default {
	name: "UserRegistration",
	components: {
		ErrorModal,
		SuccessMessage,
		Loader,
		Button1,
		InputPass,
		Header,
		input1
	},
	mixins : [regex],
	data () {
		return {
			isTermsAccept : false,
			userName : "",
			userMail : "",
			pass : "",
			passConfirm : "",
			isNameValid : false,
			isMailValid : false,
			isPassValid : false,
			isLoaderVisible : false,
			isSuccessMesVisible : false,
			successMess : "Ви успішно створили аккаунт та можете авторизуватись.",
			isErrorMessageVisible : false,
			errorMess : "Упс... Щось пішло не так."
		}
	},
	methods : {
		onNameValidate(value){
			this.isNameValid = value;
		},
		onMailValidate(value){
			this.isMailValid = value;
		},
		onPassValid(value){
			this.isPassValid = value;
		},
		isPassEquals(){
			return this.pass === this.passConfirm;
		},
		closeSuccessMess(){
			this.isSuccessMesVisible = false;
			this.$router.push("/welcome");
		},
		closeErrorMessage(){
			this.isErrorMessageVisible = false;
			this.errorMess = "Упс... Щось пішло не так.";
		},
		async CreateUser(){
			this.isLoaderVisible = true;
			await api.user.RegistrationUser(this.userName, this.userMail, this.userName, 34, this.pass)
				.then(res=>{
					this.isLoaderVisible = false
					this.isSuccessMesVisible = true;
				})
				.catch(err=>{
					this.isLoaderVisible = false
					if(err.response.status===400)
						this.errorMess = `Користувача з поштою ${this.userMail} вже зареєстровано.`
					this.isErrorMessageVisible = true;
				})
		}
	},
	computed : {
		isRegEnabled(){
			return this.isMailValid && this.isNameValid && this.isPassValid &&
				this.isPassEquals() && this.isTermsAccept;
		},
	}
}
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

	.link-1{
		@apply text-blue-c-500 font-semibold
	}
</style>