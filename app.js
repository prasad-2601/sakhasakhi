function startChat() {

  const input =
    document.getElementById("user-name-input");

  const name =
    input.value.trim();

  if (!name) {

    input.style.borderColor = "#ec4899";

    input.placeholder =
      "Please enter your name 💜";

    input.focus();

    return;
  }

  userName =
    name.charAt(0).toUpperCase() +
    name.slice(1);

  userInitial =
    userName.charAt(0).toUpperCase();

  // Hide onboarding screen
  const onboarding =
    document.getElementById("screen-onboarding");

  onboarding.style.display = "none";

  // Show chat screen
  const chat =
    document.getElementById("screen-chat");

  chat.style.display = "flex";

  // Welcome banner
  showWelcomeBanner();

  // First bot message
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi — your companion always. How are you feeling today?`,
    "😊",
    "Calm",
    "joy"
  );

  updateMoodBadge(
    "😊",
    "Calm"
  );

  setTimeout(() => {

    document
      .getElementById("msg-input")
      .focus();

  }, 300);
}
