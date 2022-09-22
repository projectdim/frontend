<template>
		<div v-if="log.action_type === 1">
			<div class="bg-gray-light-100 p-4 w-full">
				<p class="font-semibold text-black text-xl">{{ new Date(log.created_at).toUTCString()}}</p>
			</div>
			<div class="flex p-4">
				<p class="text-grey font-normal">
					{{new Date(log.created_at).toTimeString().split(' ')[0]}}
					{{getDate(log.create_at)}}
				</p>
				<div v-for="change in Object.keys(log.old_flags)" class="flex mx-auto gap-4">
<!--					<img class="fill-dangerous-red"
							 :src="`/src/assets/buildingState/${change}.svg`">-->
					<p>
						<SVG_water fill-class="fill-dangerous-red"/>
					</p>
					<p class="grow font-semibold text-overview-item my-auto uppercase text-base"
						 :class="log.old_flags[change] === `Неушкоджена` ? 'text-safety-green' : 'text-dangerous-red'">
						{{log.old_flags[change]}}
					</p>
				</div>
				<img src="/src/assets/change-arrow.svg">
				<div v-for="change in Object.keys(log.new_flags)" class="flex mx-auto gap-4">
					<img class="fill-dangerous-red"
							 :src="`/src/assets/buildingState/${change}.svg`">
					<p class="grow font-semibold text-overview-item my-auto uppercase text-base"
						 :class="log.new_flags[change] === `Неушкоджена` ? 'text-safety-green' : 'text-dangerous-red'">
						{{log.new_flags[change]}}
					</p>
				</div>
			</div>
			<hr>
		</div>
</template>

<script>
import SVG_water from "./ComponentsSVG/SVG_water.vue";
import {getDayDate} from "../Scripts/Helper.js";

export default {
	name: "HistoryItem",
	components: {SVG_water},
	props : {
		log : Object
  },
	methods : {
		getDate(strDate){
			return getDayDate(strDate);
		}
	}

}
</script>

<style scoped>

</style>