<template>
  	<header class="w-full h-16 flex flex-nowrap place-content-between px-[24px] shadow-2cs
			bg-white">
	  	<div class="cursor-pointer my-auto">
	  		<img src="../assets/Logo.svg" alt="" class="h-10 w-36">
	  	</div>

		<div class="flex font-medium text-blue">
		  	<img v-bind:src="'./Flags/'+this.imageSrc" class="h-[18px] w-[24px] my-auto" alt="Flag">
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

</style>