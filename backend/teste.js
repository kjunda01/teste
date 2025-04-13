for (let i = 0; i <= 100000; i++) {
  const response = await fetch("http://192.168.1.190:3000/api/auth/signup", {
    method: "POST",
    body: "",
    headers: { "Content-type": "application/json" },
  });
  const response2 = await fetch("http://192.168.1.190:3000/api/auth/signinwithpassword", {
    method: "POST",
    body: "",
    headers: { "Content-type": "application/json" },
  });
  const response3 = await fetch("http://192.168.1.190:3000/api/auth/resetpasswordforemail", {
    method: "POST",
    body: "",
    headers: { "Content-type": "application/json" },
  });
  const response4 = await fetch("http://192.168.1.190:3000/api/auth/signout", {
    method: "POST",
    body: "",
    headers: { "Content-type": "application/json" },
  });
  const response5 = await fetch("http://192.168.1.190:3000/api/auth/setsession", {
    method: "POST",
    body: "",
    headers: { "Content-type": "application/json" },
  });
  const response6 = await fetch("http://192.168.1.190:3000/api/auth/updateuserpassword", {
    method: "POST",
    body: "",
    headers: { "Content-type": "application/json" },
  });
}
