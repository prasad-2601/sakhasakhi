function startChat() {

  const input =
    document.getElementById("user-name-input");

  const name =
    input.value.trim();

  if (!name) {

    alert("Please enter your name 💜");

    return;
  }

  userName =
    name.charAt(0).toUpperCase() + name.slice(1);

  userInitial =
    userName.charAt(0).toUpperCase();

  const onboarding =
    document.getElementById("screen-onboarding");

  const chat =
    document.getElementById("screen-chat");

  // Hide first screen
  onboarding.style.display = "none";

  // Show chat screen
  chat.style.display = "flex";

  chat.style.flexDirection = "column";

  // Add welcome
  showWelcomeBanner();

  // First bot message
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
    "😊",
    "Calm",
    "joy"
  );

  updateMoodBadge(
    "😊",
    "Calm"
  );

  // Focus input
  setTimeout(() => {

    const msgInput =
      document.getElementById("msg-input");

    if(msgInput) {
      msgInput.focus();
    }

  }, 300);
}
