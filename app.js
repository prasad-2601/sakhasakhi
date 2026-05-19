function detectEmotion(message){

  const text =
    message.toLowerCase();

  // JOY
  if(
    text.includes("happy") ||
    text.includes("excited") ||
    text.includes("great") ||
    text.includes("amazing") ||
    text.includes("good") ||
    text.includes("won") ||
    text.includes("success") ||
    text.includes("love")
  ){
    return {
      emotion:"joy",
      emoji:"😄",
      label:"Joyful"
    };
  }

  // SADNESS
  if(
    text.includes("sad") ||
    text.includes("cry") ||
    text.includes("broken") ||
    text.includes("hurt") ||
    text.includes("depressed") ||
    text.includes("pain") ||
    text.includes("upset")
  ){
    return {
      emotion:"sadness",
      emoji:"💙",
      label:"Feeling Low"
    };
  }

  // ANGER
  if(
    text.includes("angry") ||
    text.includes("mad") ||
    text.includes("hate") ||
    text.includes("frustrated") ||
    text.includes("annoyed")
  ){
    return {
      emotion:"anger",
      emoji:"🔥",
      label:"Frustrated"
    };
  }

  // FEAR / STRESS
  if(
    text.includes("fear") ||
    text.includes("scared") ||
    text.includes("anxiety") ||
    text.includes("worried") ||
    text.includes("stress") ||
    text.includes("nervous")
  ){
    return {
      emotion:"fear",
      emoji:"💚",
      label:"Anxious"
    };
  }

  // TIRED
  if(
    text.includes("tired") ||
    text.includes("exhausted") ||
    text.includes("drained")
  ){
    return {
      emotion:"tired",
      emoji:"🌙",
      label:"Exhausted"
    };
  }

  // LONELY
  if(
    text.includes("alone") ||
    text.includes("lonely") ||
    text.includes("nobody")
  ){
    return {
      emotion:"lonely",
      emoji:"💜",
      label:"Lonely"
    };
  }

  return {
    emotion:"neutral",
    emoji:"😊",
    label:"Calm"
  };
}
