// GLOBALS
let userName = "";
let userInitial = "";

// START CHAT
function startChat() {

  console.log("startChat running");

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

    alert("Enter your name 💜");
    return;
  }

  userName =
    name;

  userInitial =
    name.charAt(0).toUpperCase();

  // SCREENS
  const onboarding =
    document.getElementById(
      "screen-onboarding"
    );

  const chat =
    document.getElementById(
      "screen-chat"
    );

  // SWITCH SCREEN
  onboarding.style.display =
    "none";

  chat.style.display =
    "flex";

  // WELCOME MESSAGE
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi.`,
    "😊",
    "Calm"
  );

  updateMoodBadge(
    "😊",
    "Calm"
  );
}

// BOT MESSAGE
function appendBotMessage(
  text,
  emoji,
  mood
) {

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  if (!chatWindow) return;

  const div =
    document.createElement("div");

  div.className =
    "bot-message";

  div.innerHTML = `

    <div class="msg-bubble bot-bubble">
      ${text}
    </div>

  `;

  chatWindow.appendChild(div);

  scrollToBottom();
}

// USER MESSAGE
function appendUserMessage(text) {

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  const div =
    document.createElement("div");

  div.className =
    "user-message";

  div.innerHTML = `

    <div class="msg-bubble user-bubble">
      ${text}
    </div>

  `;

  chatWindow.appendChild(div);

  scrollToBottom();
}

// SEND MESSAGE
function sendMessage() {

  const input =
    document.getElementById(
      "msg-input"
    );

  const text =
    input.value.trim();

  if (text === "") return;

  appendUserMessage(text);

  input.value = "";

  setTimeout(() => {

    appendBotMessage(
      "I'm listening 💜",
      "😊",
      "Calm"
    );

  }, 600);
}

// MOOD BADGE
function updateMoodBadge(
  emoji,
  mood
) {

  const moodEmoji =
    document.getElementById(
      "mood-emoji"
    );

  const moodLabel =
    document.getElementById(
      "mood-label"
    );

  if (moodEmoji)
    moodEmoji.innerText =
      emoji;

  if (moodLabel)
    moodLabel.innerText =
      mood;
}

// SCROLL
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

// ENTER KEY
document.addEventListener(
  "DOMContentLoaded",
  () => {

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
