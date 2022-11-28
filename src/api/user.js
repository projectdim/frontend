
export default function (instance){
  return {
    LogIn(payload){
      return instance.post('/auth/login/token', payload,
        {headers : {'Content-Type': 'multipart/form-data'}});
    },
    GetInfo(){
        return instance.get('/users/me')
    },
    UpdateUserData(payload){
      return instance.put('/users/info', payload);
    },
    UpdateUserPass(payload){
      return instance.put('/users/password', payload)
    },
    //TODO зміни на "/users/confirm-registration"
    RegistrationUser(username, email, full_name, organization, password){
      return instance.post("/users/register",{
        username,
        email,
        full_name,
        organization : 34,
        password
      })
    },
  }
}