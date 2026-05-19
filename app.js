function startChat() {

  const input = document.getElementById("user-name-input");

  const name = input.value.trim();

  // Empty validation
  if (!name) {

    input.style.borderColor = "#ec4899";

    input.placeholder = "Please enter your name 💜";

    input.focus();

    setTimeout(() => {

      input.style.borderColor = "";

      input.placeholder = "Your name...";

    }, 2000);

    return;
  }

  // Save username
  userName =
    name.charAt(0).toUpperCase() + name.slice(1);

  userInitial =
    userName.charAt(0).toUpperCase();

  // Get screens
  const onboarding =
    document.getElementById("screen-onboarding");

  const chat =
    document.getElementById("screen-chat");

  // Hide onboarding
  onboarding.style.display = "none";

  // Show chat
  chat.style.display = "flex";

  // Add welcome section
  showWelcomeBanner();

  // Add first bot message
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi — your companion always. How are you feeling today?`,
    "😊",
    "Calm",
    "joy"
  );

  // Update mood badge
  updateMoodBadge("😊", "Calm");

  // Focus message input
  setTimeout(() => {

    document.getElementById("msg-input").focus();

  }, 300);
}
