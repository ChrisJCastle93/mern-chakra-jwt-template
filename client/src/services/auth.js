import axios from "axios";
class auth {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }

  signup = (username, email, password) => {
    return axios
      .post(
        `${this.baseUrl}/api/auth/signup`,
        { username, email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };

  login = (username, password) => {
    return axios
      .post(
        `${this.baseUrl}/api/auth/login`,
        { username, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };

  googleAuth = (email, googleId) => {
    return axios
      .post(
        `${this.baseUrl}/api/auth/googleAuth`,
        { email, googleId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };

  logout = () => {
    localStorage.removeItem("user");
  };

  isLoggedIn = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
}

const authService = new auth();

export default authService;
