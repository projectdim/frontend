<template>
	<ConfirmModal :is-bg-click-close=false :is-visible="isLeaveModalVisible"
		cancel-button-text="Повернутись" accept-button-text="Покинути сторінку"
		title="Дані не збережено" :question="question"
		:close-func="closeLeavePageConfirmModal"
		:accept-button-func="PageLeaveAccepted"
		:cancel-button-func="PageLeaveCanceled"/>
 <div class="py-4 px-6 overflow-y-auto h-full">
<!--	 <h3 class="font-semibold text-sidebar-title
			screen-475:text-sidebar-title-mobile">
		 {{getSelectedLocationRequest.address}}
	 </h3>-->
<!--	 Header-->
	 <div class="flex justify-between mb-2">
		 <div class="font-semibold text-sidebar-title">
			 <span class="align-middle">Оновлення стану</span>
		 </div>
		 <div class="flex gap-2 h-[42px]">
			 <Button3 @click="this.$router.go(-1)">
				 Відміна
			 </Button3>
			 <Button1 @click="PreviewFinishedReport">
				 Зберегти
			 </Button1>
		 </div>
	 </div>

	 <div class="shadow-cs2 py-4">
		 <div class="flex justify-between mb-3 h-[34px]">
				<div class="text-overview-item text-gray-c-600 py-2">
						Стан будівлі
				</div>
				<div class="flex gap-2">
					<ButtonTag :button-state="isBuildIntact"
											@click="SetBuildingCondition(ReportState.buildingCondition.Intact)">
						Ціла
					</ButtonTag>
					<ButtonTag :button-state="isBuildDamaged"
										 @click="SetBuildingCondition(ReportState.buildingCondition.Damaged)">
						Пошкоджена
					</ButtonTag>
					<ButtonTag :button-state="isBuildNoData"
										 @click="SetBuildingCondition(ReportState.buildingCondition.NoData)">
						Невідомо
					</ButtonTag>
				</div>
		 </div>
		 <resize-textarea
			 class="textArea"
			 placeholder="Опишіть ситуацію (опціонально)"
			 @update:modelValue="SetBuildingConditionDescription"
			 v-model="report.buildingCondition.description"/>
	 </div>

	 <div class="shadow-cs2 py-4">
		 <div class="flex justify-between mb-3 h-[34px]">
			 <div class="text-overview-item text-gray-c-600 py-2">
				 Електроенергія
			 </div>
			 <div class="flex gap-2">
				 <ButtonTag :button-state="isElectricityStable"
										@click="SetElectricityState(ReportState.electricity.Stable)">
					 Стабільна
				 </ButtonTag>
				 <ButtonTag :button-state="isElectricityIntermittent"
										@click="SetElectricityState(ReportState.electricity.Intermittent)">
					 Переривчаста
				 </ButtonTag>
				 <ButtonTag :button-state="isElectricityNoData"
										@click="SetElectricityState(ReportState.electricity.NoData)">
					 Невідомо
				 </ButtonTag>
			 </div>
		 </div>
		 <resize-textarea
			 class="textArea"
			 placeholder="Опишіть ситуацію (опціонально)"
			 @update:modelValue="SetElectricityStateDescription"
			 v-model="report.electricity.description"/>
	 </div>

	 <div class="shadow-cs2 py-4">
		 <div class="flex justify-between mb-3 h-[34px]">
			 <div class="text-overview-item text-gray-c-600 py-2">
				 Під'їзд
			 </div>
			 <div class="flex gap-2">
				 <ButtonTag :button-state="isCarEntranceAccessible"
				 						@click="SetCarEntrance(ReportState.carEntrance.Accessible)">
					 Доступний
				 </ButtonTag>
				 <ButtonTag :button-state="isCarEntranceInaccessible"
										@click="SetCarEntrance(ReportState.carEntrance.Inaccessible)">
					 Недоступний
				 </ButtonTag>
				 <ButtonTag :button-state="isCarEntranceNoData"
										@click="SetCarEntrance(ReportState.carEntrance.NoData)">
					 Невідомо
				 </ButtonTag>
			 </div>
		 </div>
		 <resize-textarea
							 class="textArea"
							 placeholder="Опишіть ситуацію (опціонально)"
							 @update:modelValue="SetCarEntranceDescription"
							 v-model="report.carEntrance.description"/>
	 </div>

	 <div class="shadow-cs2 py-4">
		 <div class="flex justify-between mb-3 h-[34px]">
			 <div class="text-overview-item text-gray-c-600 py-2">
				 Чиста вода
			 </div>
			 <div class="flex gap-2">
				 <ButtonTag :button-state="isWaterStable"
				 						@click="SetWaterState(ReportState.water.Stable)">
					 Стабільна
				 </ButtonTag>
				 <ButtonTag :button-state="isWaterIntermittent"
										@click="SetWaterState(ReportState.water.Intermittent)">
					 Переривчаста
				 </ButtonTag>
				 <ButtonTag :button-state="isWaterNoData"
										@click="SetWaterState(ReportState.water.NoData)">
					 Невідомо
				 </ButtonTag>
			 </div>
		 </div>
		 <resize-textarea
			 class="textArea"
			 placeholder="Опишіть ситуацію (опціонально)"
			 @update:modelValue="SetWaterStateDescription"
			 v-model="report.water.description"/>
	 </div>

	 <div class="shadow-cs2 py-4">
		 <div class="flex justify-between mb-3 h-[34px]">
			 <div class="text-overview-item text-gray-c-600 py-2">
				 Заправка
			 </div>
			 <div class="flex gap-2">
				 <ButtonTag :button-state="isFuelStationOpen"
				 						@click="SetFuelStationState(ReportState.fuelStation.Open)">
					 Працює
				 </ButtonTag>
				 <ButtonTag :button-state="isFuelStationClose"
				 						@click="SetFuelStationState(ReportState.fuelStation.Closed)">
					 Закрита
				 </ButtonTag>
				 <ButtonTag :button-state="isFuelStationNoData"
				 						@click="SetFuelStationState(ReportState.fuelStation.NoData)">
					 Невідомо
				 </ButtonTag>
			 </div>
		 </div>
		 <resize-textarea
			 class="textArea"
			 placeholder="Опишіть ситуацію (опціонально)"
			 @update:modelValue="SetFuelStationDescription"
			 v-model="report.fuelStation.description"/>
	 </div>

	 <div class="shadow-cs2 py-4">
		 <div class="flex justify-between mb-3 h-[34px]">
			 <div class="text-overview-item text-gray-c-600 py-2">
				 Лікарня
			 </div>
			 <div class="flex gap-2">
				 <ButtonTag :button-state="isHospitalOpen"
										@click="SetHospitalState(ReportState.hospital.Open)">
					 Працює
				 </ButtonTag>
				 <ButtonTag :button-state="isHospitalClose"
										@click="SetHospitalState(ReportState.hospital.Closed)">
					 Закрита
				 </ButtonTag>
				 <ButtonTag :button-state="isHospitalNoData"
										@click="SetHospitalState(ReportState.hospital.NoData)">
					 Невідомо
				 </ButtonTag>
			 </div>
		 </div>
		 <resize-textarea
			 class="textArea"
			 placeholder="Опишіть ситуацію (опціонально)"
			 @update:modelValue="SetHospitalDescription"
			 v-model="report.hospital.description"
		 />
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

