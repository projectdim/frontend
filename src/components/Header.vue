<template>
  	<header class="w-full
  	screen-475:h-[62px]
  	screen-949:h-[62px]
  	screen-950:h-[74px]
  	screen-475:px-4 screen-475:py-2.5
  	screen-949:px-4 screen-949:py-2.5
  	screen-950:px-2.5 screen-950:py-0
  	shadow-2cs flex flex-nowrap place-content-between bg-white">
	  	<div class="cursor-pointer h-min my-auto">
	  		<img src="../assets/Logo.svg" alt="" class="block
	  		screen-475:h-6 screen-475:w-[88px]
	  		screen-949:h-6 screen-949:w-[88px]
	  		screen-950:h-10 screen-950:w-[148px]
	  		w-[147px]">
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
			<button-text-1 class="h-min my-auto
				screen-950:ml-[37px] screen-950:ml-[25px]" role="link"
				@click="showLogInModal"
			>
				LogIn
			</button-text-1>
		</div>
			<LoginModal :is-modal-visible="isModal"
									:close-func="closeModal">
			</LoginModal>
		</header>
</template>

<script>
import LoginModal from "./Modals/LoginModal.vue";
export default {
  name: "Header",
	components: {
		LoginModal
	},
	data : function (){
		return {
			imageSrc : "UA_flag.svg",
			isModal : false
		}
  },
  methods : {
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
			this.isModal = true;
		},
		closeModal(){
			this.isModal = false;
		}
  },

}
</script>

<style scoped>

</style>
