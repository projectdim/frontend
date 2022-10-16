<template>
  <button class="text-blue-c-500 p-2
    text-center align-middle rounded-lg
    text-overview-item font-medium
    screen-475:text-overview-item-mobile
    screen-949:text-overview-item-mobile
    bg-transparent
    hover:bg-blue-c-100
    active:bg-blue-c-200
    disabled:bg-gray-c-100
    disabled:text-gray-c-400
    ">
		<slot></slot>
  </button>
</template>

<script>
export default {
  name : "button-text-1",
  props : {
    value : {
      default : "Button Text 1"
    }
  }
}
</script>

<style scoped>

</style>
