// GLOBAL VARIABLES
let userName = "";
let userInitial = "";

// ─────────────────────────────
// START CHAT
// ─────────────────────────────

function startChat() {

  try {

    const input =
      document.getElementById(
        "user-name-input"
      );

    if (!input) {

      alert("Input not found");
      return;
    }

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

    if (!onboarding || !chat) {

      alert("Screen elements missing");
      return;
    }

    // SHOW CHAT
    chat.style.display = "flex";

    // HIDE ONBOARDING
    onboarding.style.display = "none";

    // FORCE FLEX
    chat.style.flexDirection = "column";

    chat.style.justifyContent =
      "space-between";

    // WELCOME MESSAGE
    appendBotMessage(
      `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
      "😊",
      "Calm"
    );

    // UPDATE BADGE
    if (typeof updateMoodBadge === "function") {

      updateMoodBadge(
        "😊",
        "Calm"
      );
    }

    // INPUT FOCUS
    const msgInput =
      document.getElementById(
        "msg-input"
      );

    if (msgInput) {

      setTimeout(() => {

        msgInput.focus();

      }, 200);
    }

  } catch (error) {

    console.log(error);

    alert(
      "JS Error: " + error.message
    );
  }
}

// ─────────────────────────────
// APPEND BOT MESSAGE
// ─────────────────────────────

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
          margin-top:4px;
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

// ─────────────────────────────
// APPEND USER MESSAGE
// ─────────────────────────────

function appendUserMessage(text) {

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  if (!chatWindow) return;

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

// ─────────────────────────────
// SCROLL
// ─────────────────────────────

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

// ─────────────────────────────
// TIME
// ─────────────────────────────

function getTime() {

  return new Date()
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
}
