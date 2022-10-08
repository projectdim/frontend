<template>
	<ModalTemplate :classList="'grid place-items-end'" :close-func="closeModal"
	:is-modal-visible="isSettingVisible">
    <div class="w-[600px] h-screen overflow-y-auto bg-white p-9
    screen-475:p-2 screen-949:p-2" @click.stop>
<!--      Header-->
      <div class="flex justify-between mb-6">
        <h1 class="title">Settings</h1>
        <button-text1 class="w-[100px] block" @click="closeModal">Close</button-text1>
      </div>

<!--    FORM-->
      <div class="text-overview-item-mobile text-gray-light-500">
        <label for="setting-name">Ім'я</label>
        <input1 id="setting-name" placeholder="Ім'я" class="w-full text-black mt-1 mb-6"></input1>
        <label for="setting-mail">E-mail</label>
        <input1 id="setting-mail" placeholder="E-mail" class="w-full text-black mt-1 mb-6" disabled></input1>
        <label for="setting-pass">Пароль</label>
        <input-pass id="setting-pass" placeholder="Пароль" class="text-black mt-1 mb-6"></input-pass>
        <label for="setting-new-pass">Новий пароль</label>
        <input-pass id="setting-new-pass" placeholder="Новий пароль" class="text-black mt-1 mb-6"></input-pass>
        <ButtonOptions :button-color="'blue'">
          Змінити пароль...
        </ButtonOptions>
      </div>

    </div>
	</ModalTemplate>
</template>

<script>
import ButtonText1 from "./Buttons/Button_text_1.vue";
import Input1 from "./Inputs/Input-1.vue";
import InputPass from "./Inputs/Input-pass.vue";
import ButtonOptions from "./Buttons/Button-options.vue";
import ModalTemplate from "./Modals/ModalTemplate.vue";
export default {
  name: "UserSetting",
	emits : ["close"],
  components: {ModalTemplate, InputPass, Input1, ButtonText1, ButtonOptions},
  props : {
    isSettingVisible : {
      type : Boolean,
      default : false
    }
  },
	methods : {
		closeModal(){
			this.$emit("close");
		}
	}
}
</script>

<style scoped>

</style>
