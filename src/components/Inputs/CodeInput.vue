<template>
	<div class="flex flex-nowrap gap-4">
		<input v-for="n in digitAmount" class="input-1 text-center" placeholder="X"
					 :ref="`inp${n-1}`" @input="OnInput( n-1)"
		/>
	</div>
</template>

<script>
export default {
	name: "CodeInput",
	props : {
		digitAmount : {
			type : Number,
			required  : true
		}
	},
	data(){
		return {
			code : ""
		}
	},
	methods : {
		OnInput(inputIndex){
			let r = `inp${inputIndex}`
			console.log(this.$refs[r])
			/*input.value = input.value[input.value.length-1]
			this.code[inputIndex] = input.value;
			this.$emit("update:modelValue", this.code);*/
		},
		moveToNextInp(inpIndex){

		}
	}
}
</script>

<style scoped>

</style>