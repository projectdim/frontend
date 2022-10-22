<template>
	<div class="bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2
				text-ellipsis overflow-hidden relative leading-[26px] w-full"
				:class="{'h-[40px] pr-[70px]': !isExpanded}">

				<button class="absolute text-blue-500 right-2 top-2 font-medium"
								:class="{'hidden' : isExpanded}"
					@click="Expand">
						Деталі
				</button>

		<div class="break-words">
			<slot></slot>
		</div>
		<div class="text-blue-500 text-center p-1 font-medium"
				 :class="{'hidden' : !isExpanded}">
			<button @click="Minimize">
				Закрити
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Expander",
	props : {
		defaultHeight : {
			type : Number,
			default : 40
		}
	},
	data() {
		return {
			isExpanded : false
		}
	},
	methods : {
		Expand(){
			this.isExpanded = true;
		},
		Minimize(){
			this.isExpanded = false;
		}
	},
	computed : {
		targetHeightClass(){
			let c = `h-[${this.defaultHeight}px]`;
			return { [c] : !this.isExpanded }
		}
	}
}
</script>

<style scoped>

</style>