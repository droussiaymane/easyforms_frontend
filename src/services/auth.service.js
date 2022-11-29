import axios from "axios";
const API_URL_AUTH='http://localhost:8080/auth/';
class AuthService {
  
  login(mail, password) {
    let config = {
      headers: {
        'Access-Control-Allow-Origin': "http://localhost:3000",
        "Access-Control-Allow-Headers": "X-Requested-With"
      }
    }
    return axios
      .post(API_URL_AUTH + "login", {
        mail,
        password
      },config
      )
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("role", JSON.stringify(response.data.role));

        }
        return response.data;
      });
  }

  loginTemporery(id){
    return axios.get(API_URL_AUTH+"logintemporery/"+id).then(response => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        localStorage.setItem("id", JSON.stringify(response.data.id));
        localStorage.setItem("role", JSON.stringify("ROLE_USER"));

      }
      return response.data;
    });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("role");


  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('id'));
  }
  getCurrentUserToken() {
    return JSON.parse(localStorage.getItem('user'));
  }
 
  getCurrentRole(){
    return JSON.parse(localStorage.getItem('role'));
  }
  islogged(){
    return JSON.parse(localStorage.getItem('role'))!=undefined && JSON.parse(localStorage.getItem('user'))!=undefined && JSON.parse(localStorage.getItem('id'))!=undefined;
  }
}
export default new AuthService();