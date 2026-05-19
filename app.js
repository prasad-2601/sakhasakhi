let userName = "";
let userInitial = "?";
let isWaiting = false;


// INIT
document.addEventListener("DOMContentLoaded", () => {

  spawnParticles();

  const msgInput =
    document.getElementById("msg-input");

  if(msgInput){

    msgInput.addEventListener("keydown", (e) => {

      if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();
      }
    });
  }
});


// PARTICLES
function spawnParticles(){

  const container =
    document.getElementById("particles");

  if(!container) return;

  for(let i=0;i<20;i++){

    const p =
      document.createElement("div");

    p.className = "particle";

    p.style.left =
      Math.random()*100 + "%";

    p.style.animationDuration =
      (10 + Math.random()*10) + "s";

    container.appendChild(p);
  }
}


// START CHAT
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
    name;

  userInitial =
    name.charAt(0).toUpperCase();

  // HIDE FIRST SCREEN
  document.getElementById(
    "screen-onboarding"
  ).style.display = "none";

  // SHOW CHAT SCREEN
  const chat =
    document.getElementById(
      "screen-chat"
    );

  chat.style.display = "flex";

  chat.style.flexDirection =
    "column";

  appendBotMessage(
    `Hey ${userName}! 💜 I'm Sakha-Sakhi. How are you feeling today?`,
    "😊",
    "Calm"
  );
}


// SEND MESSAGE
function sendMessage(){

  if(isWaiting) return;

  const input =
    document.getElementById("msg-input");

  const message =
    input.value.trim();

  if(!message) return;

  appendUserMessage(message);

  input.value = "";

  isWaiting = true;

  document.getElementById(
    "btn-send"
  ).disabled = true;

  updateHeaderStatus(
    "● Typing...",
    "#c084fc"
  );

  const mood =
    detectEmotion(message);

  const reply =
    generateReply(message, mood.emotion);

  setTimeout(() => {

    appendBotMessage(
      reply,
      mood.emoji,
      mood.label
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

    document.getElementById(
      "btn-send"
    ).disabled = false;

  }, 1200);
}


// DETECT EMOTION
function detectEmotion(message){

  const text =
    message.toLowerCase();

  if(
    text.includes("happy") ||
    text.includes("good") ||
    text.includes("great")
  ){

    return {
      emotion:"joy",
      emoji:"😄",
      label:"Joyful"
    };
  }

  if(
    text.includes("sad") ||
    text.includes("hurt") ||
    text.includes("cry")
  ){

    return {
      emotion:"sadness",
      emoji:"💙",
      label:"Sad"
    };
  }

  if(
    text.includes("angry") ||
    text.includes("mad")
  ){

    return {
      emotion:"anger",
      emoji:"🔥",
      label:"Angry"
    };
  }

  if(
    text.includes("stress") ||
    text.includes("fear") ||
    text.includes("anxiety")
  ){

    return {
      emotion:"fear",
      emoji:"💚",
      label:"Anxious"
    };
  }

  return {
    emotion:"neutral",
    emoji:"😊",
    label:"Calm"
  };
}


// AI REPLY
function generateReply(message, emotion){

  const replies = {

    joy: [

      "That honestly sounds wonderful 😄",

      "I'm genuinely happy hearing that 💜",

      "You sound really excited 🌟"
    ],

    sadness: [

      "I'm really sorry you're feeling this way 💙",

      "It's okay to not be okay sometimes 🌙",

      "You don't have to carry this alone 💜"
    ],

    anger: [

      "That sounds really frustrating 🔥",

      "Your feelings are valid 💜",

      "Take a deep breath 🌸"
    ],

    fear: [

      "That sounds stressful 💚",

      "Take things slowly 🌿",

      "You're stronger than your fears 💜"
    ],

    neutral: [

      "Tell me more 😊",

      "I'm listening carefully 💜",

      "That sounds important 🌸"
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


// BOT MESSAGE
function appendBotMessage(
  text,
  emoji,
  label
){

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  const div =
    document.createElement("div");

  div.className =
    "bot-message";

  div.innerHTML = `

    <div class="bubble">

      ${text}

      <div class="meta">
        ${emoji} ${label}
      </div>

    </div>
  `;

  chatWindow.appendChild(div);

  scrollToBottom();
}


// USER MESSAGE
function appendUserMessage(text){

  const chatWindow =
    document.getElementById(
      "chat-window"
    );

  const div =
    document.createElement("div");

  div.className =
    "user-message";

  div.innerHTML = `

    <div class="bubble">

      ${text}

    </div>
  `;

  chatWindow.appendChild(div);

  scrollToBottom();
}


// HELPERS
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
