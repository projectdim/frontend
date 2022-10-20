<template>
	<div class="mb-6">
		<div class="bg-gray-c-100 py-2 px-6 w-full shadow-cs2">
			<p class="font-semibold text-black capitalize
			text-sidebar-title
			screen-475:text-sidebar-address-mobile
			screen-949:text-sidebar-address-mobile">
				{{getDate(logs[0].created_at)}}
			</p>
		</div>

		<div v-for="log in logs" class="py-4 px-6 flex gap-x-4 shadow-cs2 w-full">
				<div  class="flex gap-9">
					<div class="text-gray-c-500 font-normal pt-2.5
						text-overview-item
						screen-475:text-overview-item-mobile
						screen-949:text-overview-item-mobile">
						{{new Date(log.created_at).toTimeString().split(' ')[0]}}
					</div>

					<div>
						<div v-for="change in getChangedLogs(log)" class="my-2.5 flex flex-wrap gap-2 font-semibold">
						<div class="flex gap-2" v-if="log.old_flags">
							<p class="w-4 h-6">
								<SVG_status_list :icon='change' :classList="getSVGColorClass(change, log.old_flags[change].flag)"/>
							</p>
							<p class="grow my-auto uppercase
							text-overview-item
							screen-475:text-overview-item-mobile
							screen-949:text-overview-item-mobile" :class="getTextColorClass(change,log.old_flags[change].flag)">
								{{log.old_flags[change].flag}}
							</p>
						</div>
						<img src="/src/assets/change-arrow.svg" class="h-6 w-6">
						<div class="flex gap-2">
							<p class="w-4 h-6">
								<SVG_status_list :icon='change' :classList="getSVGColorClass(change, log.new_flags[change].flag)"/>
							</p>
							<p class="grow my-auto uppercase text-base
							text-overview-item
							screen-475:text-overview-item-mobile
							screen-949:text-overview-item-mobile"
								 :class="getTextColorClass(change, log.new_flags[change].flag)">
								{{log.new_flags[change].flag}}
							</p>
						</div>
					</div>

						<div class="text-overview-item screen-475:text-overview-item-mobile
							screen-949:text-overview-item-mobile text-gray-c-500 font-semibold">
							Організація
						</div>

					</div>
				</div>
		</div>
	</div>
</template>

<script>
import {getDayDateString, getTextColorClass, getSVGColorClass} from "../../../Scripts/Helper.js";
import SVG_status_list from "../../ComponentsSVG/SVG_status_list.vue";
export default {
	name: "HistoryItem",
	components : {SVG_status_list},
	props : {
		log : Object,
		logs : []
  },
  methods : {
		getDate(strDate){
			return getDayDateString(strDate).replace(' ', ", ");
		},
		getTextColorClass(field, status){
			return getTextColorClass(field, status)
		},
		getSVGColorClass(field, status){
		 	return getSVGColorClass(field, status)
		},
		getChangedLogs(log){
			if (!log.old_flags) {
				return Object.keys(log.new_flags)
			}
			let res = Object.keys(log.old_flags).filter((flag) => {
				return log.old_flags[flag].flag !== log.new_flags[flag].flag
			});

			let resdesc = Object.keys(log.old_flags).filter((flag) => {
				console.log(log.old_flags[flag].description)
				console.log(log.new_flags[flag].description)
				return log.old_flags[flag].description !== log.new_flags[flag].description
			});

			return res;
		}
	}

}
</script>

<style scoped>

</style>