export default {
	name: "ReportTools",
	components: {ConfirmModal, ModalTemplate, ButtonTag, Button1, Button3},
	data(){
		return {
			report : {},
			isLeaveModalVisible : false,
			question: "Ви не зберегли інформацію. Якщо ви покинете сторінку інформацію буде втрачено.",
			isPageLeaveConfirmed : false,
			targetLeaveRef : ""
		}
	},
	methods : {
		...mapMutations(['setSelectedMarker']),
		...mapActions(['setSelectedRequest']),
		SetBuildingCondition(value){
			this.report.buildingCondition.flag = value;
		},
		SetBuildingConditionDescription(value){
			this.report.buildingCondition.description = value
		},
		SetElectricityState(value){
			this.report.electricity.flag = value
		},
		SetElectricityStateDescription(value){
			this.report.electricity.description = value
		},
		SetWaterState(value){
			this.report.water.flag = value;
		},
		SetWaterStateDescription(value){
			this.report.water.description = value;
		},
		SetCarEntrance(value){
			this.report.carEntrance.flag = value;
		},
		SetCarEntranceDescription(value){
			this.report.carEntrance.description = value;
		},
		SetFuelStationState(value){
			this.report.fuelStation.flag = value;
		},
		SetFuelStationDescription(value){
			this.report.fuelStation.description = value;
		},
		SetHospitalState(value){
			this.report.hospital.flag = value;
		},
		SetHospitalDescription(value){
			this.report.hospital.description = value
		},

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
		ReportState() {
			return ReportsState;
		},
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
		//TODO це для пропсів
		isHospitalOpen(){
			if(this.report.hospital.flag === ReportsState.hospital.Open)
				return 'positive'
			else
				return 'default'
		},
		isHospitalClose(){
			if(this.report.hospital.flag === ReportsState.hospital.Closed)
				return 'negative'
			else
				return 'default'
		},
		isHospitalNoData(){
			if(this.report.hospital.flag === ReportsState.hospital.NoData)
				return 'no-data'
			else
				return 'default'
		},

		isFuelStationOpen(){
			if(this.report.fuelStation.flag === ReportsState.fuelStation.Open)
				return 'positive'
			else
				return 'default'
		},
		isFuelStationClose(){
			if(this.report.fuelStation.flag === ReportsState.fuelStation.Closed)
				return 'negative'
			else
				return 'default'
		},
		isFuelStationNoData(){
			if(this.report.fuelStation.flag === ReportsState.fuelStation.NoData)
				return 'no-data'
			else
				return 'default'
		},

		isElectricityStable(){
			if(this.report.electricity.flag === ReportsState.electricity.Stable)
				return 'positive'
			else
				return 'default'
		},
		isElectricityIntermittent(){
			if(this.report.electricity.flag === ReportsState.electricity.Intermittent)
				return 'negative'
			else
				return 'default'
		},
		isElectricityNoData(){
			if(this.report.electricity.flag === ReportsState.electricity.NoData)
				return 'no-data'
			else
				return 'default'
		},

		isCarEntranceAccessible(){
			if(this.report.carEntrance.flag === ReportsState.carEntrance.Accessible)
				return 'positive'
			else
				return 'default'
		},
		isCarEntranceInaccessible(){
			if(this.report.carEntrance.flag === ReportsState.carEntrance.Inaccessible)
				return 'negative'
			else
				return 'default'
		},
		isCarEntranceNoData(){
			if(this.report.carEntrance.flag === ReportsState.carEntrance.NoData)
				return 'no-data'
			else
				return 'default'
		},

		isWaterStable(){
			if(this.report.water.flag === ReportsState.water.Stable)
				return 'positive'
			else
				return 'default'
		},
		isWaterIntermittent(){
			if(this.report.water.flag === ReportsState.water.Intermittent)
				return 'negative'
			else
				return 'default'
		},
		isWaterNoData(){
			if(this.report.water.flag === ReportsState.water.NoData)
				return 'no-data'
			else
				return 'default'
		},

		isBuildIntact(){
			if(this.report.buildingCondition.flag === ReportsState.buildingCondition.Intact)
				return "positive";
			else
				return "default"
		},
		isBuildDamaged(){
			if(this.report.buildingCondition.flag === ReportsState.buildingCondition.Damaged)
				return "negative";
			else
				return "default"
		},
		isBuildNoData(){
			if(this.report.buildingCondition.flag === ReportsState.buildingCondition.NoData)
				return "no-data";
			else
				return "default"
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