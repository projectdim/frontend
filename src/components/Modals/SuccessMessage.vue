<template>
	<ModalTemplate class-list="grid place-items-center screen-475:px-6"
								 :closeFunc="closeFunc"
								 :isModalVisible="isVisible"
								 :isHideOnClick="hideOnBgClick">
		<div class="bg-white rounded-lg p-6 w-[480px]
		screen-475:w-full relative" @click.stop>
			<img src="/src/assets/close.svg" class="absolute top-6 right-6 cursor-pointer"
					 @click="closeFunc">
			<img src="/src/assets/Completed.svg" class="mx-auto">
			<p class="text-h2 text-center mt-5 font-semibold text-green-c-500">
				{{ message }}
			</p>
		</div>
	</ModalTemplate>
</template>

<script>
export default {
	name: "SuccessMessage",
	props : {
		isVisible : {
			type : Boolean,
			default: false
		},
		message : String,
		closeFunc : {
			type : Function,
		},
		closeTimeout : {
			type : Number,
			default : 0
		},
		hideOnBgClick : {
			type : Boolean,
			default : false
		}
	},
	updated() {
		if(this.closeTimeout>0){
			setTimeout(this.closeFunc, this.closeTimeout)
		}
	}
}
</script>

<style scoped>

</style>