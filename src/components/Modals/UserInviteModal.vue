<template>
  <modal-template :is-modal-visible="isModalVisible" :close-func="close" :is-hide-on-click="isHideOnClick"
  	:class-list="`grid place-content-center px-2`">
    <transition name="modal-anim">
      <div v-if="animTrigger" class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto"
           @click.stop>
        <button class="absolute top-6 right-6 cursor-pointer"
                @click="close">
          <img src="/src/assets/close.svg">
        </button>
        <div class="text-h2 text-center font-semibold ">
          {{ $t('organizationProfile.addEmployee') }}
        </div>
        <div class="text-h3 text-gray-c-600 mt-2 mb-4">
          {{ $t('organizationProfile.employeeEnvelope') }}
        </div>

        <div class="flex flex-col gap-4 mt-4 mb-2">
          <input1 v-model.trim="requestedOrgName" class="w-full"
                  :placeholder="$t('dashboard.organizationSearchPlaceholder')"
                  @focusout="orgInpFocusLose"/>
          <input1 placeholder="E-mail" class="outline-none" validation-type="mail"
                  :validation-message="$t('validations.mailNotValid')" v-model.trim="mail"/>
        </div>

        <button-1 class="w-full mt-6" :disabled="!InviteSendingAvailable" @click="SendInvite">
          {{ $t('organizationProfile.sendInvite') }}
        </button-1>
        <Loader v-if="isLoader"/>
      </div>
    </transition>
  </modal-template>
</template>

<script>
import ModalTemplate from "./ModalTemplate.vue";
import input1 from "../Inputs/Input-1.vue"
import api from "../../api/index.js";
import regex from "../mixins/regex.js";
export default {
  name: "UserInviteModal",
  components: {ModalTemplate, input1},
	mixins : [regex],
  props : {
    isModalVisible : {
      type : Boolean,
      default : false,
    },
    closeFunc : {
      type : Function,
      required : true
    },
    classList : {
      type : String
    },
    isHideOnClick : {
      type : Boolean,
      default: true
    }
  },
  data(){
    return {
      animTrigger: false,
      mail : "",
      requestedOrgName : "",
      organization : undefined,
			isLoader : false,
      suggestions : [
        "org0",
        "org1",
        "org2",
        "org3",
        "org4",
        "org5",
        "org6",
      ]
    }
  },
  methods : {
    close(){
      this.animTrigger = false
      setTimeout(()=>{
        this.mail = "";
				this.organization = undefined
				this.suggestions = []
        this.closeFunc()
      }, 200)
    },
		orgInpFocusLose(){
			this.getOrganization();
		},
		async getOrganization(){
			if(this.requestedOrgName.length<2)
				return;
			await api.organizations.getOrganizationByName(this.requestedOrgName, {})
				.then(res=>{
					console.log(res)
					if(res.data[0]) {
						this.organization = res.data[0];
						this.requestedOrgName = this.organization.name
					}
				})
				.catch(err=>{
					console.error(err)
				})
		},
		async SendInvite(){
			if(!this.InviteSendingAvailable){
				this.$toast.error(this.$t("general.errorMessage"));
				return;
			}
			this.isLoader = true;
			let payload = {
				email : this.mail,
				organization : this.organization.id
			}
			await api.user.SendInvite(payload)
				.then(res=>{
					console.log(res)
					setTimeout(()=>{
						this.$toast.success(this.$t("organizationProfile.successInvite"))
					}, 200)
					this.close()
				})
				.catch(err=>{
					console.error(err)
					setTimeout(()=>{
						this.$toast.error(this.$t("general.errorMessage"))
					}, 200)
				})
				.finally(()=>{
					this.isLoader = false;
				})
		},
  },
  computed : {
    suggestionsC(){
      return this.suggestions.slice(0,5)
    },
		InviteSendingAvailable(){
			return this.organization && this.isMail(this.mail)
		}
  },
  watch : {
    isModalVisible(newVal){
      if(newVal)
        this.$nextTick(()=>{
          this.animTrigger = true;
        })
    }
  }
}
</script>

<style scoped>

</style>
