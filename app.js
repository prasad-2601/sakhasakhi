/**
 * Sakha-Sakhi — GitHub Pages Version
 * Frontend-only AI Companion
 */

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────

let userName = "";
let userInitial = "?";
let isWaiting = false;


// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  spawnParticles();

  const nameInput =
    document.getElementById("user-name-input");

  const msgInput =
    document.getElementById("msg-input");

  // Enter key on name input
  if(nameInput){
    nameInput.addEventListener("keydown", (e) => {

      if (e.key === "Enter") {

        e.preventDefault();

        startChat();
      }
    });
  }

  // Message input listeners
  if(msgInput){

    msgInput.addEventListener("input", () => {
      autoResize(msgInput);
    });

    msgInput.addEventListener("keydown", (e) => {

      if (
        e.key === "Enter" &&
        !e.shiftKey
      ) {

        e.preventDefault();

        sendMessage();
      }
    });
  }

});


// ─────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────

function spawnParticles() {

  const container =
    document.getElementById("particles");

  if (!container) return;

  const colors = [
    "#c084fc",
    "#818cf8",
    "#ec4899",
    "#67e8f9",
    "#a855f7"
  ];

  for (let i = 0; i < 25; i++) {

    const p =
      document.createElement("div");

    p.className = "particle";

    p.style.left =
      Math.random() * 100 + "%";

    p.style.width =
      Math.random() * 3 + 2 + "px";

    p.style.height =
      p.style.width;

    p.style.background =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    p.style.animationDuration =
      Math.random() * 15 + 10 + "s";

    p.style.animationDelay =
      Math.random() * 10 + "s";

    container.appendChild(p);
  }
}


// ─────────────────────────────────────────────
// START CHAT
// ─────────────────────────────────────────────

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

  // Hide onboarding
  const onboarding =
    document.getElementById("screen-onboarding");

  onboarding.style.display = "none";

  // Show chat screen
  const chat =
    document.getElementById("screen-chat");

  chat.style.display = "flex";

  chat.style.flexDirection = "column";

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

    const msgInput =
      document.getElementById("msg-input");

    if(msgInput){
      msgInput.focus();
    }

  }, 300);
}


// ─────────────────────────────────────────────
// WELCOME BANNER
// ─────────────────────────────────────────────

function showWelcomeBanner() {

  const chatWindow =
    document.getElementById("chat-window");

  const banner =
    document.createElement("div");

  banner.className =
    "welcome-banner";

  banner.innerHTML = `
    <div class="emoji">💜</div>

    <p>
      This is the beginning of your conversation with
      <strong>Sakha-Sakhi</strong>.<br>

      She's here to listen,
      uplift, and support you always.
    </p>
  `;

  chatWindow.appendChild(banner);
}


// ─────────────────────────────────────────────
// SEND MESSAGE
// ─────────────────────────────────────────────

async function sendMessage() {

  if (isWaiting) return;

  const input =
    document.getElementById("msg-input");

  const message =
    input.value.trim();

  if (!message) return;

  appendUserMessage(message);

  input.value = "";

  autoResize(input);

  isWaiting = true;

  document.getElementById(
    "btn-send"
  ).disabled = true;

  updateHeaderStatus(
    "● Typing...",
    "#c084fc"
  );

  const typingId =
    showTypingIndicator();

  // Mood detection

  let moodEmoji = "😊";
  let moodLabel = "Calm";
  let emotion = "neutral";

  const lower =
    message.toLowerCase();

  if (
    lower.includes("happy") ||
    lower.includes("excited")
  ) {

    moodEmoji = "😄";
    moodLabel = "Joyful";
    emotion = "joy";
  }

  else if (
    lower.includes("sad") ||
    lower.includes("cry")
  ) {

    moodEmoji = "💙";
    moodLabel = "Feeling Low";
    emotion = "sadness";
  }

  else if (
    lower.includes("angry") ||
    lower.includes("mad")
  ) {

    moodEmoji = "🔥";
    moodLabel = "Frustrated";
    emotion = "anger";
  }

  else if (
    lower.includes("tired")
  ) {

    moodEmoji = "🌙";
    moodLabel = "Exhausted";
    emotion = "tired";
  }

  // Smart replies

  const replies = [

    "I'm listening 💜 Tell me more.",

    "You matter, and your feelings matter too 🌸",

    "I'm here for you 🌈",

    "Everything will be okay 💕",

    "You're stronger than you think 💜",

    "Take a deep breath 🌙",

    "Thank you for sharing that 🤗",

    "I understand how you feel 💙",

    "You're not alone 🌟",

    "Your feelings are valid 💜"
  ];

  const reply =
    replies[
      Math.floor(
        Math.random() *
        replies.length
      )
    ];

  // Fake typing delay

  setTimeout(() => {

    removeTypingIndicator(
      typingId
    );

    appendBotMessage(
      reply,
      moodEmoji,
      moodLabel,
      emotion
    );

    updateMoodBadge(
      moodEmoji,
      moodLabel
    );

    updateHeaderStatus(
      "● Online & listening",
      "#22c55e"
    );

    isWaiting = false;

    document.getElementById(
      "btn-send"
    ).disabled = false;

    document.getElementById(
      "msg-input"
    ).focus();

  }, 1200);
}


