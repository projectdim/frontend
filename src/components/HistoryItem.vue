<template>
	<div v-if="log.action_type === 1">
		<div class="bg-gray-light-100 py-2 px-6 w-full shadow-2cs">
			<p class="font-semibold text-black text-sidebar-title capitalize">
				{{getDate(log.created_at)}}
			</p>
		</div>
		<div class="py-4 px-6 flex gap-x-4 shadow-2cs">
			<div class="text-base-grey text-overview-item font-normal pt-2.5">
				{{new Date(log.created_at).toTimeString().split(' ')[0]}}
			</div>
			<div class="w-full">
				<div v-for="change in Object.keys(log.old_flags)" class="my-2.5 flex flex-wrap gap-2 font-semibold">
					<div class="flex gap-2">
						<p class="w-4 h-6">
							<SVG_status_list :icon='change' :classList="getSVGColorClass(change, log.old_flags[change])"/>
						</p>
						<p class="grow text-overview-item my-auto uppercase" :class="getTextColorClass(change,log.old_flags[change])">
							{{log.old_flags[change]}}
						</p>
					</div>
					<img src="/src/assets/change-arrow.svg" class="h-6 w-6">
					<div class="flex gap-2">
						<p class="w-4 h-6">
							<SVG_status_list :icon='change' :classList="getSVGColorClass(change, log.new_flags[change])"/>
						</p>
						<p class="grow text-overview-item my-auto uppercase text-base"
							:class="getTextColorClass(change, log.new_flags[change])">
							{{log.new_flags[change]}}
						</p>
				</div>
				</div>
				<div class="text-overview-item text-base-grey font-semibold">Організація</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getDayDate, GetStateColor} from "../Scripts/Helper.js";
import SVG_status_list from "./ComponentsSVG/SVG_status_list.vue";
export default {
	name: "HistoryItem",
	components : {SVG_status_list},
	props : {
		log : Object
  },
	methods : {
		getDate(strDate){
			return getDayDate(strDate).replace(' ', ", ");
		},
		getTextColorClass(field, status){
			let color = GetStateColor(field,status);
			if(color === "red")
				return 'text-dangerous-red';
			else if(color === "green")
				return 'text-safety-green';
			else if(color === "yellow")
				return 'text-yellow-custom-400';
		},
		getSVGColorClass(field, status){
			let color = GetStateColor(field,status);
			if(color === "red")
				return 'fill-dangerous-red';
			else if(color === "green")
				return 'fill-safety-green';
			else if(color === "yellow")
				return 'fill-yellow-custom-400';
		},
	}

}
</script>

<style scoped>

</style>