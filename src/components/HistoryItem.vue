<template>
	<div v-for="log in changeLogs" :key="log.id" class="p-4">
		<div v-if="log.action_type === 1">
			<div class="bg-[#F7F9FC] p-4 w-full">
				<p class="font-semibold text-black text-xl">{{ new Date(log.created_at).toUTCString()}}</p>
			</div>
			<div class="flex p-4">
				<p class="text-grey font-normal">{{new Date(log.created_at).toTimeString().split(' ')[0]}}</p>
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
	</div>
</template>

<script>
import {HistoryDataItem} from "../Scripts/DataItemFormat.js";
import SVG_water from "./ComponentsSVG/SVG_water.vue";

export default {
	components: {SVG_water},
	props : {
	prevState : HistoryDataItem,
	currentState : HistoryDataItem
  },
  name: "HistoryItem"
}
</script>

<style scoped>

</style>