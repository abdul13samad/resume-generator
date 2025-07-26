function selectPlan(plan) {
  localStorage.setItem("selectedPlan", plan);
  if (plan === "free") {
    window.location.href = "resume.html";
  } else {
    window.location.href = "payment.html";
  }
}
