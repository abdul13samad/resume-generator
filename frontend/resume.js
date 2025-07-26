const questions = [
  "What is your full name?",
  "What is your professional title?",
  "Write a short summary about yourself.",
  "List your key skills (comma separated).",
  "Enter your work experience (e.g., Company, Role, Duration).",
  "Enter your education background.",
  "List any certifications or awards.",
  "What languages do you speak?",
  "Enter your email address:",
  "Enter your phone number:",
  "Any social profiles or portfolio links?"
];

let currentQuestion = 0;
const answers = [];

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const nextBtn = document.getElementById("next-btn");
const resumeSection = document.getElementById("resume-section");
const resumeOutput = document.getElementById("resume-output");

function showQuestion() {
  questionText.textContent = questions[currentQuestion];

  // Set input type dynamically based on question
  if (questions[currentQuestion].toLowerCase().includes("email")) {
    answerInput.type = "email";
    answerInput.placeholder = "example@email.com";
  } else if (questions[currentQuestion].toLowerCase().includes("phone")) {
    answerInput.type = "tel";
    answerInput.placeholder = "Only digits allowed";
    answerInput.pattern = "[0-9]*";
  } else {
    answerInput.type = "text";
    answerInput.placeholder = "";
  }

  answerInput.value = "";
  answerInput.focus();
}

function validateInput(value) {
  if (questions[currentQuestion].toLowerCase().includes("email")) {
    return value.includes("@");
  }
  if (questions[currentQuestion].toLowerCase().includes("phone")) {
    return /^\d+$/.test(value);
  }
  return value.trim() !== "";
}

function showResume() {
  document.querySelector(".resume-question-container").style.display = "none";
  resumeSection.style.display = "block";

  const resume = `
Name: ${answers[0]}
Title: ${answers[1]}
Summary: ${answers[2]}
Skills: ${answers[3]}
Experience: ${answers[4]}
Education: ${answers[5]}
Certifications/Awards: ${answers[6]}
Languages: ${answers[7]}
Email: ${answers[8]}
Phone: ${answers[9]}
Social/Portfolio: ${answers[10]}
  `;
  resumeOutput.textContent = resume;
}

nextBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim();

  if (!validateInput(answer)) {
    alert("Please enter a valid response.");
    return;
  }

  answers.push(answer);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResume();
  }
});

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    nextBtn.click(); // Trigger next
  }
});

showQuestion();
