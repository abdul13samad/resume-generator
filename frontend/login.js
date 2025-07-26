document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  window.location.href = "subscription.html";
});

function loginWithGoogle() {
  alert("Google login coming soon");
  window.location.href = "subscription.html";
}

function loginWithGitHub() {
  alert("GitHub login coming soon");
  window.location.href = "subscription.html";
}
