import axios from "axios";

class google {
  getProfileInfo = async (tokenResponse) => {
      
    const response = await axios.get("https://people.googleapis.com/v1/people/me?personFields=names%2CemailAddresses%2C", { headers: { Authorization: `Bearer ${tokenResponse.access_token}`, Accept: "application/json" } });

    return {
      email: response.data.emailAddresses[0].value,
      username: response.data.names[0].displayName,
    };
  };
}

const googleService = new google();

export default googleService;
