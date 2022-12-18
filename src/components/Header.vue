<template>
  	<header class="w-full
  	mobile:h-[62px]
  	tablet:h-[62px]
  	comp:h-[74px]
  	mobile:px-4 mobile:py-2.5
  	tablet:px-4 tablet:py-2.5
  	comp:px-6 comp:py-0
  	mobile:sticky mobile:top-0
  	shadow-cs2 bg-white z-[1000] flex items-center gap-3 mobile:justify-between">

			<div class="w-min h-full place-content-center hidden mobile:grid">
				<div class="w-6 h-5 py-1" @click="toggleMenu">
					<div class="bg-black w-full h-0.5 rounded-xl"></div>
					<div class="bg-black w-full h-0.5 rounded-xl my-1"></div>
					<div class="bg-black w-full h-0.5 rounded-xl"></div>
				</div>
			</div>
			<div class="hidden absolute top-[62px] left-0 mobile:h-[calc(100vh-62px)] w-full bg-black/30"
					 :class="{	'mobile:block' : isMenuVisibleOnMobile,
											'mobile:hidden' : !isMenuVisibleOnMobile}"
					 @click="toggleMenu"
				></div>

			<div class="flex flex-nowrap h-full justify-between bg-white grow
				mobile:flex-col mobile:absolute mobile:h-[calc(100vh-62px)]
				mobile:top-[62px] mobile:w-[300px] mobile:shadow-inner
				mobile:justify-start mobile:gap-3 mobile:transition-[left] mobile:duration-200"
				:class="{	'mobile:left-0' : isMenuVisibleOnMobile,
									'mobile:left-[-300px]' : !isMenuVisibleOnMobile}">

					<div class="cursor-pointer h-min my-auto mobile:my-0
								mobile:h-[76px] mobile:p-4 mobile:shadow-cs2
								mobile:grid mobile:content-center"
							 @click="goToMain">
						<div v-if="isAuth" class="flex text-h4 items-center">
							<img src="/src/assets/Logo_2.svg" class="
							mobile:h-6
							tablet:h-6
							h-10 w-auto mr-4 mobile:hidden">
							<img :src="currentUserIconLink" class="h-6 w-auto mobile:block hidden mr-3.5">
							<div>
								<p class="font-semibold">
									<img :src="currentUserIconLink" class="h-4 w-auto inline mobile:hidden">
									{{ userName }}
								</p>
								<p class="text-gray-c-500">
									{{ userOrganization }}
								</p>
							</div>
						</div>
						<div v-else>
							<img src="/src/assets/Logo.svg" alt="" class="block
							mobile:h-6
							tablet:h-6
							comp:h-10
							w-auto">
						</div>
					</div>

					<div class="flex mobile:flex-col font-medium text-blue-c-500
								comp:p-2
								text-h3">

						<LocalizationDropDown id="langDrop" class="w-[150px] mobile:order-3
							mobile:px-4 mobile:w-full
							h-full
							mobile:h-[58px]"/>

						<div v-if="isAuth" class="flex items-center gap-x-6
							mobile:gap-x-1 ml-7 mobile:ml-0 mobile:flex-col-reverse">

							<div class="menu-item menu-item-mobile" id="settings" @click="showSettingModal">
								<img  src="/src/assets/Settings.svg"
										 class="h-6 w-auto  block">
								<p class="h-min hidden mobile:block">Налаштування</p>
							</div>

							<div class="menu-item menu-item-mobile relative"
							@click="goToRequests">
								<div v-if="RequestsCount>0" class="absolute bg-red-c-500 rounded-[32px] py-0.5 px-1 font-semibold
									text-b3 text-white top-[-15px] right-[-5px] h-6 min-w-[22px] w-min text-center
									mobile:static mobile:order-3">
									{{ RequestsCount }}
								</div>
								<img src="/src/assets/Aid-worker-actions.svg" class="h-6 w-auto ">
								<p class="h-min hidden mobile:block mobile:grow">Запити</p>
							</div>

							<button @click="goToOrgList" class="w-full h-[58px] gap-4
							items-center px-4 hidden mobile:flex hover:bg-blue-c-200"
													 v-if="isPlatformAdmin">
								<div class="relative">
									<img src="/src/assets/Organizations/List.svg" class="h-4 ml-1 w-auto ">
								</div>
								<p class="h-min hidden mobile:block">Організації</p>
							</button>

						</div>
					</div>
				</div>

			<div class="flex flex-nowrap gap-3">
				<div class="h-min font-medium text-gray-c-600" v-if="this.isPlatformAdmin">
					<router-link to="/main">
						<button class="px-3 py-2 rounded-l-lg border"
							:class="{'border-blue-c-500 bg-blue-c-500 text-white' : !isAdminPage,
												'border-gray-c-300' : isAdminPage}">

							<svg class="mobile:inline hidden" width="20" height="20" viewBox="0 0 20 20"
									 :class="{'fill-white' : !isAdminPage,
												'fill-gray-c-600' : isAdminPage}">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58471 0.188765C7.84548 0.376716 8 0.678564 8 1.00001V17C8 17.4304 7.72457 17.8126 7.31623 17.9487L1.31623 19.9487C1.01128 20.0503 0.676058 19.9992 0.41529 19.8113C0.154521 19.6233 0 19.3215 0 19V3.00001C0 2.56958 0.27543 2.18744 0.683772 2.05132L6.68377 0.051324C6.98872 -0.0503253 7.32394 0.000813857 7.58471 0.188765ZM2 3.72077V17.6126L6 16.2792V2.38743L2 3.72077Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M19.5847 0.188765C19.8455 0.376716 20 0.678564 20 1.00001V17C20 17.4304 19.7246 17.8126 19.3162 17.9487L13.3162 19.9487C13.0113 20.0503 12.6761 19.9992 12.4153 19.8113C12.1545 19.6233 12 19.3215 12 19V3.00001C12 2.56958 12.2754 2.18744 12.6838 2.05132L18.6838 0.051324C18.9887 -0.0503253 19.3239 0.000813857 19.5847 0.188765ZM14 3.72077V17.6126L18 16.2792V2.38743L14 3.72077Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M6.41529 0.188765C6.15452 0.376716 6 0.678564 6 1.00001V17C6 17.4304 6.27543 17.8126 6.68377 17.9487L12.6838 19.9487C12.9887 20.0503 13.3239 19.9992 13.5847 19.8113C13.8455 19.6233 14 19.3215 14 19V3.00001C14 2.56958 13.7246 2.18744 13.3162 2.05132L7.31623 0.051324C7.01128 -0.0503253 6.67606 0.000813857 6.41529 0.188765ZM12 3.72077V17.6126L8 16.2792V2.38743L12 3.72077Z"/>
							</svg>

							<span class="mobile:hidden">
								{{ $t('header.map') }}
							</span>
						</button>
					</router-link>
					<router-link to="/admin">
						<button class="px-3 py-2 rounded-r-lg border"
										:class="{'border-blue-c-500 bg-blue-c-500 text-white' : isAdminPage,
												'border-gray-c-300' : !isAdminPage}">

							<svg class="mobile:inline hidden" width="20" height="20" viewBox="0 0 20 20"
									 :class="{'fill-white' : isAdminPage,
												'fill-gray-c-600' : !isAdminPage}">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.895432 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V19C20 19.5523 19.5523 20 19 20H1C0.447715 20 0 19.5523 0 19V2ZM18 2L2 2V18H18V2Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4.55228 5 5 4.55228 5 4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7.55228 5 8 4.55228 8 4C8 3.44772 7.55228 3 7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3C9.44771 3 9 3.44772 9 4C9 4.55228 9.44771 5 10 5Z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7C0 6.44772 0.447715 6 1 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H1C0.447715 8 0 7.55228 0 7Z"/>
							</svg>

							<span class="mobile:hidden">
								{{ $t('header.dashboard') }}
							</span>
						</button>
					</router-link>
				</div>

				<button-text-1 v-if="!isAuth" id="loginButton" class="my-auto" role="link"
											 @click="showLogInModal">
          {{ $t('header.login') }}
				</button-text-1>
				<button-text1 @click="logOut" v-if="isAuth" id="logoutButton" class="h-min my-auto">
          {{ $t('header.logout') }}
				</button-text1>
			</div>


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
import { mapActions, mapGetters, mapMutations } from "vuex";
import ButtonText1 from "./Buttons/Button_text_1.vue";
import userRoles from "./mixins/userRoles.js";
import LocalizationDropDown from "./Other/LocalizationDropDown.vue";

