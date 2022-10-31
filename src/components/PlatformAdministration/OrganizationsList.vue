<template>
	<div class="p-9">
		<h1 class="font-semibold text-gray-c-800 text-h1">
			Організації
		</h1>

		<div v-if="organizationsList.length<=0" class="mt-[215px]">
			<img class="w-[205px] h-[234px] screen-475:w-[157px] screen-475:h-[179px] mx-auto" src="/src/assets/Organizations/Picture.png">
			<p class="text-body-1 text-center mt-5 mb-6">Список порожній</p>
			<button1 class="block mx-auto flex items-center">
				<img src="/src/assets/plus.svg" class="inline-block mr-2.5">
				<p>Додати організацію</p>
			</button1>
		</div>

		<div v-else class="mt-9">
			<div class="flex justify-start gap-3">
				<div class="border font-normal
							rounded-lg outline-none text-h3
							hover:border-blue-c-400 focus:border-blue-c-500
							disabled:bg-gray-c-100 disabled:hover:border-gray-c-300
							disabled:text-gray-c-500 flex overflow-hidden px-5 flex items-center min-w-[400px]"
						 :class="{'border-blue-c-500' : isInputFocused,
						 					'border-gray-c-300' : !isInputFocused}"
						 @focusin="OnDivFocus(true)"
						 @focusout="OnDivFocus(false)">

					<svg class="fill-gray-c-500" width="18" height="18" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z" fill-opacity="0.2"/>
					</svg>


					<input ref="inp" class="w-full outline-none px-4 py-2 bg-transparent"
								 @focusin="OnInputFocus(true)"
								 @focusout="OnInputFocus(false)"
								 placeholder="Пошук організації. Від 3 символів..."
					/>
				</div>

				<button1 class="block flex items-center">
					<img src="/src/assets/plus.svg" class="inline-block mr-2.5">
					<p>Додати організацію</p>
				</button1>

			</div>

			<div>

			</div>

		</div>
	</div>
</template>

<script>
import Button1 from "../Buttons/Button_1.vue";
export default {
	name: "OrganizationsList",
	components: {Button1},
	data () {
		return{
			organizationsList : [{},{}],
			//organizationsList : [],
			isInputFocused : false
		}
	},
	methods : {
		OnInputFocus(value){
			this.isInputFocused = value;
		},
		OnDivFocus(arg){
			this.isInputFocused = arg;
			if(arg)
				this.$refs.inp.focus();
		},
	}

}
</script>

<style scoped>

</style>