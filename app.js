function generateReply(message, emotion){

  const text =
    message.toLowerCase().trim();

  // GREETINGS
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

  // Greeting detection
  if(
    greetings.some(
      greet => text.includes(greet)
    )
  ){

    const greetingReplies = [

      `Hey ${userName}! 💜 It's really nice talking to you.`,

      `Hello ${userName} 😊 How has your day been so far?`,

      `Hii 🌸 I'm glad you're here. How are you feeling today?`,

      `Heyy 💜 Tell me what's on your mind today.`,

      `Hello there ✨ I'm here for you anytime.`,

      `Hey ${userName}! 😊 I hope your day is going okay.`

    ];

    return greetingReplies[
      Math.floor(
        Math.random() *
        greetingReplies.length
      )
    ];
  }

  // MOTIVATIONAL
  const motivational = [

    "🌸 One difficult day doesn't define your life.",

    "💜 You deserve kindness too.",

    "🌈 Better days slowly come back.",

    "✨ Healing takes time and that's okay.",

    "🌙 You're stronger than you think.",

    "🔥 Tough moments create stronger people."
  ];

  // EMOTIONAL RESPONSES
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

  // EXAMS
  if(
    text.includes("exam") ||
    text.includes("study")
  ){

    pool.push(
      `Academic pressure can become exhausting 📚`,
      `Please don't let marks define your worth 💜`
    );
  }

  // RELATIONSHIP
  if(
    text.includes("breakup") ||
    text.includes("relationship")
  ){

    pool.push(
      `Heartbreak changes people deeply 💔`,
      `Emotional pain takes time to heal 🌙`
    );
  }

  // FAMILY
  if(text.includes("family")){

    pool.push(
      `Family pressure can become emotionally heavy.`,
      `You deserve understanding too 💙`
    );
  }

  // RANDOM RESPONSE
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

  // FOLLOW UPS
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
