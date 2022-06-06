import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId = process.env.googleClientId;

export default function LogoutGoogle() {

  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
  };

  return (
    <div>
      <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess}></GoogleLogout>
    </div>
  );
}