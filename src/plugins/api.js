import { inject } from "vue";
import apiInjection from "../api/index";


export default {
    setup() {
        const api = inject(apiInjection);
        return {
            api
        }
    }
}
