<template>
	<h1 class="w-full py-2 text-2xl text-center">Welcome to test screen</h1>
	<button-text-1 @click="Test1">
		Test
	</button-text-1>
	<button-text-1 @click="Test2">
		ShowModal
	</button-text-1>
  <div>{{mess}}</div>

	<SendReportRequestModal :is-modal-visible="modalVisible" :close-func="HideModal"/>

</template>

<script>
import RemoveOrgModal from "./PlatformAdministration/RemoveOrgModal.vue";
import LocalizationDropDown from "./Other/LocalizationDropDown.vue";
import SendReportRequestModal from "./Modals/SendReportRequestModal.vue";
export default {
  name: "Test",
	components: {SendReportRequestModal, LocalizationDropDown, RemoveOrgModal},
  data(){
    return {
      mess : "Message",
			modalVisible : true
    }
  },
	methods : {
		Test1(){
     this.$toast.success("Привіт, Льоша!!!", {
       onClose : ()=>{this.changeMessage()}
     });
		},
		Test2(){
			this.modalVisible = true;
    },
		HideModal(){
			this.modalVisible = false;
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
