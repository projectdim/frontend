<template>
	<div>
		<RemoveOrgModal
			:organization="{name : 'Organization'}"
			is-visible="true"
		/>
	</div>
</template>

<script>
import RemoveOrgModal from "./PlatformAdministration/RemoveOrgModal.vue";
export default {
  name: "Test",
	components: {RemoveOrgModal},
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
