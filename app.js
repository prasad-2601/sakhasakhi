// ─────────────────────────────────────────────
// Sakha-Sakhi Frontend AI Companion
// GitHub Pages Compatible
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

  // Enter key for name input
  if(nameInput){

    nameInput.addEventListener("keydown", (e) => {

      if(e.key === "Enter"){

        e.preventDefault();

        startChat();
      }
    });
  }

  // Enter key for chat input
  if(msgInput){

    msgInput.addEventListener("keydown", (e) => {

      if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();
      }
    });

    msgInput.addEventListener("input", () => {

      autoResize(msgInput);

    });
  }

});


// ─────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────

function spawnParticles(){

  const container =
    document.getElementById("particles");

  if(!container) return;

  for(let i=0;i<25;i++){

    const p =
      document.createElement("div");

    p.className = "particle";

    p.style.left =
      Math.random()*100 + "%";

    p.style.animationDuration =
      (10 + Math.random()*15) + "s";

    p.style.animationDelay =
      Math.random()*10 + "s";

    container.appendChild(p);
  }
}


// ─────────────────────────────────────────────
// START CHAT
// ─────────────────────────────────────────────

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

  // Hide onboarding screen
  document.getElementById(
    "screen-onboarding"
  ).style.display = "none";

  // Show chat screen
  const chat =
    document.getElementById(
      "screen-chat"
    );

  chat.style.display = "flex";

  chat.style.flexDirection =
    "column";

  // Welcome message
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi — your companion always. How are you feeling today?`,
    "😊",
    "Calm",
    "neutral"
  );

  updateMoodBadge(
    "😊",
    "Calm"
  );

  setTimeout(() => {

    document
      .getElementById("msg-input")
      .focus();

  }, 300);
}


// ─────────────────────────────────────────────
// SEND MESSAGE
// ─────────────────────────────────────────────

async function sendMessage(){

  if(isWaiting) return;

  const input =
    document.getElementById("msg-input");

  const message =
    input.value.trim();

  if(!message) return;

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

  // Detect emotion
  const mood =
    detectEmotion(message);

  // Generate smart reply
  const reply =
    generateReply(message, mood.emotion);

  setTimeout(() => {

    removeTypingIndicator(
      typingId
    );

    appendBotMessage(
      reply,
      mood.emoji,
      mood.label,
      mood.emotion
    );

    updateMoodBadge(
      mood.emoji,
      mood.label
    );

    updateHeaderStatus(
      "● Online & listening",
      "#22c55e"
    );

    isWaiting = false;

    document
      .getElementById("btn-send")
      .disabled = false;

  }, 1200);
}


// ─────────────────────────────────────────────
// EMOTION DETECTION
// ─────────────────────────────────────────────

function detectEmotion(message){

  const text =
    message.toLowerCase();

  // JOY
  if(
    text.includes("happy") ||
    text.includes("excited") ||
    text.includes("great") ||
    text.includes("amazing") ||
    text.includes("good") ||
    text.includes("won") ||
    text.includes("success") ||
    text.includes("love")
  ){
    return {
      emotion:"joy",
      emoji:"😄",
      label:"Joyful"
    };
  }

  // SADNESS
  if(
    text.includes("sad") ||
    text.includes("cry") ||
    text.includes("broken") ||
    text.includes("hurt") ||
    text.includes("depressed") ||
    text.includes("pain") ||
    text.includes("upset")
  ){
    return {
      emotion:"sadness",
      emoji:"💙",
      label:"Feeling Low"
    };
  }

  // ANGER
  if(
    text.includes("angry") ||
    text.includes("mad") ||
    text.includes("hate") ||
    text.includes("frustrated") ||
    text.includes("annoyed")
  ){
    return {
      emotion:"anger",
      emoji:"🔥",
      label:"Frustrated"
    };
  }

  // FEAR
  if(
    text.includes("fear") ||
    text.includes("scared") ||
    text.includes("anxiety") ||
    text.includes("worried") ||
    text.includes("stress") ||
    text.includes("nervous")
  ){
    return {
      emotion:"fear",
      emoji:"💚",
      label:"Anxious"
    };
  }

  // TIRED
  if(
    text.includes("tired") ||
    text.includes("exhausted") ||
    text.includes("drained")
  ){
    return {
      emotion:"tired",
      emoji:"🌙",
      label:"Exhausted"
    };
  }

  // LONELY
  if(
    text.includes("alone") ||
    text.includes("lonely") ||
    text.includes("nobody")
  ){
    return {
      emotion:"lonely",
      emoji:"💜",
      label:"Lonely"
    };
  }

  return {
    emotion:"neutral",
    emoji:"😊",
    label:"Calm"
  };
}


// ─────────────────────────────────────────────
// SMART REPLY ENGINE
// ─────────────────────────────────────────────

function generateReply(message, emotion){

  const replies = {

    joy: [

      `That's amazing ${userName}! 🌟 I'm genuinely happy for you!`,

      `Yesss ${userName}! 🎉 You deserve this happiness.`,

      `Wowww that's incredible 💜 Keep shining!`,

      `That made me smile too 😄`
    ],

    sadness: [

      `${userName}, I'm here with you 💙 You don't have to carry this alone.`,

      `It's okay to feel this way 🌙 Your feelings matter.`,

      `Even dark nights pass 🌸`,

      `You are stronger than this moment 💜`
    ],

    anger: [

      `That sounds really frustrating 🔥 Your feelings are valid.`,

      `Take a deep breath 💜 We'll get through this together.`,

      `I understand why you'd feel angry 🌋`,

      `Sometimes anger means you've been hurt deeply.`
    ],

    fear: [

      `It's okay to feel anxious sometimes 💚`,

      `You're safe here 🌿`,

      `Take one step at a time 💜`,

      `You are braver than your fears.`
    ],

    lonely: [

      `You're not alone right now 💜 I'm here.`,

      `Talking to me already took courage 🌟`,

      `I hear you, ${userName}.`,

      `You matter more than you know 💙`
    ],

    tired: [

      `Rest is important 🌙 You've been carrying a lot.`,

      `Take things one step at a time 💜`,

      `You're doing better than you think 🌸`,

      `It's okay to pause and breathe.`
    ],

    neutral: [

      `Tell me more 😊 I'm listening.`,

      `That's interesting 🌟`,

      `How did that make you feel? 💜`,

      `I'm here with you 🌸`
    ]
  };

  const pool =
    replies[emotion] ||
    replies["neutral"];

  return pool[
    Math.floor(
      Math.random() *
      pool.length
    )
  ];
}


