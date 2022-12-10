<template>
	<h1 class="w-full py-2 text-2xl text-center">Welcome to test screen</h1>
	<button-text-1 @click="Test1">
		Test
	</button-text-1>
	<button-text-1 @click="Test2">
		Test
	</button-text-1>
  <div>{{mess}}</div>
</template>

<script>
import RemoveOrgModal from "./PlatformAdministration/RemoveOrgModal.vue";
import LocalizationDropDown from "./Other/LocalizationDropDown.vue";
export default {
  name: "Test",
	components: {LocalizationDropDown, RemoveOrgModal},
  data(){
    return {
      mess : "Message"
    }
  },
	methods : {
		Test1(){
     this.$toast.success("Привіт, Льоша!!!", {
       onClose : ()=>{this.changeMessage()}
     });
		},
		Test2(){
			/*this.$toast.error("Error",
				{
					isCloseOnBg: true,
					timer : 2000
				})*/
      //this.$toast.clear()
    },
    close(){
      this.$toast.clear();
    },
    changeMessage(){
      this.mess = "qwertyyyyy"
    }
	},
}
</script>

<style>
.fade-enter-active {
  transition: all, 2s, ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
