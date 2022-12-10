<template>
	<ConfirmModal :is-bg-click-close=false :is-visible="isLeaveModalVisible"
		:cancel-button-text="$t('reportTools.cancelButtonText')"
    :accept-button-text="$t('reportTools.acceptButtonText')"
		:title="$t('general.dataNotSaved')" :question="question"
		:close-func="closeLeavePageConfirmModal"
		:accept-button-func="PageLeaveAccepted"
		:cancel-button-func="PageLeaveCanceled"/>
 <div class="py-4 px-6 overflow-y-auto h-full">

	 <h3 class="font-semibold text-h2
			mobile:text-h2-m">
		 {{getSelectedLocationRequest.address}}
	 </h3>

<!--	 Header-->
	 <div class="flex flex-wrap justify-between mb-2">
		 <div class="font-semibold text-h2">
			 <span class="align-middle">{{ $t('reportTools.header') }}</span>
		 </div>
		 <div class="flex  gap-2 h-[42px] mobile:w-full">
				<Button3 class="min-w-[80px] mobile:grow" @click="GoBack">
					{{ $t('general.cancel') }}
				</Button3>
			 <Button1 @click="PreviewFinishedReport" class="min-w-[80px] mobile:grow">
				 {{ $t('general.save') }}
			 </Button1>
		 </div>
	 </div>

   <div v-for="label in ReportsData()" :key="label.name" class="shadow-cs2 py-4">
     <div class="flex flex-wrap justify-between mb-3 min-h-[34px]">
       <div class="text-h3 text-gray-c-600 py-2">
         {{ $t(`reportTools.${label.name}`) }}
       </div>
       <div class="flex flex-wrap gap-2">
         <ReportRadio :label="label" v-model="report[label.name].flag"
         :checked-op="report[label.name].flag"/>
       </div>
     </div>
     <resize-textarea
         class="textArea"
         :placeholder="$t('reportTools.textAreaPlaceholder')"
         v-model="report[label.name].description"/>
   </div>


 </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Button3 from "../../Buttons/Button_3.vue";
import Button1 from "../../Buttons/Button_1.vue";
import ButtonTag from "../../Buttons/ButtonTag.vue";
import ModalTemplate from "../../Modals/ModalTemplate.vue";
import ConfirmModal from "../../Modals/ConfirmModal.vue";
import helper from "../../mixins/helper.js";
import ReportRadio from "../../Buttons/ReportRadio.vue";
import reportItemFlags from "../../mixins/reportItemFlags.js";

export default {
	name: "ReportTools",
	components: {
		ReportRadio,
		ConfirmModal,
		ModalTemplate,
		ButtonTag,
		Button1,
		Button3},
	mixins : [
    helper,
    reportItemFlags
  ],
	data(){
		return {
			report : {
        buildingCondition: {
          flag: 'no_data',
          description: ""
        },
        electricity: {
          flag: 'no_data',
          description: ""
        },
        carEntrance: {
          flag: 'no_data',
          description: ""
        },
        water: {
          flag: 'no_data',
          description: ""
        },
        fuelStation: {
          flag: 'no_data',
          description: "",
          distance: 0
        },
        hospital: {
          flag: 'no_data',
          description: "",
          distance: 0
        }
      },
			isLeaveModalVisible : false,
			question: this.$t('reportTools.beforeLeaveMessage'),
			isPageLeaveConfirmed : false,
			targetLeaveRef : "",
		}
	},
	methods : {
		...mapMutations(['setSelectedMarker']),
		...mapActions(['setSelectedRequest']),
		PreviewFinishedReport(){
			let RequestLocationMarker = this.getSelectedLocationRequest;
			RequestLocationMarker.reports = this.report;
			this.setSelectedRequest(RequestLocationMarker);
			this.isPageLeaveConfirmed = true;
			this.$router.push("submit-report-preview");
		},
		closeLeavePageConfirmModal(){
			this.isLeaveModalVisible = false;
		},
		PageLeaveAccepted(){
			this.isPageLeaveConfirmed = true;
			this.$router.push(this.targetLeaveRef);
		},
		PageLeaveCanceled(){
			this.isPageLeaveConfirmed = false;
			this.targetLeaveRef = ""
		},
		GoBack(){
			this.$router.go(-1);
		},

	},
	computed : {
		...mapGetters(["getSelectedLocationRequest"]),
	},
	beforeRouteLeave(to, from, next){
		if(this.getSelectedLocationRequest.reports !== null &&
			this.isEqual(this.getSelectedLocationRequest.reports, this.report))
			next();
		if(this.isPageLeaveConfirmed)
			next();
		else {
			this.isLeaveModalVisible = true;
			this.targetLeaveRef = to.fullPath;
			next(false);
		}
	},
	created() {
		if(this.getSelectedLocationRequest.reports)
			this.report = JSON.parse(JSON.stringify(this.getSelectedLocationRequest.reports))
	}
}
</script>

<style scoped>

</style>