// ─────────────────────────────────────────────
// BOT MESSAGE
// ─────────────────────────────────────────────

function appendBotMessage(
  text,
  moodEmoji,
  moodLabel,
  emotion
){

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  const row =
    document.createElement("div");

  row.className =
    "msg-row bot-row";

  row.innerHTML = `

    <div class="msg-avatar">🌟</div>

    <div class="msg-bubble-wrap">

      <div class="msg-bubble bot-bubble">

        ${text}

      </div>

      <div style="display:flex;gap:8px;align-items:center;">

        <span class="msg-time">
          ${getTime()}
        </span>

        <span class="msg-emotion-tag">
          ${moodEmoji} ${moodLabel}
        </span>

      </div>

    </div>
  `;

  chatWindow.appendChild(row);

  scrollToBottom();
}


// ─────────────────────────────────────────────
// USER MESSAGE
// ─────────────────────────────────────────────

function appendUserMessage(text){

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

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


// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────

function showTypingIndicator(){

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  const id =
    "typing-" + Date.now();

  const div =
    document.createElement("div");

  div.id = id;

  div.className =
    "typing-indicator";

  div.innerHTML = `

    <div class="msg-avatar">🌟</div>

    <div class="typing-bubble">

      <div class="typing-dot"></div>

      <div class="typing-dot"></div>

      <div class="typing-dot"></div>

    </div>
  `;

  chatWindow.appendChild(div);

  scrollToBottom();

  return id;
}

function removeTypingIndicator(id){

  const el =
    document.getElementById(id);

  if(el){
    el.remove();
  }
}


// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function updateMoodBadge(
  emoji,
  label
){

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
){

  const status =
    document.getElementById(
      "header-status"
    );

  status.textContent = text;

  status.style.color = color;
}

function scrollToBottom(){

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  chatWindow.scrollTop =
    chatWindow.scrollHeight;
}

function autoResize(textarea){

  textarea.style.height =
    "auto";

  textarea.style.height =
    textarea.scrollHeight + "px";
}

function getTime(){

  return new Date()
    .toLocaleTimeString([], {
      hour:"2-digit",
      minute:"2-digit"
    });
}
