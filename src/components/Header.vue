<template>
  	<header class="w-full
  	screen-475:h-[62px]
  	screen-949:h-[62px]
  	screen-950:h-[74px]
  	screen-475:px-4 screen-475:py-2.5
  	screen-949:px-4 screen-949:py-2.5
  	screen-950:px-2.5 screen-950:py-0
  	screen-475:sticky screen-475:top-0
  	shadow-cs2 bg-white z-[1000] flex align-baseline gap-3 screen-475:justify-between">

			<div class="w-min h-full place-content-center hidden screen-475:grid">
				<div class="w-6 h-5 py-1" @click="toggleMenu">
					<div class="bg-black w-full h-0.5 rounded-xl"></div>
					<div class="bg-black w-full h-0.5 rounded-xl my-1"></div>
					<div class="bg-black w-full h-0.5 rounded-xl"></div>
				</div>
			</div>
<!--			<div v-else class="hidden screen-475:grid content-center">
				<img src="/src/assets/Logo.svg" alt="" class="block
							screen-475:h-6
							screen-949:h-6
							screen-950:h-10
							w-auto">
			</div>-->
			<div class="hidden absolute top-[62px] left-0 screen-475:h-[calc(100vh-62px)] w-full bg-black/30"
					 :class="{	'screen-475:block' : isMenuVisibleOnMobile,
											'screen-475:hidden' : !isMenuVisibleOnMobile}"
					 @click="toggleMenu"
				></div>

			<div class="flex flex-nowrap h-full align-baseline justify-between bg-white grow
				screen-475:flex-col screen-475:absolute screen-475:h-[calc(100vh-62px)]
				screen-475:top-[62px] screen-475:w-[300px] screen-475:shadow-inner
				screen-475:justify-start screen-475:gap-3 screen-475:transition-[left] screen-475:duration-200"
				:class="{	'screen-475:left-0' : isMenuVisibleOnMobile,
									'screen-475:left-[-300px]' : !isMenuVisibleOnMobile}">

					<div class="cursor-pointer h-min my-auto screen-475:my-0
								screen-475:h-[76px] screen-475:p-4 screen-475:shadow-cs2
								screen-475:grid screen-475:content-center"
							 @click="goToMain">
						<div v-if="isAuth" class="flex text-overview-item-mobile items-center">
							<img src="/src/assets/Logo_2.svg" class="
							screen-475:h-6
							screen-949:h-6
							h-10 w-auto mr-4 screen-475:hidden">
							<img src="/src/assets/User.svg" class="h-6 w-auto screen-475:block hidden mr-3.5">
							<div>
								<p class="font-semibold">
									<img src="/src/assets/User.svg" class="h-4 w-auto inline screen-475:hidden">
									{{ userName }}
								</p>
								<p class="text-gray-c-500">
									{{ userOrganization }}
								</p>
							</div>
						</div>
						<div v-else>
							<img src="/src/assets/Logo.svg" alt="" class="block
							screen-475:h-6
							screen-949:h-6
							screen-950:h-10
							w-auto">
						</div>
					</div>

					<div class="flex screen-475:flex-col font-medium text-blue-c-500
								screen-950:p-2
								text-overview-item">

						<div class="flex screen-475:order-3 screen-475:rounded-none
							screen-475:px-4 screen-475:w-full
							screen-475:h-[58px]">
							<img v-bind:src="'/Flags/'+this.imageSrc"
									 class="h-[18px] w-[24px] my-auto" alt="Flag">

							<select name="lang-selector" id="lang-selector"
											class="h-min my-auto bg-transparent ml-[5px] text-right
											cursor-pointer"
											@change="onSelectChange">
								<option value="Ukrainian">Українська</option>
								<option value="English">English</option>
							</select>
						</div>

						<div v-if="isAuth" class="h-full flex items-center gap-x-6
							screen-475:gap-x-1 ml-7 screen-475:ml-0 screen-475:flex-col">

							<div class="hover:bg-blue-c-200 rounded-lg p-1 screen-475:w-full cursor-pointer
							screen-475:h-[58px] flex gap-4 items-center screen-475:rounded-none screen-475:px-4" @click="showSettingModal">
								<img  src="/src/assets/Settings.svg"
										 class="h-6 w-auto  block">
								<p class="h-min hidden screen-475:block">Налаштування</p>
							</div>

							<div class="hover:bg-blue-c-200 rounded-lg p-1 cursor-pointer screen-475:w-full
							screen-475:h-[58px] flex gap-4 items-center screen-475:rounded-none screen-475:px-4"
							@click="goToRequests">
									<div class="relative">
										<div class="absolute bg-red-c-500 rounded-[32px] py-0.5 px-1 font-semibold
											text-body-3 text-white top-[-15px] right-[-5px] h-6 w-[22px] text-center">
											15
										</div>
										<img src="/src/assets/Aid-worker-actions.svg" class="h-6 w-auto ">
									</div>
									<p class="h-min hidden screen-475:block">Запити</p>
							</div>
						</div>
					</div>
				</div>



			<button-text-1 v-if="!isAuth" class="h-min my-auto" role="link"
										 @click="showLogInModal">
				LogIn
			</button-text-1>
			<button-text1 @click="logOut" v-if="isAuth" class="h-min my-auto">
				LogOut
			</button-text1>


<!--			#region Modals-->
			<LoginModal :is-modal-visible="isLoginModal"
									:close-func="closeModal">
			</LoginModal>
      <UserSetting :is-setting-visible="isSettingModal" v-if="isAuth"
				@close="closeModal"/>
<!--			#endregion -->
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
      isSettingModal : false,
			isMenuVisibleOnMobile : false
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
			this.isMenuVisibleOnMobile = false;
			this.isLoginModal = true;
		},
    showSettingModal(){
			this.isMenuVisibleOnMobile = false;
      this.isSettingModal = true;
    },
		closeModal(){
			this.isLoginModal = false;
      this.isSettingModal = false
		},
		logOut(){
			this.setLoggedUserInfo(null)
			this.setLoggedUserCredentials(null);
			this.isMenuVisibleOnMobile = false;
		},
		goToMain(){
			this.isMenuVisibleOnMobile = false;
			this.$router.push("/main/overview")
		},
		goToRequests(){
			this.isMenuVisibleOnMobile = false;
			this.$router.push("/main/requests")
		},
		toggleMenu(){
			this.closeModal();
			this.isMenuVisibleOnMobile = !this.isMenuVisibleOnMobile;
		}
  },
	computed : {
		...mapGetters(['getUser', 'isAuth']),
		userName(){
			return this.getUser.username
		},
		userOrganization(){
			return "Some organization"
		}
	},
}
</script>

<style scoped>

</style>
