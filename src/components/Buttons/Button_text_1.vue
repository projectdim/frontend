<template>
  <button class="text-blue-c-500 p-2
    text-center align-middle rounded-lg
    text-h3 font-medium
    screen-475:text-h4
    screen-949:text-h4
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
