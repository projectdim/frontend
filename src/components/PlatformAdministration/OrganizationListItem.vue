<template>
	<div @click="HideMenu" @mouseleave="HideMenu" class="min-h-[182px] w-[290px] border border-gray-c-300 rounded-lg p-4 relative">
		<div @click.stop="ShowMenu" class="absolute top-2 right-4 cursor-pointer px-1 py-3 rounded-full hover:bg-blue-c-200">
			<img  src="/src/assets/dots.svg">
		</div>

		<div @click.stop ref="menu" class="p-2 rounded-lg shadow-cs3 absolute top-1 right-6
			w-[230px] h-[84px] font-semibold bg-white"
			:class="{
				'hidden' : !isMenuVisible,
				'absolute' : isMenuVisible
			}">
			<button class="p-1 text-h3 text-blue-c-500
				cursor-pointer hover:bg-blue-c-100 w-full text-left"
			@click.stop="goToOrgProfile">
        {{ $t('general.details') }}
			</button>
			<button class="p-1 text-h3 text-red-c-500
			cursor-pointer hover:bg-blue-c-100 w-full text-left"
			@click="removeOrg">
				{{ $t('general.delete' )}}
			</button>
		</div>

		<img class="block h-[60px] w-[60px] mx-auto mt-6" src="/src/assets/Organizations/avatar.svg">

		<div class="text-body-1 text-center font-semibold mt-4 mb-1 break-words">
			{{organization.name}}
<!--			Organization name-->
		</div>

		<div class="text-center text-b3 text-gray-c-500">
<!--			organization.com-->
			{{organization.site}}
		</div>
	</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
	name: "OrganizationListItem",
	emits : ["remove"],
	props : {
		organization : {
			//required : true,
			type : Object
		}
	},
	data () {
		return {
			isMenuVisible: false
		}
	},
	methods : {
		...mapActions(["setSelectedOrganization"]),
		ShowMenu(){
			this.isMenuVisible = !this.isMenuVisible;
		},
		HideMenu(){
			this.isMenuVisible = false;
		},
		goToOrgProfile(){
			//console.log("Go to org profile")
			this.setSelectedOrganization(this.organization);
			this.$router.push(`organization-profile/${this.organization.id}`);
		},
		removeOrg(){
			this.$emit("remove", this.organization);
		}
	}
}
</script>

<style scoped>

</style>