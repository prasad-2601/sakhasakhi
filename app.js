function startChat(){

  const input =
    document.getElementById("user-name-input");

  if(!input) return;

  const name =
    input.value.trim();

  if(name === ""){

    alert("Please enter your name 💜");

    return;
  }

  userName =
    name.charAt(0).toUpperCase() +
    name.slice(1);

  userInitial =
    userName.charAt(0).toUpperCase();

  // GET ELEMENTS
  const onboarding =
    document.getElementById(
      "screen-onboarding"
    );

  const chat =
    document.getElementById(
      "screen-chat"
    );

  // SAFETY CHECK
  if(!onboarding || !chat){

    console.log(
      "Screen elements not found"
    );

    return;
  }

  // SHOW CHAT FIRST
  chat.style.display = "flex";

  // HIDE ONBOARDING AFTER
  onboarding.style.display = "none";

  // FORCE LAYOUT
  chat.style.visibility = "visible";

  chat.style.opacity = "1";

  chat.style.flexDirection = "column";

  chat.style.justifyContent =
    "space-between";

  // FIRST MESSAGE
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

  }, 200);
}
