import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  //執行AuthService的register()會幫你post到API_URL/register，並自動帶入後面的4個參數
  register(username, email, password, role) {
    console.log("用戶正在執行register");
    //會return一個promise物件
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
