export default function (instance){
  return {
    getOrganizationsById(id){
      return instance.get(`/organizations/${id}`);
    }
  }
}