<template>
	<GMapMarker
		:key="key"
		:draggable="false"
		:position= "{lat: 51.093048, lng: 6.842120}"
		:icon = this.URLicon
	/>
</template>

<script>
export default {
  name: "MapMarker",
  props :{
	key : String,
	lat: Number,
	lng: Number,
  },
  data : function (){
	return{
	  URLicon: "./public/vite.svg"
	}
  }
}
</script>

<style scoped>

</style>