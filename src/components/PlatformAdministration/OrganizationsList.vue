<template>
	<div class="p-9 h-full overflow-y-auto">
		<h1 class="font-semibold text-gray-c-800 text-h1">
			Організації
		</h1>

		<div v-if="organizationsList.length<=0" class="mt-[215px]">
			<img class="w-[205px] h-[234px] screen-475:w-[157px] screen-475:h-[179px] mx-auto" src="/src/assets/Organizations/Picture.png">
			<p class="text-body-1 text-center mt-5 mb-6">Список порожній</p>
			<button-1 class="block mx-auto flex items-center" @click="showAddOrgModal">
				<img src="/src/assets/plus.svg" class="inline-block mr-2.5">
				<p>Додати організацію</p>
			</button-1>
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
						 @focusout="OnDivFocus(false)"
						@click="ActivateInput">

					<svg class="fill-gray-c-500" width="18" height="18" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z" fill-opacity="0.2"/>
					</svg>


					<input ref="inp" class="w-full outline-none px-4 py-2 bg-transparent"
								 @focusin="OnInputFocus(true)"
								 @focusout="OnInputFocus(false)"
								 @click.stop
								 placeholder="Пошук організації. Від 3 символів..."
								 v-model="SearchedOrgName"
					/>
				</div>

				<button-1 class="block items-center px-9" :disabled="SearchedOrgName.length < 3"
					@click="GetOrganizationByName">

					Пошук
				</button-1>
				<button-2 class="block flex items-center" @click="showAddOrgModal">
					<img src="/src/assets/plusBlue.svg" class="inline-block mr-2.5">
					<p>Додати організацію</p>
				</button-2>

			</div>
			<div v-if="this.isSearchedOrgResult"  class="py-6 flex flex-wrap gap-4">
				<div class="w-full">
					<span v-if="this.SearchedOrganizationsList.length<=0">За запитом "{{this.SearchedOrgName}}" збігів не знайдено.</span>
					<span v-if="this.SearchedOrganizationsList.length>0">Результити за запитом "{{this.SearchedOrgName}}".</span>
					<button-1 class="mx-4" @click="ResetSearchResult">
						Оновити
					</button-1>
				</div>
				<OrganizationListItem v-for="(item, index) in SearchedOrganizationsList"
						:key="`org${index}`" :organization="item" @remove="onRemoveClick"/>
			</div>
			<div v-else class="py-6 flex flex-wrap gap-4">
				<OrganizationListItem v-for="(item, index) in organizationsList"
				:key="`org${index}`" :organization="item" @remove="onRemoveClick"/>
			</div>
		</div>

		<div ref="scrollObserver" class="relative h-[80px]" v-if="pageMax<0">
			<Loader v-show="isLoaderVisible"/>
		</div>

		<ModalTemplate class-list="grid place-items-center" :is-modal-visible="isCreateModalVisible"
		:close-func="closeCreateOrgModal" :isHideOnClick="false">
			<div class="bg-white w-[480px] mx-auto screen-475:w-full relative p-6 rounded-lg">
				<img src="/src/assets/close.svg" class="absolute top-6 right-6 cursor-pointer"
						 @click="closeCreateOrgModal">
				<div class="text-h2 text-center font-semibold ">Додати організацію</div>
				<div class="flex flex-col gap-4 mt-4 mb-6">
					<div>
						<p class="text-h4 text-gray-c-500">Назва організації</p>
						<input1 v-model="createOrgName" class="w-full mt-1" placeholder="Назва"/>
					</div>
					<div>
						<p class="text-h4 text-gray-c-500">Вебсайт</p>
						<input1 v-model="createOrgSite" class="w-full mt-1" placeholder="organization.com"/>
					</div>
				</div>

				<button-1 class="w-full" :disabled="createOrgName.length < 3 || createOrgSite.length < 3"
				@click.stop="AddOrganizations">
					Додати
				</button-1>
				<Loader v-if="isCreateModalLoaderVisible"/>
			</div>
		</ModalTemplate>
		<SuccessMessage :is-visible="isSuccessMessageVisible" :message="SuccessMessage"
										:close-func="closeSuccessModal" :hide-on-bg-click="true"/>
		<ErrorModal :is-visible="isErrorMessageVisible" :message="ErrorMessage"
								:close-func="closeErrorMessage" :hide-on-bg-click="true"/>

		<RemoveOrgModal :is-visible="isRemovedModalVisible"
			:organization="removedOrganization" :close-func="closeRemoveModal"
			:on-remove-success="onRemoveSuccess"
		/>
	</div>
</template>

