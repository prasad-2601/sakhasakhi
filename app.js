// ======================================
// GLOBAL VARIABLES
// ======================================

let userName = "";
let userInitial = "";

// ======================================
// START CHAT
// ======================================

function startChat() {

  try {

    const input =
      document.getElementById(
        "user-name-input"
      );

    if (!input) {

      alert("Input field not found");
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
    userName = name;

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

    if (
      !onboarding ||
      !chatScreen
    ) {

      alert("Screen elements not found");
      return;
    }

    // SWITCH SCREEN
    onboarding.style.display =
      "none";

    chatScreen.style.display =
      "flex";

    chatScreen.style.flexDirection =
      "column";

    // WELCOME MESSAGE
    appendBotMessage(
      `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
      "😊",
      "Calm"
    );

    // MOOD
    updateMoodBadge(
      "😊",
      "Calm"
    );

    // FOCUS INPUT - RETRY LOGIC
    let attempts = 0;
    const focusInterval = setInterval(() => {

      const msgInput =
        document.getElementById(
          "msg-input"
        );

      if (msgInput) {

        msgInput.focus();
        clearInterval(focusInterval);
        
        // Attach event listener after input is focused
        attachMessageListeners();
      }

      attempts++;
      if (attempts > 10) {
        clearInterval(focusInterval);
        console.warn("msg-input not found after retries");
      }

    }, 100);

  } catch (error) {

    console.error("Start Error:", error);

    alert(
      "Start Error: " +
      error.message
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
          margin-top:6px;
          align-items:center;
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

function appendUserMessage(
  text
) {

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
      console.error("msg-input not found");
      return;
    }

    const text =
      input.value.trim();

    if (text === "") return;

    // USER MESSAGE
    appendUserMessage(text);

    // CLEAR INPUT
    input.value = "";

    // LOWERCASE
    const msg =
      text.toLowerCase();

    // DEFAULT
    let reply =
      "I'm here with you 💜";

    let emoji =
      "😊";

    let mood =
      "Calm";

    // GREETING
    if (
      msg.includes("hi") ||
      msg.includes("hello") ||
      msg.includes("hey")
    ) {

      reply =
        `Hey ${userName}! 💜 Nice talking with you.`;

      emoji =
        "👋";

      mood =
        "Friendly";
    }

    // HAPPY
    else if (
      msg.includes("happy") ||
      msg.includes("good") ||
      msg.includes("great")
    ) {

      reply =
        "That makes me happy too 🌸";

      emoji =
        "😄";

      mood =
        "Happy";
    }

    // SAD
    else if (
      msg.includes("sad") ||
      msg.includes("cry") ||
      msg.includes("upset")
    ) {

      reply =
        "I'm always here for you 💜 You're not alone.";

      emoji =
        "🥺";

      mood =
        "Supportive";
    }

    // STRESS
    else if (
      msg.includes("stress") ||
      msg.includes("tired") ||
      msg.includes("pressure")
    ) {

      reply =
        "You've been handling a lot 🌸 Don't forget to rest.";

      emoji =
        "💜";

      mood =
        "Caring";
    }

    // EXAMS
    else if (
      msg.includes("exam") ||
      msg.includes("study") ||
      msg.includes("college")
    ) {

      reply =
        "You can do this 💪 I believe in you.";

      emoji =
        "📚";

      mood =
        "Motivating";
    }

    // LOVE
    else if (
      msg.includes("love")
    ) {

      reply =
        "Love is such a beautiful emotion 💖";

      emoji =
        "😍";

      mood =
        "Lovely";
    }

    // THANKS
    else if (
      msg.includes("thank")
    ) {

      reply =
        "You're always welcome 💜";

      emoji =
        "😊";

      mood =
        "Warm";
    }

    // UPDATE BADGE
    updateMoodBadge(
      emoji,
      mood
    );

    // BOT RESPONSE
    setTimeout(() => {

      appendBotMessage(
        reply,
        emoji,
        mood
      );

    }, 700);

  } catch (error) {

    console.error("Send Error:", error);

    alert(
      "Send Error: " +
      error.message
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
// SCROLL
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
// TIME
// ======================================

function getTime() {

  return new Date()
    .toLocaleTimeString([], {

      hour: "2-digit",
      minute: "2-digit"

    });
}

// ======================================
// ATTACH MESSAGE LISTENERS
// ======================================

function attachMessageListeners() {

  const input =
    document.getElementById(
      "msg-input"
    );

  if (input) {

    // Remove existing listeners to avoid duplicates
    input.removeEventListener("keydown", handleKeyDown);
    
    // Add new listener
    input.addEventListener(
      "keydown",
      handleKeyDown
    );
  }
}

// ======================================
// KEY DOWN HANDLER
// ======================================

function handleKeyDown(e) {

  if (
    e.key === "Enter" &&
    !e.shiftKey
  ) {

    e.preventDefault();
    sendMessage();
  }
}

// ======================================
// INITIALIZATION
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    // Attach listeners to initial username input
    const userNameInput =
      document.getElementById(
        "user-name-input"
      );

    if (userNameInput) {

      userNameInput.addEventListener(
        "keydown",
        function (e) {

          if (e.key === "Enter") {

            e.preventDefault();
            startChat();
          }
        }
      );
    }

    // Try to attach message listeners if they exist
    attachMessageListeners();
  }
);
