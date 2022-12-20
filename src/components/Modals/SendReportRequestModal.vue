<template>
	<teleport to="body">
		<div id="loginModal" v-if="isModalVisible" class="overflow-y-hidden z-[1050] h-screen w-screen bg-black/30 fixed top-0 left-0 right-0 bottom-0
				mobile:px-2 grid place-items-center">
			<div class="mx-auto rounded-xl p-6 w-[500px] mobile:w-full
          h-min bg-white animate-appear relative overflow-hidden flex"
					 :class="{'animate-disappear' : isClosedClick}"
					 @click.stop>
				<button class="absolute top-6 right-6 h-4 w-4"
								@click="hide">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="#1D2229"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="black" fill-opacity="0.2"/>
					</svg>
				</button>
				<transition name="modal-anim" mode="out-in">
					<div v-if="step === steps.numEnter" class="w-full text-center">
						<div class="text-body-2  font-semibold">
							Enter number
						</div>
						<div class="text-body-1 mt-2 text-gray-c-600">
							Please leave your phone number to confirm
							your request
						</div>
						<input-1 @focusin="telInpFocus" class="my-6" type="tel" placeholder="+380-XX-XXX-XX-XX"
										v-model="telNum"
						/>
						<button-1 class="w-full" @click="sendCode">
							Get Code
						</button-1>
					</div>
					<div v-else-if="step === steps.codeEnter" class="w-full text-center">
						<div class="text-body-2  font-semibold">
							Enter code
						</div>
						<div class="text-body-1 mt-2 text-gray-c-600">
							Please enter 6-digits code that we send to {{ telNum }}
						</div>
						<CodeInput class="w-full my-6" :digit-amount="6" v-model="code"/>
						<button-1 class="w-full">
							Send Code
						</button-1>
					</div>
				</transition>
				<Loader v-if="isLoaderVisible"></Loader>
			</div>
		</div>
	</teleport>
</template>

<script>
import Input1 from "../Inputs/Input-1.vue";
import Button2 from "../Buttons/Button_2.vue";
import CodeInput from "../Inputs/CodeInput.vue";
export default {
	name: "SendReportRequestModal",
	components: {CodeInput, Button2, Input1},
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
			isClosedClick : false,
			isLoaderVisible : false,
			telNum : "",
			code : "",
			step : "numEnter",
			steps : {
				numEnter : "numEnter",
				codeEnter : "codeEnter",
 			}
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
		telInpFocus(){
			if(this.telNum.length===0)
				this.telNum = "+380-"
		},
		//TODO send code
		sendCode(){
			//in callback
			this.step = this.steps.codeEnter;
		}
	},
	watch : {
		code(newVal){
			console.log(newVal)
		}
	}
}
</script>

<style scoped>

</style>