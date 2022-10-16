<template>
	<button class="py-1 px-2
    text-center align-middle rounded-lg
    text-overview-item font-medium
    screen-475:text-overview-item-mobile
    screen-949:text-overview-item-mobile border bg-transparent
    hover:bg-gray-c-100
 		disabled:border-gray-c-200 disabled:text-gray-c-400"
		:class="{
			'border-gray-c-200' : buttonState === 'default',
			'border-green-c-200 text-green-c-500' : buttonState === 'positive',
			'border-red-c-200 text-red-c-500' : buttonState === 'negative',
			'border-gray-c-500 text-gray-c-800' : buttonState === 'no-data',
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
				return ["default", "positive", "negative", "no-data"].includes(value)
			}
		}
	}
}
</script>
