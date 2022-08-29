<template>
  	<header class="w-full h-74 flex flex-nowrap place-content-between px-[24px] py-[16px] custom-shadow
			bg-white">
	  	<div class="cursor-pointer w-min">
	  		<img src="../assets/Logo.svg" alt="" class="min-w-[100px]">
	  	</div>

		<div class="flex font-medium text-blue">
		  	<img v-bind:src="'./public/Flags/'+this.imageSrc" class="h-[18px] w-[24px] my-auto" alt="Flag">
			<select name="lang-selector" id="lang-selector"
					class="h-min my-auto bg-transparent ml-[5px] text-right"
			@change="onSelectChange">
			  <option value="English">English</option>
			  <option value="Ukrainian">Ukrainian</option>
			</select>
		  	<p class="ml-[25px] h-min my-auto">
			  Log in
			</p>
		</div>
	</header>
</template>

<script>
export default {
  name: "Header",
  data : function (){
	return {
	  imageSrc : "USA_flag.svg"
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
	.custom-shadow{
	  box-shadow: 0px 1px 0px rgba(197, 208, 227, 0.4);
	}
</style>