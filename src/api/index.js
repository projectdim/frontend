import instance from "./instance.js";

import locations from "./locations.js";
import user from "./user.js";

export default {
    locations: locations(instance),
    user: user(instance)
}
