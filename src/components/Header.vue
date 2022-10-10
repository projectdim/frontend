<template>
  	<header class="w-full
  	screen-475:h-[62px]
  	screen-949:h-[62px]
  	screen-950:h-[74px]
  	screen-475:px-4 screen-475:py-2.5
  	screen-949:px-4 screen-949:py-2.5
  	screen-950:px-2.5 screen-950:py-0
  	shadow-2cs flex flex-nowrap place-content-between bg-white">

			<div v-if="isAuth" class="cursor-pointer h-min my-auto flex text-body-3 items-center">
				<img src="src/assets/Logo_2.svg" class="
				screen-475:h-6
	  		screen-949:h-6
				h-10 w-auto mr-4 screen-475:hidden">
				<div class="screen-475:hidden">
					<p class="font-semibold">
						<img src="src/assets/User.svg" class="h-4 w-auto inline">
						{{ userName }}
					</p>
					<p class="text-gray-light-500">
						{{ userOrganization }}
					</p>
				</div>
				<img src="src/assets/Logo.svg" class="
				screen-475:h-6
	  		screen-949:h-6
				h-10 w-auto mr-4 hidden screen-475:block">
			</div>
			<div v-else class="cursor-pointer h-min my-auto">
	  		<img src="../assets/Logo.svg" alt="" class="block
	  		screen-475:h-6
	  		screen-949:h-6
	  		screen-950:h-10
	  		w-auto">
	  	</div>


		<div class="flex font-medium text-base-blue
					screen-950:p-2
					text-overview-item
					screen-475:text-overview-item-mobile
    			screen-949:text-overview-item-mobile">
			<img v-bind:src="'./Flags/'+this.imageSrc"
					 class="h-[18px] w-[24px] my-auto" alt="Flag">
			<select name="lang-selector" id="lang-selector"
							class="h-min my-auto bg-transparent ml-[5px] text-right
							cursor-pointer"
							@change="onSelectChange">
				<option value="Ukrainian">Українська</option>
				<option value="English">English</option>
			</select>
			<button-text-1 v-if="!isAuth" class="h-min my-auto
				screen-950:ml-[37px] screen-950:ml-[25px]" role="link"
				@click="showLogInModal">
				LogIn
			</button-text-1>


			<div v-if="isAuth" class="h-full flex items-center gap-x-6
				screen-475:gap-x-1 ml-7 screen-475:ml-1">
				<div class="hover:bg-blue-c-200 rounded-lg p-1">
					<img @click="showSettingModal" src="/src/assets/Settings.svg" class="block h-6 w-auto cursor-pointer">
				</div>
				<div class="hover:bg-blue-c-200 rounded-lg p-1 relative">
					<div class="absolute bg-red-c-500 rounded-[32px] py-0.5 px-1 font-semibold
							text-body-3 text-white top-[-10px] right-[-5px] h-6 w-[22px] text-center">
						15
					</div>
					<img src="/src/assets/Aid-worker-actions.svg" class="block h-6 w-auto cursor-pointer">
				</div>
				<button-text1 @click="logOut">
					LogOut
				</button-text1>
			</div>
		</div>

			<LoginModal :is-modal-visible="isLoginModal"
									:close-func="closeModal">
			</LoginModal>
      <UserSetting :is-setting-visible="isSettingModal"
			@close="closeModal"/>
		</header>
</template>

<script>
import UserSetting from "./UserSetting.vue";
import {mapGetters, mapMutations} from "vuex";
import ButtonText1 from "./Buttons/Button_text_1.vue";

export default {
  name: "Header",
  components : {
		ButtonText1,
    UserSetting
  },
  data : function (){
		return {
			imageSrc : "UA_flag.svg",
			isLoginModal : false,
      isSettingModal : false
		}
  },
  methods : {
		...mapMutations(['setLoggedUserInfo', 'setLoggedUserCredentials']),
		onSelectChange(event){
			switch (event.target.value){
				case "English":
					this.imageSrc = "USA_flag.svg"
					break;
				case "Ukrainian":
					this.imageSrc = "UA_flag.svg"
					break;
			}
		},
		showLogInModal(){
			this.isLoginModal = true;
		},
    showSettingModal(){
      this.isSettingModal = true;
    },
		closeModal(){
			this.isLoginModal = false;
      this.isSettingModal = false
		},
		logOut(){
			this.setLoggedUserInfo(null)
			this.setLoggedUserCredentials(null);
		}
  },
	computed : {
		...mapGetters(['getUser', 'isAuth']),
		userName(){
			return this.getUser.full_name
		},
		userOrganization(){
			return "Some organization"
		}
	}
}
</script>

<style scoped>

</style>
