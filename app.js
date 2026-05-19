// ─────────────────────────────────────────────
// ADVANCED EMOTION DETECTION
// ─────────────────────────────────────────────

function detectEmotion(message){

  const text = message.toLowerCase();

  const emotions = {

    joy: [
      "happy","excited","great","awesome","amazing",
      "good","love","success","won","proud",
      "fantastic","best","joy","celebrate"
    ],

    sadness: [
      "sad","cry","broken","hurt","depressed",
      "pain","upset","heartbroken","alone",
      "miss","tears","unhappy","lost"
    ],

    anger: [
      "angry","mad","hate","frustrated",
      "annoyed","furious","irritated",
      "rage","pissed"
    ],

    fear: [
      "fear","scared","anxiety","worried",
      "stress","nervous","panic","afraid",
      "overthinking"
    ],

    tired: [
      "tired","exhausted","drained",
      "burnout","sleepy","weak"
    ],

    lonely: [
      "alone","lonely","nobody",
      "isolated","ignored","left out"
    ]
  };

  let detected = "neutral";

  for(const emotion in emotions){

    for(const word of emotions[emotion]){

      if(text.includes(word)){

        detected = emotion;

        break;
      }
    }
  }

  const moodData = {

    joy: {
      emoji:"😄",
      label:"Joyful"
    },

    sadness: {
      emoji:"💙",
      label:"Feeling Low"
    },

    anger: {
      emoji:"🔥",
      label:"Frustrated"
    },

    fear: {
      emoji:"💚",
      label:"Anxious"
    },

    tired: {
      emoji:"🌙",
      label:"Exhausted"
    },

    lonely: {
      emoji:"💜",
      label:"Lonely"
    },

    neutral: {
      emoji:"😊",
      label:"Calm"
    }
  };

  return {
    emotion: detected,
    emoji: moodData[detected].emoji,
    label: moodData[detected].label
  };
}


// ─────────────────────────────────────────────
// ADVANCED AI REPLY ENGINE
// ─────────────────────────────────────────────

function generateReply(message, emotion){

  const motivationalQuotes = [

    "🌟 Tough times never last, but strong people do.",

    "💜 Healing takes time, and that's okay.",

    "🌈 Every storm eventually runs out of rain.",

    "🔥 Your current situation is not your final destination.",

    "🌸 You are stronger than you think.",

    "✨ Small steps still move you forward.",

    "💙 It's okay to rest. It's not okay to give up.",

    "🌙 Even the darkest night ends with sunrise."
  ];

  const replies = {

    joy: [

      `That's amazing ${userName}! 😄 I'm genuinely so happy for you!`,

      `Yesss ${userName}! 🎉 You deserve every bit of this happiness.`,

      `Wowww that's incredible 🌟 Keep shining and smiling!`,

      `That made me smile too 💜 Your happiness matters.`
    ],

    sadness: [

      `${userName}, I'm really sorry you're feeling this way 💙 But remember — you are not alone.`,

      `It's okay to cry sometimes 🌙 Strong people feel deeply too.`,

      `Even dark nights pass eventually 🌸 Better days are coming.`,

      `You matter so much more than your sadness tells you 💜`,

      `${userName}, pain is temporary. Please don't lose hope 🌈`
    ],

    anger: [

      `That sounds genuinely frustrating 🔥 Your feelings are valid.`,

      `Take a deep breath 💜 You don't have to carry all this anger alone.`,

      `I understand why you're upset 🌋 Sometimes life feels unfair.`,

      `Anger usually comes from hurt 💙 Be gentle with yourself.`
    ],

    fear: [

      `It's okay to feel anxious sometimes 💚 You're human.`,

      `You are stronger than your fears 🌟`,

      `Take one step at a time 🌿 You don't need all the answers today.`,

      `Breathe slowly 💜 You will get through this.`
    ],

    tired: [

      `Rest is important 🌙 You've been carrying a lot emotionally.`,

      `It's okay to pause and breathe 💜`,

      `You don't need to solve everything today 🌸`,

      `${userName}, exhaustion doesn't mean weakness.`
    ],

    lonely: [

      `You're not alone right now 💜 I'm here with you.`,

      `Talking about your feelings already took courage 🌟`,

      `I hear you ${userName}, and your feelings matter 💙`,

      `Even when it feels lonely, your existence matters 🌸`
    ],

    neutral: [

      `Tell me more 😊 I'm listening carefully.`,

      `How did that make you feel? 💜`,

      `That's interesting 🌟 I want to understand better.`,

      `I'm here with you 🌸`
    ]
  };

  const emotionReplies =
    replies[emotion] || replies["neutral"];

  const randomReply =
    emotionReplies[
      Math.floor(
        Math.random() *
        emotionReplies.length
      )
    ];

  const randomQuote =
    motivationalQuotes[
      Math.floor(
        Math.random() *
        motivationalQuotes.length
      )
    ];

  return `
${randomReply}

${randomQuote}
  `;
}
