<template>
	<div>
		<input @focusin="onFocus" @focusout="onLeave" @invalid="validate"
					 type="text" class="input-1" :value="modelValue" @input="updateInput" :placeholder="placeholder"
		:class="validationStyle" :disabled="disabled">
		<div v-if="!isValidStyle && validationMessage" class="text-red-c-500 text-b3 mt-1">{{validationMessage}}</div>
	</div>
</template>

<script>
import regex from "../mixins/regex.js";

export default {
	name: "Input-1",
	mixins : [regex],
	emits : ["validation"],
	props : {
		modelValue : [String, Number],
		validationType : {
			type : String,
			validator(value) {
				return ["mail", "name"].includes(value);
			}
		},
		validationMessage : {
			type : String,
			default : "Поле не валідне"
		},
		placeholder : String,
		disabled : Boolean

	},
	data () {
		return {
			isValidStyle : true,
		}
	},
	methods : {
		updateInput(event){
			this.$emit('update:modelValue', event.target.value)
		},
		onFocus(){
			this.isValidStyle = true;
		},
		onLeave(){
			this.isValidStyle = this.validate();
		},
		validate(){
			let isValueValid = true;
			if (this.validationType) {
				switch (this.validationType){
					case "mail":
						isValueValid = this.isMail(this.modelValue);
						break;
					case "name":
						isValueValid = this.isName(this.modelValue);
						break;
				}
			}
			if(isValueValid)
				this.isValidStyle = true;
			this.$emit("validation", isValueValid);
			return isValueValid;
		}
	},
	computed : {
		validationStyle(){
			return {
				'border-gray-c-300' : this.isValidStyle,
				'border-red-c-500' : !this.isValidStyle,
			}
		}
	}
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .input-1 {
    @apply border  font-normal
    rounded-lg outline-none text-h3 px-4 py-2
    hover:border-blue-c-400 focus:border-blue-c-500
    disabled:bg-gray-c-100 disabled:hover:border-gray-c-300
    disabled:text-gray-c-500 w-full
  }
}

</style>
