<template>
	<div v-if="isVisible">
		<ModalTemplate :is-modal-visible="isModalVisible" :is-hide-on-click="false"
									 :close-func="closeThisComponent" class-list="grid place-items-center">
			<div class="bg-white w-[480px] rounded-lg relative screen-475:w-full relative p-6 mx-auto max-h-screen overflow-y-auto">
				<button class="absolute top-6 right-6 cursor-pointer"
								@click="closeThisComponent">
					<img src="/src/assets/close.svg">
				</button>
				<div class="text-h2 text-center font-semibold ">
					Видалення організації
					<span class="text-red-c-500 underline">
						"{{organization.name}}"
					</span>
				</div>
				<div class="text-h3 text-gray-c-600 my-2">
					Для видалення введіть:
				</div>
				<div class="text-h3 text-center text-gray-c-800 mt-2 mb-4">
					{{ organization.name }}
				</div>
				<div class="flex flex-col gap-4 mt-4 mb-2">
					<input-1 v-model="inputValue" class="w-full"/>
				</div>

				<button-1 :disabled="!isRemoveAvailable" class="w-full mt-6" @click.stop="removeOrg">
					Видалити
				</button-1>
				<Loader v-if="isLoaderVisible" class="rounded-lg"/>
			</div>
		</ModalTemplate>
		<SuccessMessage :is-visible="isSuccessModalVisible"
										:message="`Організацію ${organization.name} видалено успішно`"
										:close-func="closeSuccess"/>
		<ErrorModal :is-visible="isErrorModalVisible"
								:close-func="closeError"	:message="`Помилка видалення організації ${organization.name}`"/>
	</div>
</template>

<script>
import ModalTemplate from "../Modals/ModalTemplate.vue";
import input1 from "../Inputs/Input-1.vue"
import Loader from "../Loader.vue";
import api from "../../api/index.js";
import SuccessMessage from "../Modals/SuccessMessage.vue";
import ErrorModal from "../Modals/ErrorModal.vue";
export default {
	name: "RemoveOrgModal",
	components: {
		ErrorModal,
		SuccessMessage,
		ModalTemplate,
		input1,
		Loader
	},
	emits : ["on-remove-success","on-remove-failed"],
	data (){
		return {
			inputValue: "",
			isModalVisible : true,
			isLoaderVisible : false,
			isSuccessModalVisible : false,
			isErrorModalVisible : false,
		}
	},
	props : {
		organization: Object,
		isVisible : false,
		onRemoveSuccess : Function,
		onRemoveFailed : Function,
		closeFunc : Function,

	},
	methods :{
		closeThisComponent(){
			this.isModalVisible = true,
			this.isLoaderVisible = false,
			this.isSuccessModalVisible = false,
			this.isErrorModalVisible = false
			this.closeFunc();
		},
		closeSuccess(){
			this.onRemoveSuccess();
			this.closeThisComponent();
		},
		closeError(){
			this.onRemoveFailed();
			this.closeThisComponent();
		},
		async removeOrg(){
			this.isLoaderVisible = true;
			await api.organizations.removeOrganization(this.organization.id)
				.then(res=>{
					this.isModalVisible = false;
					this.isLoaderVisible = false;
					this.isSuccessModalVisible = true;
				})
				.catch(err=>{
					this.isModalVisible = false;
					this.isLoaderVisible = false;
					this.isErrorModalVisible = true;
				})
				.finally(()=>{

				});
		}
	},
	computed : {
		isRemoveAvailable  (){
			return this.organization.name === this.inputValue;
		}
	}
}
</script>

<style scoped>

</style>