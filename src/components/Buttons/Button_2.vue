<template>
  <button class="border
    border-blue-c-500 bg-white
    text-blue-c-500 p-2
    text-center align-middle rounded-lg
    text-overview-item font-medium
    screen-475:text-overview-item-mobile
    screen-949:text-overview-item-mobile
    hover:text-blue-c-400
    hover:border-blue-c-400
    disabled:text-gray-light-300
    disabled:border-gray-light-300
    active:text-blue-c-600
    active:border-blue-c-600
    ">
		<slot></slot>
  </button>
</template>

<script>
export default {
  name : "button-2",
}
</script>

<style scoped>

</style>
