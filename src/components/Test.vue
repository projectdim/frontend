<template>

  <transition name="fade">
    <p v-if="anim">akscfodiksan</p>
  </transition>

	<test-modal v-model="modal"></test-modal>
  <button @click="toogle">
    toggle
  </button>
	<button @click="Foo">
		modal
	</button>
</template>

<script>
import testModal from "./Modals/testModal.vue";
export default {
  name: "Test",
	components: {
		testModal
	},
	props: {
		msg : String,
		msg2 : String,
  },
  methods : {
		Foo(){
	  	this.$vfm.show('testModal');
		},
		Foo2(){
	  	this.key1 = "TestKey";
	  	this.$emit("event1", this.key1);
		},
		Inc(){
			this.$store.commit('increment');
		},
		IncAsync(){
			this.$store.dispatch('increment');
		},
    toogle(){
      setTimeout(()=>{
        this.anim = !this.anim;
      }, 2000)
    }
  },
  data : function () {
		return {
	  	key1 : "key1",
	  	key2 : "key2",
	  	key3 : "key3",
      anim : true,
			modal : false
		}
  },
  watch : {
		msg : function (newValue, oldValue){
	  	alert(`${newValue} and ${oldValue}`);
		}
  },
	computed : {
		count(){
			return this.$store.state.count;
		},
		countGetters(){
			return this.$store.getters.getCounts;
		}
	}
}
</script>

<style>
.fade-enter-active {
  transition: all, 2s, ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
