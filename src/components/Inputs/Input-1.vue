<template>
	<input type="text" class="input-1" :value="modelValue" @input="updateInput">
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
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .input-1 {
    @apply border border-gray-c-300 font-normal
    rounded-lg outline-none text-h3 px-4 py-2
    hover:border-blue-c-400 focus:border-blue-c-500
    disabled:bg-gray-c-100 disabled:hover:border-gray-c-300
    disabled:text-gray-c-500
  }
}

</style>
