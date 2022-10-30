<template>
 <Header :is-show-setting="isSettingModalVisible" v-on:settingClose="hideSettings"/>
	<div class="flex h-[calc(100vh-62px)]
	  	screen-950:h-[calc(100vh-74px)]
	  	screen-475:overflow-y-auto
			screen-949:overflow-y-auto">
		<div class="shrink-0 screen-950:w-[320px] shadow-cs1">

			<div class="w-full h-[200px] flex flex-col gap-2 place-items-center place-content-center
				shadow-cs2">
				<div class="w-[60px] h-[60px] rounded-full bg-blue-c-100 px-5 py-3">
					<img class="w-full h-full" src="src/assets/Organizations/Emblem.svg">
				</div>
				<p class="w-min text-overview-item text-gray-c-600 font-semibold">
					Адміністратор
				</p>
			</div>

			<div class="font-semibold text-blue-c-500">
				<div class="hover:bg-blue-c-100 p-1 w-full cursor-pointer h-[58px] flex gap-4
				items-center px-10">
					<img  src="/src/assets/Organizations/List.svg"
								class="h-5 w-5 block">
					<p class="h-min">Організації</p>
				</div>

				<div class="hover:bg-blue-c-100 p-1 w-full cursor-pointer h-[58px] flex gap-4
				items-center px-10" @click="showSettings">
					<img  src="/src/assets/Settings.svg"
								class="h-5 w-5 block">
					<p class="h-min">Налаштування</p>
				</div>

			</div>
 		</div>
		<div class="w-full">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Header from "../Header.vue";
export default {
	name: "MainPlatformAdministration",
	components : {
		Header
	},
	data(){
		return{
			isSettingModalVisible : false
		}
	},
	methods : {
		showSettings(){
			// Тупо, але так треба, бо потрібно затрігерити
			// watch в Header при повторному присвоєні true
			this.isSettingModalVisible = true;
		},
		hideSettings(value){
			this.isSettingModalVisible = value;
		}
	}
}
</script>

<style scoped>

</style>