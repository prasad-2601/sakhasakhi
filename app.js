function sendMessage() {

  try {

    // INPUT
    const input =
      document.getElementById(
        "msg-input"
      );

    if (!input) {

      alert(
        "Message input not found"
      );

      return;
    }

    // USER TEXT
    const text =
      input.value.trim();

    // EMPTY CHECK
    if (text === "") return;

    // SHOW USER MESSAGE
    appendUserMessage(text);

    // CLEAR INPUT
    input.value = "";

    // LOWERCASE TEXT
    const msg =
      text.toLowerCase();

    // DEFAULT REPLY
    let reply =
      "I'm here with you 💜";

    let emoji =
      "😊";

    let mood =
      "Calm";

    // ======================================
    // GREETINGS
    // ======================================

    if (
      msg.includes("hi") ||
      msg.includes("hello") ||
      msg.includes("hey")
    ) {

      reply =
        `Hey ${userName}! 💜 It's really nice talking with you.`;

      emoji =
        "👋";

      mood =
        "Friendly";
    }

    // ======================================
    // HAPPY
    // ======================================

    else if (
      msg.includes("happy") ||
      msg.includes("good") ||
      msg.includes("great") ||
      msg.includes("awesome") ||
      msg.includes("fine")
    ) {

      reply =
        "That makes me happy too 🌸 Keep smiling and enjoying your day.";

      emoji =
        "😄";

      mood =
        "Happy";
    }

    // ======================================
    // SAD
    // ======================================

    else if (
      msg.includes("sad") ||
      msg.includes("cry") ||
      msg.includes("depressed") ||
      msg.includes("upset")
    ) {

      reply =
        "I'm really sorry you're feeling this way 💜 Remember you're not alone.";

      emoji =
        "🥺";

      mood =
        "Supportive";
    }

    // ======================================
    // ANGRY
    // ======================================

    else if (
      msg.includes("angry") ||
      msg.includes("mad") ||
      msg.includes("frustrated")
    ) {

      reply =
        "I understand your frustration 💜 Take a deep breath, I'm listening.";

      emoji =
        "😌";

      mood =
        "Calming";
    }

    // ======================================
    // STRESS
    // ======================================

    else if (
      msg.includes("stress") ||
      msg.includes("pressure") ||
      msg.includes("tired")
    ) {

      reply =
        "You've been carrying a lot lately 🌸 Don't forget to rest too.";

      emoji =
        "💜";

      mood =
        "Caring";
    }

    // ======================================
    // LONELY
    // ======================================

    else if (
      msg.includes("alone") ||
      msg.includes("lonely")
    ) {

      reply =
        "Even when life feels lonely, I'm here beside you 💜";

      emoji =
        "🤗";

      mood =
        "Warm";
    }

    // ======================================
    // LOVE
    // ======================================

    else if (
      msg.includes("love")
    ) {

      reply =
        "Love is one of the most beautiful feelings 💖";

      emoji =
        "😍";

      mood =
        "Lovely";
    }

    // ======================================
    // EXAMS / STUDY
    // ======================================

    else if (
      msg.includes("exam") ||
      msg.includes("study") ||
      msg.includes("college") ||
      msg.includes("assignment")
    ) {

      reply =
        "You're stronger than your stress 💪 You'll do amazing.";

      emoji =
        "📚";

      mood =
        "Motivating";
    }

    // ======================================
    // FRIENDS
    // ======================================

    else if (
      msg.includes("friend")
    ) {

      reply =
        "Good friends make life brighter 🌸";

      emoji =
        "🤝";

      mood =
        "Friendly";
    }

    // ======================================
    // THANK YOU
    // ======================================

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

    // ======================================
    // BYE
    // ======================================

    else if (
      msg.includes("bye") ||
      msg.includes("goodnight")
    ) {

      reply =
        "Take care 💜 I'm always here whenever you need me.";

      emoji =
        "🌙";

      mood =
        "Peaceful";
    }

    // UPDATE MOOD BADGE
    updateMoodBadge(
      emoji,
      mood
    );

    // BOT REPLY
    setTimeout(() => {

      appendBotMessage(
        reply,
        emoji,
        mood
      );

    }, 700);

  } catch (error) {

    console.log(error);

    alert(
      "Send Error: " +
      error.message
    );
  }
}
