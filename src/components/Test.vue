<template>
  <p>Count {{this.count}}</p>
	<p>Getter count {{this.countGetters}}</p>
  <button @click="Inc()">Increment</button>
	<button @click="IncAsync()">Increment async</button>
</template>

<script>
export default {
  name: "Test",
  props: {
		msg : String,
		msg2 : String,
  },
  methods : {
		Foo(){
	  	return this.msg + "Foo";
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
		}
  },
  data : function () {
		return {
	  	key1 : "key1",
	  	key2 : "key2",
	  	key3 : "key3",
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

<style scoped>

</style>