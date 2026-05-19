async function sendMessage() {

  if (isWaiting) return;

  const input   = document.getElementById("msg-input");
  const message = input.value.trim();

  if (!message) return;

  // User message
  appendUserMessage(message);

  input.value = "";

  autoResize(input);

  // Typing state
  isWaiting = true;

  document.getElementById("btn-send").disabled = true;

  updateHeaderStatus("● Typing...", "#c084fc");

  const typingId = showTypingIndicator();

  // Mood detection
  let moodEmoji = "😊";
  let moodLabel = "Calm";
  let emotion   = "neutral";

  const lower = message.toLowerCase();

  if (lower.includes("happy") || lower.includes("excited")) {
    moodEmoji = "😄";
    moodLabel = "Joyful";
    emotion = "joy";
  }

  else if (lower.includes("sad") || lower.includes("cry")) {
    moodEmoji = "💙";
    moodLabel = "Feeling Low";
    emotion = "sadness";
  }

  else if (lower.includes("angry") || lower.includes("mad")) {
    moodEmoji = "🔥";
    moodLabel = "Frustrated";
    emotion = "anger";
  }

  else if (lower.includes("tired")) {
    moodEmoji = "🌙";
    moodLabel = "Exhausted";
    emotion = "tired";
  }

  // Smart replies
  const replies = [
    "I'm listening 💜 Tell me more.",
    "That sounds important to you 🌸",
    "You matter, and your feelings matter too 💙",
    "I'm here for you 🌟",
    "You're stronger than you think 💜",
    "Thank you for sharing that with me 🌙",
    "Everything will be okay 💕",
    "I understand how you feel 🤗",
    "You're not alone 🌈",
    "Take a deep breath 💜"
  ];

  const randomReply =
    replies[Math.floor(Math.random() * replies.length)];

  // Fake typing delay
  const delay = 1000 + Math.random() * 1500;

  setTimeout(() => {

    removeTypingIndicator(typingId);

    appendBotMessage(
      randomReply,
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

    document.getElementById("btn-send").disabled = false;

    document.getElementById("msg-input").focus();

  }, delay);
}