export default {
  name: "Header",
  components : {
		LocalizationDropDown,
		ButtonText1,
    UserSetting
  },
	emits: ["settingClose"],
	props : {
		isShowSetting : {
			type : Boolean,
			default : false
		}
	},
	mixins: [userRoles],
  data : function (){
		return {
			isLoginModal : false,
      isSettingModal : false,
			isMenuVisibleOnMobile : false
		}
  },
  methods : {
		...mapMutations(['setLoggedUserInfo', 'setLoggedUserCredentials']),
		...mapActions(["getRequestsCount"]),

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
			this.$emit("settingClose", false);
		},
		logOut(){
			this.setLoggedUserInfo(null)
			this.setLoggedUserCredentials(null);
			this.isMenuVisibleOnMobile = false;
			this.$router.push("/welcome")
		},
		goToMain(){
			this.isMenuVisibleOnMobile = false;
			this.$router.push("/main/overview")
		},
		goToRequests(){
			this.getRequestsCount()
			this.isMenuVisibleOnMobile = false;
			this.$router.push("/main/requests")
		},
		goToOrgList(){
			this.isMenuVisibleOnMobile = false;
			this.$router.push("/admin/organizations")
		},
		toggleMenu(){
			this.closeModal();
			this.isMenuVisibleOnMobile = !this.isMenuVisibleOnMobile;
		},

  },
	computed : {
		...mapGetters(['getUser', 'isAuth',
			"getRole", "getUserOrganization", "RequestsCount"]),
		userName(){
			return this.getUser.username
		},
		userOrganization(){
			return this.getUserOrganization.name
		},
		isAdminPage(){
			return this.$route.matched.some(x=>x.path == '/admin');
		},
		currentUserIconLink(){
			switch (this.getRole){
				case this.userRoles.aidWorker:
					return "/userIcons/User.svg";
				case this.userRoles.platformAdmin:
					return "/userIcons/platform-adm.svg";
					break;
				default:
					return "/userIcons/User.svg";

			}
		},
		isPlatformAdmin(){
			return this.isAuth && this.getRole===this.userRoles.platformAdmin
		}
	},
	watch : {
		isShowSetting : function (newValue){
			if(newValue===true)
				this.showSettingModal();
		}
	},
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.menu-item{
	@apply hover:bg-blue-c-200 rounded-lg p-1  cursor-pointer
	 flex gap-4 items-center
}
.menu-item-mobile{
	@apply mobile:rounded-none mobile:px-4 mobile:h-[58px] mobile:w-full
}
</style>