<script>
import OrganizationListItem from "./OrganizationListItem.vue";
import api from "../../api/index.js";
import ModalTemplate from "../Modals/ModalTemplate.vue";
import Input1 from "../Inputs/Input-1.vue";
import Loader from "../Loader.vue";
import SuccessMessage from "../Modals/SuccessMessage.vue";
import ErrorModal from "../Modals/ErrorModal.vue";
import Button1 from "../Buttons/Button_1.vue";
import RemoveOrgModal from "./RemoveOrgModal.vue";
export default {
	name: "OrganizationsList",
	components: {RemoveOrgModal, Button1, ErrorModal, SuccessMessage, Loader, Input1, ModalTemplate, OrganizationListItem},
	data () {
		return{
			organizationsList : [],
			isInputFocused : false,
			limit : 20,
			currentLastPage :1,
			pageMax : -1,
			isAutoPaginationOn : true,
			createOrgSite : "",
			createOrgName : "",
			isCreateModalVisible : false,
			isCreateModalLoaderVisible : false,
			isSuccessMessageVisible : false,
			SuccessMessage : "Ви успішно додали нову організацію!",
			isErrorMessageVisible : false,
			ErrorMessage : "Упс.. Щось пішло не так. Спробуйте ще.",
			isLoaderVisible : false,
			SearchedOrgName : "",
			SearchedOrganizationsList : [],
			isSearchedOrgResult : false,

			removedOrganization : null,
			isRemovedModalVisible : false
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
		ActivateInput(){
			this.$refs.inp.select()
		},
		showAddOrgModal(){
			this.isCreateModalVisible = true;
		},
		closeCreateOrgModal(){
			this.createOrgName = ""
			this.createOrgSite = ""
			this.isCreateModalVisible = false;
		},
		closeSuccessModal(){
			this.isSuccessMessageVisible = false;
			this.SuccessMessage = "";
		},
		closeErrorMessage(){
			this.isErrorMessageVisible = false;
			this.ErrorMessage = "Упс.. Щось пішло не так. Спробуйте ще.";
		},
		ResetSearchResult(){
			this.SearchedOrgName = "";
			this.SearchedOrganizationsList = []
			this.isSearchedOrgResult = false;
			this.isAutoPaginationOn = true;
		},
		onRemoveClick(org){
			this.removedOrganization = org;
			this.isRemovedModalVisible = true;
		},
		closeRemoveModal(){
			this.isRemovedModalVisible = false;
		},
		onRemoveSuccess(){
			this.organizationsList = this.organizationsList.filter(x=>x.id!== this.removedOrganization.id)
		},
		async GetOrganizationList(page){
			this.isLoaderVisible = true;
			//await new Promise(resolve => setTimeout(resolve, 5000))
			await api.organizations.getOrganizationList(page, this.limit)
				.then(res=>{
					if(res.data.length === 0 ){
						this.pageMax = --this.currentLastPage;
					}
					else if(res.data.length < this.limit){
						this.pageMax = this.currentLastPage;
					}
					this.organizationsList = [...this.organizationsList, ...res.data]
				}).catch(err=>{
					console.error(err);
				}).finally(()=>{
					this.isLoaderVisible = false;
				});
		},
		async AddOrganizations(){
			if(this.createOrgName.length < 3 || this.createOrgSite.length < 3)
				return;
			this.isCreateModalLoaderVisible = true;
			await api.organizations.createOrganization(this.createOrgName, this.createOrgSite)
				.then(res => {
					this.organizationsList = [res.data,...this.organizationsList]
					this.SuccessMessage = `Організацію \"${res.data.name}\" додано успішно`;
					this.closeCreateOrgModal();
					this.isSuccessMessageVisible = true;
				})
				.catch(err=>{
					console.log(err.response)
					if(err.response.status == 400)
						this.ErrorMessage = `Організація \"${this.createOrgName}\" вже зареєстрована!`
					else
						this.ErrorMessage = "Упс.. Щось пішло не так. Спробуйте ще.";
					this.closeCreateOrgModal();
					this.isErrorMessageVisible = true;
				})
				.finally(()=>{
					this.isCreateModalLoaderVisible = false;
				});
		},
		async GetOrganizationByName(){
			if(this.SearchedOrgName.length < 3){
				this.ErrorMessage = "Мінімальна довжина запиту 3 символи";
				this.isErrorMessageVisible = true;
				return
			}
			api.organizations.getOrganizationByName(this.SearchedOrgName)
				.then(res=>{
					console.log(res.data);
					this.isAutoPaginationOn = false;
					this.isSearchedOrgResult = true;
					this.SearchedOrganizationsList = res.data;
				})
				.catch(err=>{
					this.ResetSearchResult();
					this.isErrorMessageVisible = true;
					throw  err;
				});
		}
	},
	/*created() {
		this.GetOrganizationList(1);
	},*/
	mounted() {
		let options = {
			threshold: 0,
		}
		let callback = (entries, observer) => {
			if(entries[0].isIntersecting && !this.isLoaderVisible && this.pageMax<0 && this.isAutoPaginationOn) {
				this.GetOrganizationList(++this.currentLastPage);
			}
		};
		let observer = new IntersectionObserver(callback, options);
		observer.observe(this.$refs.scrollObserver);

		this.GetOrganizationList(this.currentLastPage);
	},
}
</script>

<style scoped>

</style>