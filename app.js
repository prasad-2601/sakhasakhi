function startChat(){

  try{

    const input =
      document.getElementById(
        "user-name-input"
      );

    if(!input){

      alert("Input not found");

      return;
    }

    const name =
      input.value.trim();

    if(name === ""){

      alert(
        "Please enter your name 💜"
      );

      return;
    }

    // SAVE USER
    userName =
      name.charAt(0).toUpperCase() +
      name.slice(1);

    userInitial =
      userName.charAt(0);

    // GET SCREENS
    const onboarding =
      document.getElementById(
        "screen-onboarding"
      );

    const chat =
      document.getElementById(
        "screen-chat"
      );

    // SHOW CHAT
    chat.style.display =
      "flex";

    // HIDE ONBOARDING
    onboarding.style.display =
      "none";

    // FORCE FLEX
    chat.style.flexDirection =
      "column";

    chat.style.justifyContent =
      "space-between";

    // SAFE CHAT WINDOW CHECK
    const chatWindow =
      document.getElementById(
        "chat-window"
      );

    if(chatWindow){

      appendBotMessage(
        `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
        "😊",
        "Calm",
        "neutral"
      );

    }

    // MOOD BADGE
    updateMoodBadge(
      "😊",
      "Calm"
    );

    // INPUT FOCUS
    const msgInput =
      document.getElementById(
        "msg-input"
      );

    if(msgInput){

      setTimeout(() => {

        msgInput.focus();

      }, 200);
    }

  }catch(error){

    console.log(error);

    alert(
      "JS Error: " + error.message
    );
  }
}
