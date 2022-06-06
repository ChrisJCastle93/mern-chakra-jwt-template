export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    console.log("RETURNING AUTH");
    return `Bearer ${user.token}`;
  } else {
    return {};
  }
}
