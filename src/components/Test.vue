<template>
	<h1 class="w-full py-2 text-2xl text-center">Welcome to test screen</h1>
	<button-text-1 @click="Test1">
		Test
	</button-text-1>
	<button-text-1 @click="Test2">
		ShowModal
	</button-text-1>

  <user-invite-modal :close-func="HideModal" :is-hide-on-click="true" :is-modal-visible="modalVisible"/>
</template>

<script>

import UserInviteModal from "./Modals/UserInviteModal.vue";
export default {
  name: "Test",
  components: {UserInviteModal},
  data(){
    return {
      mess : "Message",
			modalVisible : true
    }
  },
	methods : {
		Test1(){
			/*let date1 = new Date("2023-01-02T14:10:00Z");
			let dateUTC = new Date(Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(),date1.getMinutes(), date1.getSeconds(), date1.getMilliseconds()))

			let now = new Date("2023-01-02T16:00:00");
			let t = date1 - now;
			console.log(date1)
			console.log(now)
			console.log(`${Math.trunc(t/60000)}:${Math.trunc(t%6000)}`)
			console.log(t)*/
			console.log(new Date("2023-01-02T14:10:00Z"))
			console.log(new Date("2023-01-02T14:10:00"))
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
