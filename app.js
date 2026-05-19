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

  // ENTER on name input
  if(nameInput){

    nameInput.addEventListener("keydown", (e) => {

      if(e.key === "Enter"){

        e.preventDefault();

        startChat();
      }
    });
  }

  // ENTER on chat input
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

  // HIDE onboarding
  const onboarding =
    document.getElementById("screen-onboarding");

  onboarding.style.display = "none";

  // SHOW chat
  const chat =
    document.getElementById("screen-chat");

  chat.style.display = "flex";

  chat.style.flexDirection = "column";

  chat.style.width = "100%";

  chat.style.height = "100vh";

  // FIRST BOT MESSAGE
  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi. I'm here to listen and support you always. How are you feeling today?`,
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
      document.getElementById("msg-input");

    if(msgInput){

      msgInput.focus();
    }

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

  // DETECT MOOD
  const mood =
    detectEmotion(message);

  // GENERATE REPLY
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

  }, 1000 + Math.random()*1200);
}


// ─────────────────────────────────────────────
// EMOTION DETECTION
// ─────────────────────────────────────────────

function detectEmotion(message){

  const text =
    message.toLowerCase();

  if(
    text.includes("happy") ||
    text.includes("excited") ||
    text.includes("great") ||
    text.includes("amazing") ||
    text.includes("good")
  ){
    return {
      emotion:"joy",
      emoji:"😄",
      label:"Joyful"
    };
  }

  if(
    text.includes("sad") ||
    text.includes("cry") ||
    text.includes("hurt") ||
    text.includes("depressed") ||
    text.includes("broken")
  ){
    return {
      emotion:"sadness",
      emoji:"💙",
      label:"Feeling Low"
    };
  }

  if(
    text.includes("angry") ||
    text.includes("mad") ||
    text.includes("frustrated")
  ){
    return {
      emotion:"anger",
      emoji:"🔥",
      label:"Frustrated"
    };
  }

  if(
    text.includes("anxiety") ||
    text.includes("stress") ||
    text.includes("worried") ||
    text.includes("fear")
  ){
    return {
      emotion:"fear",
      emoji:"💚",
      label:"Anxious"
    };
  }

  if(
    text.includes("alone") ||
    text.includes("lonely")
  ){
    return {
      emotion:"lonely",
      emoji:"💜",
      label:"Lonely"
    };
  }

  if(
    text.includes("tired") ||
    text.includes("exhausted")
  ){
    return {
      emotion:"tired",
      emoji:"🌙",
      label:"Exhausted"
    };
  }

  return {
    emotion:"neutral",
    emoji:"😊",
    label:"Calm"
  };
}


// ─────────────────────────────────────────────
// HUMAN-LIKE REPLY ENGINE
// ─────────────────────────────────────────────

function generateReply(message, emotion){

  const text =
    message.toLowerCase();

  const motivational = [

    "🌸 One difficult moment doesn't define your life.",

    "💜 You deserve kindness too.",

    "🌈 Better days will come back slowly.",

    "✨ Healing takes time and that's okay.",

    "🌙 You're doing better than you think.",

    "🔥 Hard times create strong people.",

    "💙 It's okay to rest sometimes."
  ];

  const responses = {

    joy: [

      `That honestly sounds wonderful 😄`,

      `I'm genuinely happy hearing that 🌟`,

      `You sound really excited right now 💜`,

      `Moments like these are beautiful ✨`
    ],

    sadness: [

      `I'm really sorry you're feeling this way 💙`,

      `That sounds emotionally heavy honestly.`,

      `You don't always have to pretend you're okay 🌙`,

      `I'm glad you shared this instead of hiding it 💜`
    ],

    anger: [

      `That would frustrate anyone honestly 🔥`,

      `Your feelings are completely valid.`,

      `I understand why you're upset.`,

      `Sometimes life feels unfair honestly.`
    ],

    fear: [

      `That sounds really stressful 💚`,

      `Anxiety can make everything feel heavier.`,

      `Take things slowly 🌿`,

      `You don't need all the answers today.`
    ],

    lonely: [

      `Feeling lonely hurts deeply 💜`,

      `I'm here with you right now 🌸`,

      `Your presence matters more than you think.`,

      `You deserve people who understand you 💙`
    ],

    tired: [

      `You sound emotionally drained 🌙`,

      `You've probably been carrying too much.`,

      `Rest is important too 💜`,

      `It's okay to slow down sometimes.`
    ],

    neutral: [

      `Tell me more 😊`,

      `I'm listening carefully 💜`,

      `And how did that make you feel? 🌸`,

      `That sounds important to you 🌟`
    ]
  };

  let pool =
    responses[emotion] ||
    responses["neutral"];

  // CONTEXT REPLIES

  if(
    text.includes("exam") ||
    text.includes("study")
  ){

    pool.push(
      `Academic pressure can become exhausting 📚`,
      `Please don't let marks define your worth 💜`
    );
  }

  if(
    text.includes("breakup") ||
    text.includes("relationship")
  ){

    pool.push(
      `Heartbreak changes people deeply 💔`,
      `Emotional pain takes time to heal 🌙`
    );
  }

  if(text.includes("family")){

    pool.push(
      `Family pressure can become emotionally heavy.`,
      `You deserve understanding too 💙`
    );
  }

  const response =
    pool[
      Math.floor(
        Math.random() *
        pool.length
      )
    ];

  let finalReply =
    response;

  // RANDOM MOTIVATION

  if(Math.random() > 0.4){

    finalReply += "\n\n" +

      motivational[
        Math.floor(
          Math.random() *
          motivational.length
        )
      ];
  }

  // FOLLOW UP QUESTIONS

  const followUps = [

    "Do you want to talk more about it?",

    "How long have you been feeling this way?",

    "What happened exactly?",

    "Tell me more honestly 💜"
  ];

  if(Math.random() > 0.5){

    finalReply += "\n\n" +

      followUps[
        Math.floor(
          Math.random() *
          followUps.length
        )
      ];
  }

  return finalReply;
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

        ${text.replace(/\n/g, "<br>")}

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
// TYPING
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
