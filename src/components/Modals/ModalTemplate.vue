<template>
  <teleport to="body">
    <div v-if="isModalVisible" class="overflow-y-hidden z-50 h-screen w-screen bg-black/30 absolute top-0
			screen-475:px-2"
         :class="classList"
         @click="hide">
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "ModalTemplate",
  props : {
    isModalVisible : {
      type : Boolean,
      default : false,
    },
    closeFunc : {
      type : Function,
      required : true
    },
    classList : {
      type : String
    }
  },
  methods : {
    hide(){
      this.closeFunc();
    },
  },
}
</script>

<style scoped>

</style>


