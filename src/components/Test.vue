<template>
	<h1 class="w-full py-2 text-2xl text-center">Welcome to test screen</h1>
	<div class="mobile:w-full w-[500px] mx-auto">
		<LocalizationDropDown class="mx-auto"/>
	</div>
</template>

<script>
import RemoveOrgModal from "./PlatformAdministration/RemoveOrgModal.vue";
import LocalizationDropDown from "./Other/LocalizationDropDown.vue";
export default {
  name: "Test",
	components: {LocalizationDropDown, RemoveOrgModal},
	methods : {
		getCookie(cname) {
			let name = cname + "=";
			let decodedCookie = decodeURIComponent(document.cookie);
			let ca = decodedCookie.split(';');
			for(let i = 0; i <ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		logCookie(){
			let c = this.getCookie("vuex")
			console.log(JSON.stringify(c));
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
