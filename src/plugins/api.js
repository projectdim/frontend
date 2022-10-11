import { inject } from "vue";
import apiInjection from "../api/index";


export default {
    setup() {
        const api = inject(apiInjection);
        const $vfm = inject('$vfm');
        return {
            api,
            $vfm
        }
    }
}
