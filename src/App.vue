<script setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import GoogleMap from "./components/MapComponents/GoogleMap.vue";

</script>

<template>
  <div>
	<Header/>
	<div class="grid grid-cols-4">
	  <div class="col-start-1 col-end-1">
	  	<SideBar/>
	  </div>
	  <div class="col-span-3">
	  	<GoogleMap/>
	  </div>
	</div>
  </div>

</template>

<script>
	export default {
	  methods :{
		  Foo(message){
			this.msg = "NE qwerty " + message;
		  }
		},
	  data : function() {
		  return {
			msg : "qwerty"
		  }
	  }
	}
</script>

<style scoped>

</style>
