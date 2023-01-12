<template>
	<vue3-simple-typeahead
		id="typeahead_id"
		placeholder="Start writing..."
		:items="['One','Two','Three','One1','Two2','222Three']"
		:minInputLength="1"
		class="w-3/4 mx-auto"
		>
		<template #list-item-text="slot">
			<span v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></span>
		</template>
	</vue3-simple-typeahead>
	<!--		:itemProjection="itemProjectionFunction"
		@selectItem="selectItemEventHandler"
		@onInput="onInputEventHandler"
		@onFocus="onFocusEventHandler"
		@onBlur="onBlurEventHandler"-->
</template>

<script>
export default {
	name : "InputSuggest",
	data(){
		return {

		}
	}
}
</script>

<style>
@tailwind base;
@tailwind utilities;
@tailwind components;

.simple-typeahead{
	@apply bg-red-c-500
}

.simple-typeahead-input{
	@apply border font-normal
	rounded-lg outline-none text-h3 px-4 py-2
	hover:border-blue-c-400 focus:border-blue-c-500
	disabled:bg-gray-c-100 disabled:hover:border-gray-c-300
	disabled:text-gray-c-500 w-full
}
.simple-typeahead-list{
	@apply absolute left-5 right-5
}
.simple-typeahead-list-item{
	@apply bg-yellow-400 w-full
}
.simple-typeahead-list-item-active{
	@apply bg-blue-c-500
}
</style>