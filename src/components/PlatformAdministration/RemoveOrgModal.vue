<template>
	<div v-if="isVisible">
		<ModalTemplate :is-modal-visible="isModalVisible" :is-hide-on-click="true"
									 :close-func="closeThisComponent" class-list="grid place-items-center px-4">
			<div class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto"
			@click.stop>
				<button class="absolute top-6 right-6 cursor-pointer"
								@click="closeThisComponent">
					<img src="/src/assets/close.svg">
				</button>
				<div class="text-s1 mb-2">
					{{ $t('organizationProfile.deleteOrganization') }}
				</div>
				<div class="text-s1 text-red-c-500 underline">
					"{{organization.name}}"
				</div>
				<div class="text-h3 text-gray-c-600 my-2">
					{{ $t('general.toDeleteType') }}
					<span class="text-h3 text-center text-gray-c-800 font-semibold">
						{{ organization.name }}
					</span>
				</div>

				<input-1 v-model="inputValue" class="w-full"/>

				<button-1 :disabled="!isRemoveAvailable" class="w-full mt-6" @click.stop="removeOrg">
					Видалити
				</button-1>
				<Loader v-if="isLoaderVisible" class="rounded-lg"/>
			</div>
		</ModalTemplate>
		<SuccessMessage :is-visible="isSuccessModalVisible"
										:message="`${this.$t('organizationProfile.organization')} ${organization.name} ${this.$t('general.deleted')} ${this.$t('general.success')}`"
										:close-func="closeSuccess"/>
		<ErrorModal :is-visible="isErrorModalVisible"
								:close-func="closeError"	:message="`${this.$t('deleteError')} організації ${organization.name}`"/>
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
@tailwind base;
@tailwind utilities;
@tailwind components;

.text-s1{
	@apply text-h2 text-center font-semibold;
}

</style>