/**
 * Sakha-Sakhi — My Companion
 * Frontend JS: name flow, chat, NLP response rendering
 */

// ─── STATE ───────────────────────────────────────────────
let userName = "";
let isWaiting = false;
let userInitial = "?";

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  spawnParticles();

  const nameInput = document.getElementById("user-name-input");
  const msgInput  = document.getElementById("msg-input");

  // Enter on name input → start chat
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); startChat(); }
  });

  // Auto-resize textarea + Enter to send
  msgInput.addEventListener("input", () => autoResize(msgInput));
  msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Focus name input
  setTimeout(() => nameInput.focus(), 600);
});

// ─── PARTICLES ────────────────────────────────────────────
function spawnParticles() {
  const container = document.getElementById("particles");
  const count = 25;
  const colors = ["#c084fc", "#818cf8", "#ec4899", "#67e8f9", "#a855f7"];

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 2}px;
      height: ${Math.random() * 3 + 2}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}

// ─── ONBOARDING → CHAT ───────────────────────────────────
async function startChat() {
  const input = document.getElementById("user-name-input");
  const name  = input.value.trim();

  if (!name) {
    input.style.borderColor = "#ec4899";
    input.style.boxShadow   = "0 0 0 3px rgba(236,72,153,0.25)";
    input.placeholder = "Please enter your name 💜";
    input.focus();
    setTimeout(() => {
      input.style.borderColor = "";
      input.style.boxShadow   = "";
      input.placeholder = "Your name...";
    }, 2500);
    return;
  }

  userName    = name.charAt(0).toUpperCase() + name.slice(1);
  userInitial = userName.charAt(0).toUpperCase();

  // Disable button during transition
  const btn = document.getElementById("btn-start");
  btn.disabled = true;
  btn.querySelector(".btn-text").textContent = "Starting...";

  try {
    const res  = await fetch("/greet", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: userName }),
    });
    const data = await res.json();

    // Transition screens
    const onboarding = document.getElementById("screen-onboarding");
    const chat       = document.getElementById("screen-chat");

    onboarding.classList.add("exit");

    setTimeout(() => {
      onboarding.classList.add("hidden");
      onboarding.classList.remove("exit");
      chat.classList.remove("hidden");

      // Init chat
      showWelcomeBanner();
      appendBotMessage(data.greeting, "😊", "Calm", "joy");
      updateMoodBadge("😊", "Calm");

      setTimeout(() => {
        document.getElementById("msg-input").focus();
      }, 300);
    }, 350);

  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.querySelector(".btn-text").textContent = "Let's Chat! 💜";
  }
}

// ─── WELCOME BANNER ──────────────────────────────────────
function showWelcomeBanner() {
  const chatWindow = document.getElementById("chat-window");
  const banner = document.createElement("div");
  banner.className = "welcome-banner";
  banner.innerHTML = `
    <div class="emoji">💜</div>
    <p>This is the beginning of your conversation with <strong>Sakha-Sakhi</strong>.<br>
    She's here to listen, uplift, and be your friend — always.</p>
  `;
  chatWindow.appendChild(banner);
}

// ─── SEND MESSAGE ─────────────────────────────────────────
async function sendMessage() {
  if (isWaiting) return;

  const input   = document.getElementById("msg-input");
  const message = input.value.trim();
  if (!message) return;

  // Render user bubble
  appendUserMessage(message);
  input.value = "";
  autoResize(input);

  // Show typing indicator
  isWaiting = true;
  document.getElementById("btn-send").disabled = true;
  updateHeaderStatus("● Typing...", "#c084fc");
  const typingId = showTypingIndicator();

  try {
    const res  = await fetch("/chat", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: userName, message }),
    });
    const data = await res.json();

    // Simulate human-like delay (1–2.5s)
    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      removeTypingIndicator(typingId);
      appendBotMessage(data.reply, data.mood_emoji, data.mood_label, data.emotion);
      updateMoodBadge(data.mood_emoji, data.mood_label);
      updateHeaderStatus("● Online & listening", "#22c55e");
      isWaiting = false;
      document.getElementById("btn-send").disabled = false;
      document.getElementById("msg-input").focus();
    }, delay);

  } catch (err) {
    removeTypingIndicator(typingId);
    appendBotMessage("Oops, I had a little hiccup! But I'm still here for you. 💜 Try again?", "😊", "Calm", "neutral");
    updateHeaderStatus("● Online & listening", "#22c55e");
    isWaiting = false;
    document.getElementById("btn-send").disabled = false;
  }
}

// ─── MESSAGE RENDERERS ───────────────────────────────────
function appendBotMessage(text, moodEmoji, moodLabel, emotion) {
  const chatWindow = document.getElementById("chat-window");
  const row = document.createElement("div");
  row.className = "msg-row bot-row";

  row.innerHTML = `
    <div class="msg-avatar">🌟</div>
    <div class="msg-bubble-wrap">
      <div class="msg-bubble bot-bubble">${formatText(text)}</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="msg-time">${getTime()}</span>
        ${emotion !== "neutral" ? `<span class="msg-emotion-tag">${moodEmoji} ${moodLabel}</span>` : ""}
      </div>
    </div>
  `;

  chatWindow.appendChild(row);
  scrollToBottom();
}

function appendUserMessage(text) {
  const chatWindow = document.getElementById("chat-window");
  const row = document.createElement("div");
  row.className = "msg-row user-row";

  row.innerHTML = `
    <div class="msg-avatar user-avatar">${userInitial}</div>
    <div class="msg-bubble-wrap">
      <div class="msg-bubble user-bubble">${escapeHtml(text)}</div>
      <span class="msg-time">${getTime()}</span>
    </div>
  `;

  chatWindow.appendChild(row);
  scrollToBottom();
}

// ─── TYPING INDICATOR ─────────────────────────────────────
function showTypingIndicator() {
  const chatWindow = document.getElementById("chat-window");
  const indicator  = document.createElement("div");
  const id = "typing-" + Date.now();
  indicator.id = id;
  indicator.className = "typing-indicator";
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
  const el = document.getElementById(id);
  if (el) {
    el.style.opacity = "0";
    el.style.transform = "scale(0.9)";
    el.style.transition = "all 0.2s ease";
    setTimeout(() => el.remove(), 200);
  }
}

// ─── UI HELPERS ───────────────────────────────────────────
function updateMoodBadge(emoji, label) {
  const badge = document.getElementById("mood-badge");
  badge.style.transform = "scale(0.9)";
  badge.style.opacity   = "0.5";
  setTimeout(() => {
    document.getElementById("mood-emoji").textContent = emoji;
    document.getElementById("mood-label").textContent = label;
    badge.style.transform = "";
    badge.style.opacity   = "";
    badge.style.transition = "all 0.3s cubic-bezier(0.34,1.56,0.64,1)";
  }, 150);
}

function updateHeaderStatus(text, color) {
  const status = document.getElementById("header-status");
  status.textContent = text;
  status.style.color = color;
}

function scrollToBottom() {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatText(text) {
  // Escape HTML first
  let safe = escapeHtml(text);

  // Convert **bold** → <strong>
  safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert *italic* → <em>
  safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Convert newlines to <br>
  safe = safe.replace(/\n/g, "<br>");

  return safe;
}
