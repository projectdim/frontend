import instance from "./instance.js";

import locations from "./locations.js";
import user from "./user.js";
import organizations from "./organizations.js";

export default {
    locations: locations(instance),
    user: user(instance),
    organizations : organizations(instance)
}
