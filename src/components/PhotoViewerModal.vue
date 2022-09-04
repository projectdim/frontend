<template>
  <div :class="this._isVisible ?`` :`hidden`"
	  class="modal-mask z-50 h-screen w-screen bg-black/30 absolute top-0"
  		ref="photoModal">
	<div class="mx-auto my-[5vh] lg:my-[10vh] modal-container w-11/12 lg:w-8/12 h-[90vh] lg:h-4/5 bg-white
				rounded-xl p-4">
	  <div class="text-xl font-semibold relative py-1 text-center">
		Photos ({{this.selectedDataItem.photo.length}})
		<button class="absolute top-0 right-0 h-4 w-4"
		@click="closeModal()">
		  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="#1D2229"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z" fill="black" fill-opacity="0.2"/>
		  </svg>
		</button>
	  </div>

	  <div class="h-4/6 w-full">
		<img :src="mainImageSrc" alt="">
	  </div>

	  <div>
		<Carousel ref="myCarousel">
		  <Slide v-for="slide in this.selectedDataItem.photo" :key="this.selectedDataItem.photo.indexOf(slide)">
			<div class="px-0.5">
			  <img :src="slide" alt="" class="w-[132px] h-[132px] object-cover rounded-lg">
			</div>
		  </Slide>
		  <template #addons>
			<Navigation/>
		  </template>
		</Carousel>
	  </div>
	</div>
  </div>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import {SelectedDataItem} from "../Scripts/DataProvider.js";
import 'vue3-carousel/dist/carousel.css';

import { ref } from 'vue';

export default {
  name: "PhotoViewerModal",
  components: {
	Carousel,
	Slide,
	Pagination,
	Navigation,
  },
  props : {
	isVisible : Boolean,
  },
  data : function (){
	return{
	  selectedDataItem : SelectedDataItem,
	  _isVisible : this.isVisible
	}
  },
  computed : {
	mainImageSrc(){
	  return this.selectedDataItem.photo[0];
	}
  },
  methods : {
	closeModal(){
	  this._isVisible = false;
	},
	showModal(){
	  alert("Show")
	  this._isVisible = true;
	}
  }

}
</script>

<style scoped>

</style>