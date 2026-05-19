function generateReply(message, emotion){

  const text =
    message.toLowerCase();

  // Random motivational lines
  const motivational = [

    "🌸 One difficult moment doesn't define your whole life.",

    "💜 You deserve kindness — especially from yourself.",

    "🌈 Better days slowly come back.",

    "✨ Healing isn't linear, and that's okay.",

    "🌙 You're doing better than you think.",

    "🔥 Hard times often create strong people.",

    "💙 It's okay to take things slowly."
  ];

  // Human-style conversation replies
  const responses = {

    joy: [

      `Awww that's honestly so nice to hear 😄`,

      `That sounds really exciting ${userName}!`,

      `I'm genuinely happy for you 💜`,

      `You sound really happy right now and I love that 🌟`,

      `That's such a beautiful feeling honestly ✨`,

      `Looks like something good finally happened 😄`
    ],

    sadness: [

      `I'm really sorry you're feeling like this 💙`,

      `That sounds emotionally exhausting honestly.`,

      `You don't always have to pretend you're okay 🌙`,

      `I know things probably feel heavy right now.`,

      `Sometimes life becomes overwhelming and that's valid.`,

      `I'm glad you shared this instead of keeping it inside 💜`,

      `That must have hurt a lot honestly.`,

      `I wish I could give you a hug right now 🌸`
    ],

    anger: [

      `That would frustrate anyone honestly 🔥`,

      `Yeah... I understand why you're upset.`,

      `Sometimes people really hurt us deeply.`,

      `That situation sounds unfair to you.`,

      `You don't need to suppress your feelings 💜`,

      `Anger usually comes from pain underneath.`
    ],

    fear: [

      `That sounds stressful honestly 💚`,

      `I know anxiety can make everything feel heavier.`,

      `You're carrying a lot mentally right now.`,

      `It's okay to feel scared sometimes.`,

      `Take one thing at a time 🌿`,

      `Your mind probably feels very overwhelmed right now.`
    ],

    lonely: [

      `Feeling lonely hurts more than people realize 💜`,

      `I'm here with you right now.`,

      `You deserve people who truly understand you.`,

      `I know that empty feeling can be painful.`,

      `You're not invisible 🌸`,

      `Even when it feels lonely, your presence matters.`
    ],

    tired: [

      `You sound emotionally drained 🌙`,

      `You've probably been carrying too much alone.`,

      `Rest is important too 💜`,

      `It's okay to slow down sometimes.`,

      `You don't have to solve everything today.`,

      `Your mind and heart both seem tired.`
    ],

    neutral: [

      `Hmm... tell me more about that 😊`,

      `That sounds interesting honestly.`,

      `And how did that make you feel? 💜`,

      `I'm listening 🌸`,

      `I understand what you're saying.`,

      `Go on... I'm here.`
    ]
  };

  // Select emotion responses
  let pool =
    responses[emotion] ||
    responses["neutral"];

  // Dynamic contextual additions
  if(text.includes("exam") || text.includes("study")){

    pool.push(
      `Exams can seriously drain people mentally 📚`,
      `Don't let marks decide your worth 💜`,
      `Academic pressure can become really overwhelming.`
    );
  }

  if(text.includes("breakup") || text.includes("love")){

    pool.push(
      `Heartbreak changes people deeply 💔`,
      `Losing someone emotionally is never easy.`,
      `Relationships can leave deep emotional scars.`
    );
  }

  if(text.includes("friend")){

    pool.push(
      `Friendship problems hurt a lot honestly.`,
      `Being misunderstood by friends feels terrible.`,
      `Real friendships should feel safe 💜`
    );
  }

  if(text.includes("family")){

    pool.push(
      `Family pressure can become emotionally exhausting.`,
      `Sometimes family situations are complicated.`,
      `You deserve understanding too 💙`
    );
  }

  if(text.includes("alone")){

    pool.push(
      `You don't deserve to feel alone.`,
      `Loneliness can make everything feel heavier.`,
      `I'm really glad you're talking instead of isolating yourself.`
    );
  }

  // Select random response
  const response =
    pool[
      Math.floor(
        Math.random() *
        pool.length
      )
    ];

  // Add motivation randomly
  const addMotivation =
    Math.random() > 0.4;

  let finalReply = response;

  if(addMotivation){

    const quote =
      motivational[
        Math.floor(
          Math.random() *
          motivational.length
        )
      ];

    finalReply += `\n\n${quote}`;
  }

  // Add natural follow-up randomly
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
