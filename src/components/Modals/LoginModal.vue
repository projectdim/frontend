<template>
	<teleport to="body">
		<div v-if="isModalVisible" class="overflow-y-hidden z-50 h-screen w-screen bg-black/30 absolute top-0
				screen-475:px-2 grid place-items-center"
				 @click="hide">
        <div v-if="isModalVisible" class="mx-auto rounded-xl p-6 w-[480px] screen-475:w-full
          h-[320px] bg-white animate-appear"
          :class="{'animate-disappear' : isClosedClick}"
        @click.stop>
          <div class="text-sidebar-title font-semibold relative py-1 text-center
            screen-475:text-sidebar-title-mobile screen-949:text-sidebar-title-mobile">
            Вхід
            <button class="absolute top-0 right-0 h-4 w-4 i-can-close-it"
                    @click="hide">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="#1D2229"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="black" fill-opacity="0.2"/>
              </svg>
            </button>
            <div>
              <Input-1 class="w-full my-6" placeholder="Email" v-model="email"/>
              <Input-pass class="w-full" v-model="pass"/>
              <button-text-1 class="font-semibold block my-3">
                Відновити пароль...
              </button-text-1>
              <button-1 class="block w-full" :disabled="isButtonDisabled" @click="login">
                Увійти
              </button-1>
            </div>
          </div>
        </div>
		</div>
	</teleport>
</template>
<script>
export default {
	name: "LoginModal",
	props : {
		isModalVisible : {
			type : Boolean,
			default : false,
		},
		closeFunc : {
			type : Function,
			required : true
		}
	},
	data(){
		return {
			email : "",
			pass : "",
      isClosedClick : false
		}
	},
	methods : {
		hide(){
      this.isClosedClick = true;
      setTimeout( ()=> {
        this.isClosedClick = false;
        this.closeFunc();
      }, 400);
		},
    login(){
      if(!this.isButtonDisabled){

      }
    }
	},
	computed : {
		isButtonDisabled(){
			return this.email.length <= 0 || this.pass.length <= 0;
		}
	},
}
</script>

<style scoped>

</style>
