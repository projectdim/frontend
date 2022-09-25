<template>
  <div class="px-6 py-6 flex flex-col justify-between h-full">
    <div>
      <p class="font-semibold text-4xl">На жаль, "{{ address }}" немає в нашій базі даних</p>
      <p class="mt-2.5 text-base-grey text-base">Ви можете запитати інформацію за цією адресою, і наша команда постарається приїхати туди якомога швидше.</p>
      <button class="bg-[#2E60B3] rounded-lg px-32 py-2 text-white text-base mt-8 w-full">Надислати запит на перевірку адреси</button>
      <p class="mt-8 text-base text-[#64748C]">Буде корисно, якщо ви повідомите нам через цю форму про будь-які проблеми, пов’язані з використанням нашого сервісу.</p>
      <div class="h-min">
		  	<textarea id="issueMessage"
                  class="min-h-[68px] resize-none h-max w-full border-gray-light-300 border rounded-lg px-4 py-2 my-4
					text-overview-item"
                  placeholder="Залишити повідомлення..." v-model="issueMessage"></textarea>
        <button @click="this.Show(issueMessage)"
                :disabled="this.isDisabled"
                :class="this.isDisabled ? `bg-gray-light-200 text-base-grey`:
					`bg-blue-200 text-base-blue hover:border-base-blue`"
                class="block border rounded-lg bg-[#F0F4FA] px-12 py-2 text-[#91A2BD]">
          Відправити
        </button>
      </div>
    </div>
    <div id="contact" class="p-6 bg-gray-light-100">
      <div class="font-semibold text-overview-item">Урядові контакти</div>
      <div class="flex flex-wrap justify-between py-1 shadow-2cs mt-2">
        <p class="text-overview-item">Служба безпеки України</p>
        <p class="text-right font-semibold text-base-blue">
          <a href="tel: +380800501482">
            0 800 501 482
          </a>
        </p>
      </div>
      <div class="flex flex-wrap justify-between py-1">
        <p class="text-overview-item">Державна прикордонна служба України</p>
        <p class="text-right font-semibold text-base-blue">
          <a href="tel: +380445276363">
            +38 (044) 527-63-63
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    address: String
  }
}
</script>

<style scoped>

</style>
