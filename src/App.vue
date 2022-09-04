<script setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import GoogleMap from "./components/MapComponents/GoogleMap.vue";
import PhotoViewerModal from "./components/PhotoViewerModal.vue";

</script>

<template>
  <div class="h-full">
	<Header/>
	<div class="flex h-[calc(100vh-64px)]">
	  <div class="basis-4/12 h-full">
	  	<SideBar/>
	  </div>
	  <div class="basis-8/12">
	  	<GoogleMap/>
	  </div>
	</div>
	<PhotoViewerModal :isVisible=true />
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
