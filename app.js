function generateReply(message, emotion){

  const text =
    message.toLowerCase().trim();

  // ─────────────────────────
  // GREETING DETECTION
  // ─────────────────────────

  const greetings = [

    "hi",
    "hello",
    "hey",
    "hii",
    "heyy",
    "hola",
    "good morning",
    "good afternoon",
    "good evening"
  ];

  // STRICT greeting check
  if(greetings.includes(text)){

    const greetingReplies = [

      `Hey ${userName}! 💜 How are you feeling today?`,

      `Hello ${userName} 😊 It's really nice talking to you.`,

      `Hii 🌸 I hope your day is going well.`,

      `Heyy 💜 I'm here for you anytime.`,

      `Hello ✨ What's on your mind today?`,

      `Hey ${userName}! 🌸 How has your day been so far?`
    ];

    return greetingReplies[
      Math.floor(
        Math.random() *
        greetingReplies.length
      )
    ];
  }

  // ─────────────────────────
  // MOTIVATIONAL QUOTES
  // ─────────────────────────

  const motivational = [

    "🌸 One difficult day doesn't define your life.",

    "💜 You deserve kindness too.",

    "🌈 Better days slowly come back.",

    "✨ Healing takes time and that's okay.",

    "🌙 You're stronger than you think.",

    "🔥 Tough moments create stronger people."
  ];

  // ─────────────────────────
  // EMOTIONAL REPLIES
  // ─────────────────────────

  const responses = {

    joy: [

      `That honestly sounds wonderful 😄`,

      `I'm genuinely happy hearing that 💜`,

      `You sound really excited 🌟`
    ],

    sadness: [

      `I'm really sorry you're feeling this way 💙`,

      `You don't always have to pretend you're okay 🌙`,

      `I'm glad you shared this instead of hiding it 💜`
    ],

    anger: [

      `That sounds really frustrating honestly 🔥`,

      `Your feelings are valid 💜`,

      `I understand why you're upset.`
    ],

    fear: [

      `That sounds stressful 💚`,

      `Take things one step at a time 🌿`,

      `You don't need all the answers today.`
    ],

    lonely: [

      `Feeling lonely hurts deeply 💜`,

      `I'm here with you right now 🌸`,

      `Your existence matters more than you know.`
    ],

    neutral: [

      `Tell me more 😊`,

      `I'm listening carefully 💜`,

      `That sounds important to you 🌸`
    ]
  };

  let pool =
    responses[emotion] ||
    responses["neutral"];

  // ─────────────────────────
  // CONTEXT-AWARE REPLIES
  // ─────────────────────────

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
      `Family pressure can become emotionally heavy 💙`,
      `You deserve understanding too 🌸`
    );
  }

  // ─────────────────────────
  // RANDOM REPLY
  // ─────────────────────────

  const response =
    pool[
      Math.floor(
        Math.random() *
        pool.length
      )
    ];

  let finalReply =
    response;

  // Add motivation randomly
  if(Math.random() > 0.4){

    finalReply += "\n\n" +

      motivational[
        Math.floor(
          Math.random() *
          motivational.length
        )
      ];
  }

  return finalReply;
}
