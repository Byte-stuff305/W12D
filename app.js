// Cookie helper
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    expires = "; expires=" + d.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("🛠️ Logging in with:", { email, password });

  axios.post(
    "https://reqres.in/api/login",
    { email, password },
    {
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    }
  )
  .then(res => {
    console.log("✅ Login successful:", res.data);
    setCookie("sessionToken", res.data.token, 1);
    window.location.href = "home.html";
  })
  .catch(err => {
    console.error("❌ Login failed:", err.response?.data || err);
    document.getElementById("message").innerText = "Invalid login credentials.";
  });
});
