<template>
	<teleport to="body">
		<div v-if="isModalVisible" class="overflow-y-hidden z-50 h-screen w-screen bg-black/30 absolute top-0
				screen-475:px-2 grid place-items-center"
				 @click="hide">
        <div class="mx-auto rounded-xl p-6 w-[480px] screen-475:w-full
          h-min min-h-[320px] bg-white animate-appear relative overflow-hidden"
          :class="{'animate-disappear' : isClosedClick}"
        @click.stop>
          <div v-if="!isLogInFailed" class="text-sidebar-title font-semibold relative py-1 text-center
            screen-475:text-sidebar-title-mobile screen-949:text-sidebar-title-mobile">
            Вхід
            <button class="absolute top-0 right-0 h-4 w-4 i-can-close-it"
                    @click="hide">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="#1D2229"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="black" fill-opacity="0.2"/>
              </svg>
            </button>
            <div>
              <Input-1 ref="emailInput" class="w-full my-6" placeholder="Email" v-model="email"/>
              <Input-pass class="w-full" v-model="pass"/>
              <button-text-1 class="font-semibold block my-3">
                Відновити пароль...
              </button-text-1>
              <button-1 class="block w-full" :disabled="isButtonDisabled" @click="login">
                Увійти
              </button-1>
            </div>
          </div>

					<div v-if="isLogInFailed" class="labels flex flex-col">
						<div class="flex screen-475:flex-col">
							<div class="w-[30px] screen-475:w-full">
								<svg width="30" height="30" class="fill-blue-c-400 block mx-auto" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M15 0.333252C6.89986 0.333252 0.333374 6.89974 0.333374 14.9999C0.333374 23.1001 6.89986 29.6666 15 29.6666C23.1002 29.6666 29.6667 23.1001 29.6667 14.9999C29.6667 6.89974 23.1002 0.333252 15 0.333252ZM3.00004 14.9999C3.00004 8.3725 8.37262 2.99992 15 2.99992C21.6275 2.99992 27 8.3725 27 14.9999C27 21.6273 21.6275 26.9999 15 26.9999C8.37262 26.9999 3.00004 21.6273 3.00004 14.9999ZM15 8.33325C15.7364 8.33325 16.3334 8.93021 16.3334 9.66658V16.3333C16.3334 17.0696 15.7364 17.6666 15 17.6666C14.2637 17.6666 13.6667 17.0696 13.6667 16.3333V9.66658C13.6667 8.93021 14.2637 8.33325 15 8.33325ZM15 21.6666C15.7364 21.6666 16.3334 21.0696 16.3334 20.3333C16.3334 19.5969 15.7364 18.9999 15 18.9999C14.2637 18.9999 13.6667 19.5969 13.6667 20.3333C13.6667 21.0696 14.2637 21.6666 15 21.6666Z"/>
								</svg>
							</div>
							<div class="px-4">
								<p class="font-semibold text-blue-c-500">
									Нажаль Ви не можете продовжувати стоворювати звіти, оскільки Вашу організацію заблоковано.
								</p>
								<p class="py-2">Причина: <span class="font-semibold text-red-c-500">{{ logInErrorMessage }}</span></p>
								<p>Ми проінформуємо Вас, коли проблему буде вирішено. Дякуємо за Вашу роботу.</p>
							</div>
						</div>

						<button1 @click="failedStateToDefault" class="w-full mt-6">Зрозумів, дякую</button1>
					</div>

					<Loader v-if="isLoaderVisible"></Loader>
        </div>
		</div>
	</teleport>
</template>
<script>
import api from "../../api/index.js";
import {mapMutations, mapGetters} from 'vuex';
import Button1 from "../Buttons/Button_1.vue";
import Loader from "../Loader.vue";

export default {
	name: "LoginModal",
	components: {Button1, Loader},
	props : {
		isModalVisible : {
			type : Boolean,
			default : false,
		},
		closeFunc : {
			type : Function,
			required : true
		}
	},
	data(){
		return {
			email : "user@example.com",
			pass : "Asd112233",
      isClosedClick : false,
			isLogInFailed : false,
			logInErrorMessage : "",
			isLoaderVisible : false
		}
	},
	methods : {
		...mapMutations(['setLoggedUserCredentials', 'setLoggedUserInfo']),
		hide(){
      this.isClosedClick = true;
      setTimeout( ()=> {
        this.isClosedClick = false;
				this.failedStateToDefault();
				this.closeFunc();
      }, 400);
		},
    async login(){
      if(!this.isButtonDisabled){
				this.isLoaderVisible = true;
				let credentials = new FormData();
				credentials.append('username', this.email);
				credentials.append('password', this.pass);
				console.log(credentials)
				await api.user.LogIn(credentials).then(res=>{
					this.setLoggedUserCredentials(res.data);
					this.getInfo();
				}).catch(err=>{
					this.logInErrorMessage = err;
					this.isLogInFailed = true;
					this.isLoaderVisible = false;
				})
      }
    },
		async getInfo(){
			if(this.getToken === null){
				this.logInErrorMessage = "Проблеми з токеном";
				this.isLogInFailed = true;
			}
			api.user.GetInfo().then(res=>{
				this.setLoggedUserInfo(res.data);
			}).catch(err=>{
				this.logInErrorMessage = err;
				this.isLogInFailed = true;
			}).finally(()=>{
				this.isLoaderVisible = false;
			})
		},
		failedStateToDefault(){
			this.email = ""
			this.pass = ""
			this.isLogInFailed = false;
			this.logInErrorMessage = "";
			this.isLoaderVisible = false;
		}
	},
	computed : {
		...mapGetters(['getToken', 'isAuth']),
		isButtonDisabled(){
			return this.email.length <= 0 || this.pass.length <= 0;
		}
	},
	watch : {
		isAuth(newValue){
			if(newValue)
				this.hide();
		}
	}
}
</script>

<style scoped>

</style>
