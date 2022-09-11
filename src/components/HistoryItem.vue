<template>

</template>

<script>
import {HistoryDataItem} from "../Scripts/DataItemFormat.js";

export default {
  props : {
	prevState : HistoryDataItem,
	currentState : HistoryDataItem
  },
  name: "HistoryItem"
}
</script>

<style scoped>

</style>