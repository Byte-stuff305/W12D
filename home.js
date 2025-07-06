window.addEventListener("DOMContentLoaded", () => {
  const token = getCookie('sessionToken');
  const welcome = document.getElementById("welcomeMessage");
  const colorsDiv = document.getElementById("colors");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!token) {
    welcome.innerText = "No one is logged in.";
    const loginLink = document.createElement("a");
    loginLink.href = "index.html";
    loginLink.innerText = "Go to Login";
    colorsDiv.appendChild(loginLink);
    return;
  }

  welcome.innerText = "Welcome back, trainer!";
  logoutBtn.style.display = "inline-block";

  // Fetch colors
  axios.get('https://reqres.in/api/unknown')
    .then(response => {
      const colors = response.data.data;
      colors.forEach(color => {
        const div = document.createElement("div");
        div.className = "color-box";
        div.style.backgroundColor = color.color;
        div.innerHTML = `
          <p><strong>${color.name}</strong></p>
          <p>Year: ${color.year}</p>
        `;
        colorsDiv.appendChild(div);
      });
    });

  // Logout functionality
  logoutBtn.addEventListener("click", () => {
    deleteCookie('sessionToken');
    window.location.href = "index.html";
  });
});
