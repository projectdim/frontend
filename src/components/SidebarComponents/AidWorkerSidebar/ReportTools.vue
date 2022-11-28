<template>
	<ConfirmModal :is-bg-click-close=false :is-visible="isLeaveModalVisible"
		:cancel-button-text="$t('reportTools.cancelButtonText')"
    :accept-button-text="$t('reportTools.acceptButtonText')"
		:title="$t('general.dataNotSaved')" :question="question"
		:close-func="closeLeavePageConfirmModal"
		:accept-button-func="PageLeaveAccepted"
		:cancel-button-func="PageLeaveCanceled"/>
 <div class="py-4 px-6 overflow-y-auto h-full">
<!--	 <h3 class="font-semibold text-h2
			mobile:text-h2-m">
		 {{getSelectedLocationRequest.address}}
	 </h3>-->

<!--	 Header-->
	 <div class="flex flex-wrap justify-between mb-2">
		 <div class="font-semibold text-h2">
			 <span class="align-middle">{{ $t('reportTools.header') }}</span>
		 </div>
		 <div class="flex flex-wrap gap-2 h-[42px]">
			 <Button3 @click="this.$router.go(-1)" class="min-w-[80px]">
         {{ $t('general.cancel') }}
			 </Button3>
			 <Button1 @click="PreviewFinishedReport" class="min-w-[80px]">
         {{ $t('general.save') }}
			 </Button1>
		 </div>
	 </div>

   <div v-for="label in reports" :key="label.name" class="shadow-cs2 py-4">
     <div class="flex flex-wrap justify-between mb-3 min-h-[34px]">
       <div class="text-h3 text-gray-c-600 py-2">
         {{ $t(`reportTools.${label.name}`) }}
       </div>
       <div class="flex flex-wrap gap-2">
         <ReportRadio :label="label" v-model="report[label.name].flag"/>
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
import {ReportsState} from "../../../Scripts/Helper.js";
import ModalTemplate from "../../Modals/ModalTemplate.vue";
import ConfirmModal from "../../Modals/ConfirmModal.vue";
import ReportRadio from "../../Buttons/ReportRadio.vue";

export default {
	name: "ReportTools",
	components: {
    ReportRadio,
    ConfirmModal,
    ModalTemplate,
    ButtonTag,
    Button1,
    Button3
  },
	data () {
		return {
			report : {
        buildingCondition: {
          flag: 'noData',
          description: ""
        },
        electricity: {
          flag: 'noData',
          description: ""
        },
        carEntrance: {
          flag: 'noData',
          description: ""
        },
        water: {
          flag: 'noData',
          description: ""
        },
        fuelStation: {
          flag: 'noData',
          description: "",
          distance: 0
        },
        hospital: {
          flag: 'noData',
          description: "",
          distance: 0
        }
      },
			isLeaveModalVisible : false,
			question: this.$t('reportTools.beforeLeaveMessage'),
			isPageLeaveConfirmed : false,
			targetLeaveRef : "",
      reports: [
        {
          name: "buildingCondition",
          options: [
            {value: 'Неушкоджена', i18n: 'intact', class: 'peer-checked:border-green-c-200 peer-checked:text-green-c-500'},
            {value: 'Пошкоджена', i18n: "damaged", class: 'peer-checked:border-red-c-200 peer-checked:text-red-c-500'},
            {value: 'Невідомо', i18n: 'noData', class: 'peer-checked:border-gray-c-500 peer-checked:text-gray-c-800'},
          ]
        },
        {
          name: "electricity",
          options: [
            {value: "Стабільна", i18n: 'accessible', class: 'peer-checked:border-green-c-200 peer-checked:text-green-c-500'},
            {value: "Переривчаста", i18n: 'intermittent', class: 'peer-checked:border-red-c-200 peer-checked:text-red-c-500'},
            {value: 'Невідомо', i18n: 'noData', class: 'peer-checked:border-gray-c-500 peer-checked:text-gray-c-800'},
          ]
        },
        {
          name: "carEntrance",
          options: [
            {value: 'Доступне', i18n: 'roadwayAccessible', class: 'peer-checked:border-green-c-200 peer-checked:text-green-c-500'},
            {value: 'Недоступне', i18n: 'inaccessible', class: 'peer-checked:border-red-c-200 peer-checked:text-red-c-500'},
            {value: 'Невідомо', i18n: 'noData', class: 'peer-checked:border-gray-c-500 peer-checked:text-gray-c-800'},
          ]
        },
        {
          name: "water",
          options: [
            {value: 'Стабільна', i18n: 'stable', class: 'peer-checked:border-green-c-200 peer-checked:text-green-c-500'},
            {value: 'Нестабільна', i18n: 'intermittent', class: 'peer-checked:border-red-c-200 peer-checked:text-red-c-500'},
            {value: 'Невідомо', i18n: 'noData', class: 'peer-checked:border-gray-c-500 peer-checked:text-gray-c-800'},
          ]
        },
        {
          name: "fuelStation",
          options: [
            {value: 'Відчинено', i18n: 'open', class: 'peer-checked:border-green-c-200 peer-checked:text-green-c-500'},
            {value: 'Зачинено', i18n: 'closed', class: 'peer-checked:border-red-c-200 peer-checked:text-red-c-500'},
            {value: 'Невідомо', i18n: 'noData', class: 'peer-checked:border-gray-c-500 peer-checked:text-gray-c-800'},
          ]
        },
        {
          name: "hospital",
          options: [
            {value: 'Відчинено', i18n: 'open', class: 'peer-checked:border-green-c-200 peer-checked:text-green-c-500'},
            {value: 'Зачинено', i18n: 'closed',class: 'peer-checked:border-red-c-200 peer-checked:text-red-c-500'},
            {value: 'Невідомо', i18n: 'noData', class: 'peer-checked:border-gray-c-500 peer-checked:text-gray-c-800'},
          ]
        }
      ]
		}
	},
	methods : {
		...mapMutations(['setSelectedMarker']),
		...mapActions(['setSelectedRequest']),
		PreviewFinishedReport(){
			let RequestLocationMarker = this.getSelectedLocationRequest;
			RequestLocationMarker.reports = this.report;
			RequestLocationMarker.status = 8;
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
		}
	},
	computed : {
		...mapGetters(["getSelectedLocationRequest"]),
    reportStateDefault () {
      return {
        buildingCondition: {
          flag: ReportsState.buildingCondition.NoData,
          description: ""
        },
        electricity: {
          flag: ReportsState.electricity.NoData,
          description: ""
        },
        carEntrance: {
          flag: ReportsState.carEntrance.NoData,
          description: ""
        },
        water: {
          flag: ReportsState.water.NoData,
          description: ""
        },
        fuelStation: {
          flag: ReportsState.fuelStation.NoData,
          description: "",
          distance: 0
        },
        hospital: {
          flag: ReportsState.hospital.NoData,
          description: "",
          distance: 0
        }
      }
    },
	},
	beforeRouteLeave(to, from, next){
		if(this.getSelectedLocationRequest.reports !== null &&
		this.getSelectedLocationRequest.reports === this.report)
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
			this.report = this.getSelectedLocationRequest.reports;
		else
			this.report = this.reportStateDefault;
	}
}
</script>

<style scoped>

</style>