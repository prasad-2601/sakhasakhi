function startChat(){

  const input =
    document.getElementById("user-name-input");

  const name =
    input.value.trim();

  if(!name){

    alert("Please enter your name 💜");

    return;
  }

  userName =
    name.charAt(0).toUpperCase() +
    name.slice(1);

  userInitial =
    userName.charAt(0).toUpperCase();

  // GET SCREENS
  const onboarding =
    document.getElementById(
      "screen-onboarding"
    );

  const chat =
    document.getElementById(
      "screen-chat"
    );

  // HIDE FIRST SCREEN
  onboarding.style.display =
    "none";

  // SHOW CHAT SCREEN
  chat.style.display =
    "flex";

  chat.style.flexDirection =
    "column";

  // FIRST BOT MESSAGE
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
    "😊",
    "Calm",
    "neutral"
  );

  updateMoodBadge(
    "😊",
    "Calm"
  );

  // FOCUS INPUT
  setTimeout(() => {

    const msgInput =
      document.getElementById(
        "msg-input"
      );

    if(msgInput){

      msgInput.focus();
    }

  }, 300);
}
