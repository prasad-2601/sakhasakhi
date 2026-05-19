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

  // STRICT GREETING CHECK
  if(greetings.includes(text)){

    const greetingReplies = [

      `Hey ${userName}! 💜 How are you feeling today?`,

      `Hello ${userName} 😊 It's really nice talking to you.`,

      `Hii 🌸 I hope your day is going well.`,

      `Heyy 💜 I'm always here for you.`,

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
  // EMOTIONAL RESPONSES
  // ─────────────────────────

  const responses = {

    joy: [

      `That honestly sounds wonderful 😄`,

      `I'm genuinely happy hearing that 💜`,

      `You sound really excited 🌟`,

      `That's beautiful to hear honestly ✨`
    ],

    sadness: [

      `I'm really sorry you're feeling this way 💙`,

      `You don't always have to pretend you're okay 🌙`,

      `I'm glad you shared this instead of hiding it 💜`,

      `That sounds emotionally heavy honestly.`
    ],

    anger: [

      `That sounds really frustrating honestly 🔥`,

      `Your feelings are valid 💜`,

      `I understand why you're upset.`,

      `Sometimes life feels unfair honestly.`
    ],

    fear: [

      `That sounds stressful 💚`,

      `Take things one step at a time 🌿`,

      `You don't need all the answers today.`,

      `Anxiety can make everything feel heavier.`
    ],

    lonely: [

      `Feeling lonely hurts deeply 💜`,

      `I'm here with you right now 🌸`,

      `Your existence matters more than you know.`,

      `You deserve people who understand you 💙`
    ],

    neutral: [

      `Tell me more 😊`,

      `I'm listening carefully 💜`,

      `That sounds important to you 🌸`,

      `Go on... I'm listening ✨`
    ]
  };

  let pool =
    responses[emotion] ||
    responses["neutral"];

  // ─────────────────────────
  // CONTEXT-AWARE REPLIES
  // ─────────────────────────

  // Exams / Studies
  if(
    text.includes("exam") ||
    text.includes("study") ||
    text.includes("marks")
  ){

    pool.push(
      `Academic pressure can become exhausting 📚`,
      `Please don't let marks define your worth 💜`,
      `You're more important than grades 🌸`
    );
  }

  // Relationship
  if(
    text.includes("breakup") ||
    text.includes("relationship") ||
    text.includes("love")
  ){

    pool.push(
      `Heartbreak changes people deeply 💔`,
      `Emotional pain takes time to heal 🌙`,
      `Relationships can leave emotional scars.`
    );
  }

  // Family
  if(text.includes("family")){

    pool.push(
      `Family pressure can become emotionally heavy 💙`,
      `You deserve understanding too 🌸`,
      `Sometimes family situations become overwhelming.`
    );
  }

  // Friends
  if(text.includes("friend")){

    pool.push(
      `Friendship problems can hurt deeply 💜`,
      `Being misunderstood by friends feels painful.`,
      `Real friendships should feel safe 🌸`
    );
  }

  // Alone
  if(text.includes("alone")){

    pool.push(
      `You don't deserve to feel alone 💜`,
      `Loneliness can make everything feel heavier.`,
      `I'm glad you're talking instead of staying silent 🌸`
    );
  }

  // ─────────────────────────
  // RANDOM RESPONSE
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

  // OPTIONAL FOLLOW-UP
  const followUps = [

    "Do you want to talk more about it?",

    "How has your day been?",

    "I'm listening 💜",

    "Tell me more honestly.",

    "What happened exactly?"
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
