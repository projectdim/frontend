<template>
  <button class="text-white p-2
    text-center align-middle rounded-lg
    text-overview-item font-medium
    screen-475:text-overview-item-mobile
    screen-949:text-overview-item-mobile
    bg-blue-c-500
    hover:bg-blue-c-400
    disabled:bg-gray-c-200
    disabled:text-gray-c-400
    active:bg-blue-c-600
    ">
		<slot></slot>
  </button>
</template>

<script>
export default {
  name : "button-1",
}
</script>

<style scoped>

</style>
