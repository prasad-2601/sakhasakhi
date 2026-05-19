// ======================================
// SAKHA-SAKHI COMPLETE WORKING JS
// ======================================

// GLOBAL VARIABLES
let userName = "";
let userInitial = "";

// ======================================
// START CHAT
// ======================================

function startChat() {

  try {

    // INPUT
    const input =
      document.getElementById(
        "user-name-input"
      );

    if (!input) {

      alert("Input field not found");
      return;
    }

    // USER NAME
    const name =
      input.value.trim();

    if (name === "") {

      alert(
        "Please enter your name 💜"
      );

      return;
    }

    // SAVE USER
    userName =
      name;

    userInitial =
      name.charAt(0).toUpperCase();

    // SCREENS
    const onboarding =
      document.getElementById(
        "screen-onboarding"
      );

    const chatScreen =
      document.getElementById(
        "screen-chat"
      );

    if (!onboarding || !chatScreen) {

      alert("Screen error");
      return;
    }

    // SWITCH SCREEN
    onboarding.style.display =
      "none";

    chatScreen.style.display =
      "flex";

    chatScreen.style.flexDirection =
      "column";

    // BOT WELCOME MESSAGE
    appendBotMessage(
      `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
      "😊",
      "Calm"
    );

    // UPDATE MOOD
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

      if (msgInput) {

        msgInput.focus();
      }

    }, 200);

  } catch (error) {

    console.log(error);

    alert(
      "Error: " + error.message
    );
  }
}

// ======================================
// BOT MESSAGE
// ======================================

function appendBotMessage(
  text,
  moodEmoji,
  moodLabel
) {

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  if (!chatWindow) return;

  // ROW
  const row =
    document.createElement("div");

  row.className =
    "msg-row bot-row";

  row.innerHTML = `

    <div class="msg-avatar">
      🌸
    </div>

    <div class="msg-bubble-wrap">

      <div class="msg-bubble bot-bubble">

        ${text}

      </div>

      <div
        style="
          display:flex;
          gap:8px;
          align-items:center;
          margin-top:6px;
        "
      >

        <span class="msg-time">

          ${getTime()}

        </span>

        <span class="msg-emotion-tag">

          ${moodEmoji}
          ${moodLabel}

        </span>

      </div>

    </div>
  `;

  chatWindow.appendChild(row);

  scrollToBottom();
}

// ======================================
// USER MESSAGE
// ======================================

function appendUserMessage(text) {

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  if (!chatWindow) return;

  // ROW
  const row =
    document.createElement("div");

  row.className =
    "msg-row user-row";

  row.innerHTML = `

    <div class="msg-avatar user-avatar">

      ${userInitial}

    </div>

    <div class="msg-bubble-wrap">

      <div class="msg-bubble user-bubble">

        ${text}

      </div>

      <span class="msg-time">

        ${getTime()}

      </span>

    </div>
  `;

  chatWindow.appendChild(row);

  scrollToBottom();
}

// ======================================
// SEND MESSAGE
// ======================================

function sendMessage() {

  try {

    const input =
      document.getElementById(
        "msg-input"
      );

    if (!input) {

      alert("Message input not found");
      return;
    }

    // GET MESSAGE
    const text =
      input.value.trim();

    // EMPTY CHECK
    if (text === "") return;

    // USER MESSAGE
    appendUserMessage(text);

    // CLEAR INPUT
    input.value = "";

    // AUTO BOT REPLY
    setTimeout(() => {

      appendBotMessage(
        "I'm here with you 💜",
        "😊",
        "Supportive"
      );

    }, 700);

  } catch (error) {

    console.log(error);

    alert(
      "Send Error: " + error.message
    );
  }
}

// ======================================
// MOOD BADGE
// ======================================

function updateMoodBadge(
  emoji,
  label
) {

  const moodEmoji =
    document.getElementById(
      "mood-emoji"
    );

  const moodLabel =
    document.getElementById(
      "mood-label"
    );

  if (moodEmoji) {

    moodEmoji.innerText =
      emoji;
  }

  if (moodLabel) {

    moodLabel.innerText =
      label;
  }
}

// ======================================
// SCROLL TO BOTTOM
// ======================================

function scrollToBottom() {

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  if (chatWindow) {

    chatWindow.scrollTop =
      chatWindow.scrollHeight;
  }
}

// ======================================
// GET TIME
// ======================================

function getTime() {

  return new Date()
    .toLocaleTimeString([], {

      hour: "2-digit",
      minute: "2-digit"

    });
}

// ======================================
// ENTER KEY SUPPORT
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const input =
      document.getElementById(
        "msg-input"
      );

    if (input) {

      input.addEventListener(
        "keydown",
        function (e) {

          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {

            e.preventDefault();

            sendMessage();
          }
        }
      );
    }
  }
);