// ─────────────────────────────────────────────
// BOT MESSAGE
// ─────────────────────────────────────────────

function appendBotMessage(
  text,
  moodEmoji,
  moodLabel,
  emotion
) {

  const chatWindow =
    document.getElementById("chat-window");

  const row =
    document.createElement("div");

  row.className =
    "msg-row bot-row";

  row.innerHTML = `

    <div class="msg-avatar">🌟</div>

    <div class="msg-bubble-wrap">

      <div class="msg-bubble bot-bubble">

        ${formatText(text)}

      </div>

      <div style="display:flex;align-items:center;gap:8px;">

        <span class="msg-time">
          ${getTime()}
        </span>

        ${
          emotion !== "neutral"

          ? `
            <span class="msg-emotion-tag">
              ${moodEmoji} ${moodLabel}
            </span>
          `

          : ""
        }

      </div>

    </div>
  `;

  chatWindow.appendChild(row);

  scrollToBottom();
}


// ─────────────────────────────────────────────
// USER MESSAGE
// ─────────────────────────────────────────────

function appendUserMessage(text) {

  const chatWindow =
    document.getElementById("chat-window");

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
        ${escapeHtml(text)}
      </div>

      <span class="msg-time">
        ${getTime()}
      </span>

    </div>
  `;

  chatWindow.appendChild(row);

  scrollToBottom();
}


// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────

function showTypingIndicator() {

  const chatWindow =
    document.getElementById("chat-window");

  const indicator =
    document.createElement("div");

  const id =
    "typing-" + Date.now();

  indicator.id = id;

  indicator.className =
    "typing-indicator";

  indicator.innerHTML = `

    <div class="msg-avatar">🌟</div>

    <div class="typing-bubble">

      <div class="typing-dot"></div>

      <div class="typing-dot"></div>

      <div class="typing-dot"></div>

    </div>
  `;

  chatWindow.appendChild(indicator);

  scrollToBottom();

  return id;
}

function removeTypingIndicator(id) {

  const el =
    document.getElementById(id);

  if (el) {

    el.remove();
  }
}


// ─────────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────────

function updateMoodBadge(
  emoji,
  label
) {

  document.getElementById(
    "mood-emoji"
  ).textContent = emoji;

  document.getElementById(
    "mood-label"
  ).textContent = label;
}

function updateHeaderStatus(
  text,
  color
) {

  const status =
    document.getElementById(
      "header-status"
    );

  status.textContent = text;

  status.style.color = color;
}

function scrollToBottom() {

  const chatWindow =
    document.getElementById("chat-window");

  chatWindow.scrollTop =
    chatWindow.scrollHeight;
}

function autoResize(textarea) {

  textarea.style.height = "auto";

  textarea.style.height =
    Math.min(
      textarea.scrollHeight,
      140
    ) + "px";
}

function getTime() {

  return new Date()
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
}

function escapeHtml(text) {

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatText(text) {

  let safe =
    escapeHtml(text);

  safe =
    safe.replace(/\n/g, "<br>");

  return safe;
}
