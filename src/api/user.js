import state from "vuex";


export default function (instance){
  return {
    LogIn(payload){
      return instance.post('/auth/login/token', payload,
        {headers : {'Content-Type': 'multipart/form-data'}});
    },
    GetInfo(credentials){
      /*let credentials = {...mapGetters(['getToken'])}.getToken;
      if(credentials === null)
        throw new Error("Credentials is null");
      else {
        console.log(credentials)*/
        return instance.get('/users/me', {headers: {'Authorization': credentials}})
      //}
    }
  }
}