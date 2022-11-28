
export  default {
  data(){
    return  {
      userRoles : {
        user : "user",
        aidWorker : "aid_worker",
        organizationAdmin : "organization_administrator",
        platformAdmin: "platform_administrator"
      }
    }
  },
  methods : {
    isRoleHaveAccess(userRole, requireRole){
      let roles = {
        "user" : ["user"],
        "aid_worker" : ["user", "aid_worker"],
        "organization_administrator" : ["user", "aid_worker", "organization_administrator"],
        "platform_administrator" : ["user", "aid_worker", "organization_administrator", "platform_administrator"],
      }
      console.log(`${userRole} ${requireRole}`)
      return roles[userRole].includes(requireRole);
    }
  }
}