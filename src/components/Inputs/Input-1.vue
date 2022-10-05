<template>
	<input type="text" class="border border-gray-light-300 font-normal
							rounded-lg outline-none text-overview-item px-4 py-2
							hover:border-blue-c-400 focus:border-blue-c-500
							disabled:bg-gray-light-100 disabled:hover:border-gray-light-300
							disabled:text-gray-light-500" :value="modelValue" @input="updateInput">
</template>

<script>
export default {
	name: "Input-1",
	props : {
		modelValue : [String, Number]
	},
	methods : {
		updateInput(event){
			this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>

<style scoped>

</style>