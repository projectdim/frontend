<template>
  	<header class="w-full h-[74px] flex flex-nowrap place-content-between px-[24px] shadow-2cs
			bg-white">
	  	<div class="cursor-pointer ">
	  		<img src="../assets/Logo.svg" alt="" class="my-[17px] block h-10 w-[147px]">
	  	</div>

		<div class="flex font-medium text-base-blue py-[16px]">
		  	<img v-bind:src="'./Flags/'+this.imageSrc" class="h-[18px] w-[24px] my-auto" alt="Flag">
				<select name="lang-selector" id="lang-selector"
					class="h-min my-auto bg-transparent ml-[5px] text-right"
					@change="onSelectChange">
        	<option value="Ukrainian">Українська</option>
			  	<option value="English">English</option>
				</select>
		  	<p class="ml-[37px] h-min my-auto">
			  Увійти
			</p>
		</div>
	</header>
</template>

<script>
export default {
  name: "Header",
  data : function (){
	return {
	  imageSrc : "UA_flag.svg"
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
	}
  }
}
</script>

<style scoped>

</style>
