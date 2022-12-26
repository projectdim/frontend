<template>
	<transition-group name="report-appear" tag="div" class="flex flex-col flex-col-reverse flex-nowrap gap-2 h-[268px] overflow-hidden">
		<div v-for="(report, index) in visibleElements" v-bind:key="`rep${index}`"
				 class="h-[84px] flex flex-nowrap items-center w-full group hover:bg-blue-c-100 gap-3.5 shrink-0 grow-0 cursor-pointer">
			<div class="w-0.5 h-3/5 bg-gray-c-300 group-hover:h-full group-hover:bg-blue-c-400 duration-200"/>
			<div class="grow h-3/5">
				<div class="text-h4 group-hover:text-blue-c-400 group-hover:font-semibold">
					{{ ReportAddressFull(report) }}
				</div>
				<div class="flex flex-nowrap pt-1 items-center font-semibold text-b3 gap-2 text-gray-c-500">
					<div class="bg-white rounded-2xl border border-gray-c-200 px-2 py-0.5"
							 :class="getTextColorClass(reportFlags.buildingCondition, report.reports.buildingCondition.flag)"
					>
						<div class="h-3 w-3 inline-block">
							<SVG_building_condition class="h-full w-full"
																			:class="getSVGColorClass(reportFlags.buildingCondition, report.reports.buildingCondition.flag)"
							/>
						</div>
						{{GetStatusTranslation(report.reports.buildingCondition.flag)}}
					</div>
					<div class="font-normal">
						{{GetDateTimeShort(report.updated_at)}}
					</div>
					<div>
						{{ report.organization_name }}
					</div>
				</div>
			</div>
		</div>
	</transition-group>
</template>

<script>
import dateFormatter from "../mixins/dateFormatter.js";
import SVG_building_condition from "../ComponentsSVG/SVG_building_condition.vue";
import dynamicContent from "../mixins/dynamicContent.js";
import reportItemFlags from "../mixins/reportItemFlags.js";

export default {
	name: "WelcomeScreenReportList",
	components : {
		SVG_building_condition
	},
	mixins : [
		dateFormatter,
		dynamicContent,
		reportItemFlags
	],
	props : {
		delay : {
			type : Number,
			default : 5000
		},
		reportsList : {
			type : Array,
			default: []
		}
	},
	data(){
		return {
			lastVisibleItemIndex : 0,
			visibleElements : [],
			animId : 0
		}
	},
	methods : {
		startAnimation(){
			this.animId = setInterval(()=> {
				this.lastVisibleItemIndex++;
				if(this.lastVisibleItemIndex < this.reportsList.length) {
					this.visibleElements =
						this.reportsList.slice(this.lastVisibleItemIndex-2, this.lastVisibleItemIndex+1)
							.reverse()
					//console.log(JSON.stringify(this.visibleElements))
				}
				else {
					clearInterval(this.animId);
				}
			}, this.delay);
		},
	},
	mounted() {
		for(let i = 0; i<this.reportsList.length; i++){
			this.visibleElements.push(this.reportsList[i]);
			this.lastVisibleItemIndex = i;
			if(i==2)
				break;
		}
		this.visibleElements.reverse()
		this.startAnimation();
	},
	beforeUnmount() {
		clearInterval(this.animId)
	}
}
</script>

<style scoped>
	.report-appear-enter{
		margin-top: -84px;
	}
	.report-appear-enter-active,
	.report-appear-leave-active{
		transition: margin-top 1s ease-out,margin-bottom 1s ease-out;
	}
	.report-appear-enter-to{
		margin-top: 0;
	}
	.report-appear-leave{
		margin-bottom: 0;
	}
	.report-appear-leave-to{
		margin-bottom: -84px;
	}
</style>