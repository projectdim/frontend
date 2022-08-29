<template>
  <p>{{Foo()}}</p>
  <button @click="Foo2()">Click</button>
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
  }
}
</script>

<style scoped>

</style>