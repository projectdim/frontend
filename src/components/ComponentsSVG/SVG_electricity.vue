<template>

</template>

<script>
export default {
	name: "SVG_electricity",
	props : {
		class : String,
		width : Number,
		height : Number
	},
	data : function (){
		return{
			defaultData : {
				width : 16,
				height : 21
			}
		}
	},
	computed : {
		viewBox () {
			let w = this.width > 0 ? this.width : this.defaultData.width
			let h = this.height > 0 ? this.width : this.defaultData.height
			return `0 0 ${w} ${h}`;
		}
	}
}
</script>

<style scoped>

</style>