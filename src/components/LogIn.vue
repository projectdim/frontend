<template>
	<div>
		<Header/>
		LogInPage
		<router-link to="/">WelcomeScreen</router-link>
	</div>
</template>

<script>
import Header from "./Header.vue";
export default {
	name: "LogIn",
	components: {Header}
}
</script>

<style scoped>

</style>