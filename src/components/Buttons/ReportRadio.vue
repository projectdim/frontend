<template>
  <label class="cursor-pointer" v-for="option in label.options">
    <input type="radio" class="peer sr-only"
           :name="label.name"
           @change="updateModel(option.value)"
           :checked="checkedOp===option.value"
    >
    <div class="py-1 px-2 text-center align-middle rounded-lg text-h3 font-medium mobile:text-h4 tablet:text-h4 border
     bg-transparent hover:bg-gray-c-10 disabled:border-gray-c-200 disabled:text-gray-c-400"
         :class="option.class">
      {{ $t(`reportTools.${option.i18n}`) }}
    </div>
  </label>
</template>

<script>
export default {
  name: "ReportRadio",
  props: {
    label: Object,
    checkedOp : String
  },
  methods: {
    updateModel (option) {
      this.$emit('update:modelValue', option)
    }
  }
}
</script>

<style scoped>

</style>
