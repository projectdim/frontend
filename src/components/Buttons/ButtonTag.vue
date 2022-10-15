<template>
	<button class="p-2
    text-center align-middle rounded-lg
    text-overview-item font-medium
    screen-475:text-overview-item-mobile
    screen-949:text-overview-item-mobile border bg-transparent
    hover:bg-gray-light-100"
		:class="{
			'border-gray-light-200' : buttonState === 'default',
			'border-green-c-200 text-green-c-500' : buttonState === 'positive',
			'border-red-c-200 text-red-c-500' : buttonState === 'negative',
			'border-gray-light-200 text-gray-light-400' : buttonState === 'inactive',
			'border-gray-light-500 text-gray-light-800' : buttonState === 'no-data',
		}">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "ButtonTag",
	props : {
		buttonState : {
			type: String,
			default: "default",
			validator: function (value) {
				return ["default", "positive", "negative", "inactive", "no-data"].includes(value)
			}
		}
	}
}
</script>

<style scoped>

</style>