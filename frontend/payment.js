document.getElementById("payment-form").addEventListener("submit", e => {
  e.preventDefault();
  const plan = localStorage.getItem("selectedPlan");
  const email = localStorage.getItem("email") || "user@example.com";

  fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, plan })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = "resume.html";
      } else {
        alert("Subscription failed.");
      }
    });
});
