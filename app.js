// ─────────────────────────────────────────────
// ADVANCED EMOTION DETECTION
// ─────────────────────────────────────────────

function detectEmotion(message){

  const text = message.toLowerCase();

  const emotions = {

    joy: [
      "happy","excited","great","awesome",
      "amazing","good","love","success",
      "won","proud","fantastic","best"
    ],

    sadness: [
      "sad","cry","broken","hurt",
      "depressed","pain","upset",
      "heartbroken","miss","tears"
    ],

    anger: [
      "angry","mad","hate","frustrated",
      "annoyed","furious","irritated"
    ],

    fear: [
      "fear","scared","anxiety",
      "worried","stress","nervous",
      "panic","afraid"
    ],

    tired: [
      "tired","exhausted","drained",
      "burnout","sleepy"
    ],

    lonely: [
      "alone","lonely","isolated",
      "ignored","left out"
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
// HUMAN-LIKE AI REPLY ENGINE
// ─────────────────────────────────────────────

function generateReply(message, emotion){

  const text =
    message.toLowerCase();

  // Motivational thoughts
  const motivational = [

    "🌸 One bad day doesn't mean a bad life.",

    "💜 You deserve kindness and patience too.",

    "🌈 Better days slowly come back.",

    "✨ Healing takes time and that's okay.",

    "🌙 You're doing better than you think.",

    "🔥 Difficult moments create strong people.",

    "💙 It's okay to pause and breathe."
  ];

  // Emotion-based replies
  const responses = {

    joy: [

      `That honestly sounds wonderful 😄`,

      `I can feel your excitement through your words 🌟`,

      `Awww that's genuinely so nice to hear 💜`,

      `You really sound happy right now ✨`,

      `Moments like these are worth remembering 🌈`
    ],

    sadness: [

      `I'm really sorry you're feeling this way 💙`,

      `That sounds emotionally heavy honestly.`,

      `You don't always have to pretend you're okay 🌙`,

      `I know things probably feel overwhelming right now.`,

      `That must have hurt deeply 💜`,

      `I'm glad you shared this instead of keeping it inside 🌸`
    ],

    anger: [

      `That would frustrate anyone honestly 🔥`,

      `I understand why you're upset.`,

      `Sometimes people really hurt us deeply.`,

      `That situation sounds unfair to you 💜`,

      `Your feelings are completely valid.`
    ],

    fear: [

      `That sounds really stressful honestly 💚`,

      `Anxiety can make everything feel heavier.`,

      `You're carrying a lot mentally right now.`,

      `Take things one step at a time 🌿`,

      `You don't need all the answers today.`
    ],

    lonely: [

      `Feeling lonely hurts more than people realize 💜`,

      `I'm here with you right now 🌸`,

      `You deserve people who truly understand you.`,

      `Even when it feels lonely, your existence matters 💙`,

      `I'm really glad you're talking instead of isolating yourself.`
    ],

    tired: [

      `You sound emotionally drained 🌙`,

      `You've probably been carrying too much alone.`,

      `Rest is important too 💜`,

      `You don't have to solve everything today.`,

      `It's okay to slow down sometimes 🌸`
    ],

    neutral: [

      `Tell me more 😊 I'm listening.`,

      `And how did that make you feel? 💜`,

      `That sounds important to you 🌸`,

      `I'm here with you 🌟`,

      `Go on... I'm listening carefully.`
    ]
  };

  // Context-aware additions
  let pool =
    responses[emotion] ||
    responses["neutral"];

  // Study / exam support
  if(
    text.includes("exam") ||
    text.includes("study") ||
    text.includes("marks")
  ){

    pool.push(
      `Academic pressure can become really overwhelming 📚`,
      `Please don't let marks define your worth 💜`,
      `You're more important than any result sheet 🌸`
    );
  }

  // Relationship support
  if(
    text.includes("breakup") ||
    text.includes("relationship") ||
    text.includes("love")
  ){

    pool.push(
      `Heartbreak changes people deeply 💔`,
      `Losing emotional connection is never easy.`,
      `Relationships can leave invisible scars 🌙`
    );
  }

  // Family
  if(text.includes("family")){

    pool.push(
      `Family situations can become emotionally exhausting.`,
      `You deserve understanding too 💙`,
      `Sometimes family pressure becomes too much.`
    );
  }

  // Friends
  if(text.includes("friend")){

    pool.push(
      `Friendship problems hurt deeply too 💜`,
      `Being misunderstood by friends feels painful.`,
      `Real friendships should feel safe 🌸`
    );
  }

  // Select random human-like reply
  const response =
    pool[
      Math.floor(
        Math.random() *
        pool.length
      )
    ];

  // Add motivational line randomly
  let finalReply = response;

  if(Math.random() > 0.4){

    const quote =
      motivational[
        Math.floor(
          Math.random() *
          motivational.length
        )
      ];

    finalReply += `\n\n${quote}`;
  }

  // Natural follow-up questions
  const followUps = [

    "Do you want to talk more about it?",

    "How long have you been feeling this way?",

    "What happened exactly?",

    "Has this been bothering you for a while?",

    "I'm listening 💜",

    "Tell me more honestly."
  ];

  if(Math.random() > 0.5){

    finalReply += `\n\n${
      followUps[
        Math.floor(
          Math.random() *
          followUps.length
        )
      ]
    }`;
  }

  return finalReply;
}
