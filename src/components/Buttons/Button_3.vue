<template>
  <button class="text-gray-light-600 p-2
    text-center align-middle rounded-lg
    text-overview-item font-medium
    screen-475:text-overview-item-mobile
    screen-949:text-overview-item-mobile
    bg-gray-light-200
    hover:text-gray-light-500
    disabled:text-gray-light-400
    active:text-gray-light-600
    active:bg-gray-light-300
    ">
		<slot></slot>
  </button>
</template>

<script>
export default {
  name : "button-3",
}
</script>

<style scoped>

</style>
