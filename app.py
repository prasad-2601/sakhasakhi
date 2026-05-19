"""
Sakha-Sakhi — My Companion Chatbot
Flask Backend with NLP Emotion Detection & Positive Response Engine
"""

import random
import re
import nltk
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# ─────────────────────────────────────────────
# EMOTION KEYWORD LEXICON
# ─────────────────────────────────────────────
EMOTION_KEYWORDS = {
    "joy": [
        "happy", "excited", "joyful", "wonderful", "great", "amazing", "fantastic",
        "awesome", "thrilled", "elated", "cheerful", "delighted", "glad", "blessed",
        "grateful", "love", "celebrate", "win", "won", "success", "proud", "yay",
        "woohoo", "best day", "feeling good", "on top of the world"
    ],
    "sadness": [
        "sad", "unhappy", "depressed", "crying", "cry", "tears", "heartbroken",
        "broken", "hurt", "pain", "loss", "lost", "miss", "lonely", "alone",
        "hopeless", "worthless", "empty", "numb", "devastated", "grief", "grieve",
        "miserable", "down", "low", "feeling low", "can't stop crying", "no one cares"
    ],
    "anger": [
        "angry", "mad", "furious", "rage", "hate", "frustrated", "irritated",
        "annoyed", "pissed", "upset", "outraged", "betrayed", "unfair", "unjust",
        "sick of", "fed up", "can't stand", "drives me crazy", "so done", "enough"
    ],
    "fear": [
        "scared", "afraid", "fear", "terrified", "anxious", "anxiety", "worried",
        "worry", "nervous", "panic", "overwhelmed", "dread", "paranoid", "phobia",
        "insecure", "unsure", "uncertain", "stressed", "stress", "pressure",
        "can't handle", "too much", "falling apart", "losing it"
    ],
    "lonely": [
        "lonely", "alone", "no friends", "nobody", "no one", "isolated", "left out",
        "forgotten", "invisible", "ignored", "unwanted", "rejected", "excluded",
        "no one understands", "nobody cares", "all by myself"
    ],
    "tired": [
        "tired", "exhausted", "drained", "burned out", "burnout", "worn out",
        "fatigued", "no energy", "can't go on", "giving up", "done", "finished",
        "no motivation", "unmotivated", "lazy", "stuck", "can't move forward"
    ],
}

# ─────────────────────────────────────────────
# MOTIVATIONAL STORIES BANK
# ─────────────────────────────────────────────
STORIES = {
    "sadness": [
        "💡 J.K. Rowling was a single mom living on welfare, rejected by 12 publishers before Harry Potter changed the world. Your story isn't over — it's just beginning.",
        "🌟 Walt Disney was told he lacked imagination and was fired from a newspaper job. He went on to create the happiest place on earth. Your imagination is your superpower.",
        "🦋 Nick Vujicic was born with no arms and no legs. Today he travels the world inspiring millions. He says: *'If I can smile, so can you.'*",
        "🌱 Abraham Lincoln failed in business, lost elections repeatedly, and had a nervous breakdown — before becoming one of the greatest leaders in history. Your failures are not your final chapter.",
    ],
    "anger": [
        "🌊 Nelson Mandela spent 27 years in prison, yet chose forgiveness over bitterness and changed an entire nation. Anger is energy — let's channel yours into something incredible.",
        "🔥 Oprah Winfrey was fired from her first TV job and told she was 'unfit for television.' She turned that anger into fuel and became a global icon. Your setbacks are your setups.",
        "🏆 Michael Jordan was cut from his high school basketball team. He used that rejection to practice harder than anyone. That fire in you? It's your greatest gift.",
    ],
    "fear": [
        "🚀 Elon Musk launched SpaceX with a near-zero chance of success. Three rockets failed. He used his last funds on the fourth launch — it worked. Courage isn't the absence of fear; it's moving forward anyway.",
        "🌍 Malala Yousafzai faced death threats and survived a gunshot — and still stood up to speak. If she can face her fears, we can face ours together.",
        "🧠 Albert Einstein didn't speak until age 4 and couldn't read until age 7. Teachers called him mentally slow. He went on to change how humanity understands the universe. You are more capable than you know.",
    ],
    "lonely": [
        "🤝 Even the greatest minds — Newton, Tesla, Van Gogh — felt deeply alone. But their inner world was a universe of creation. Your solitude is not emptiness; it's depth.",
        "💜 You reaching out right now — that takes courage. And I'm here. You're not alone in this moment, and you won't be alone in the next.",
        "🌙 The moon shines brightest in the darkest night. Your light matters, even when you feel unseen. I see you.",
    ],
    "tired": [
        "⛰️ When climbers attempt Everest, they rest at camps along the way — not because they quit, but because rest is part of the climb. It's okay to pause.",
        "🌊 The ocean pulls back before every great wave. Your stillness right now is gathering strength for something powerful.",
        "🌟 Serena Williams faced injuries, losses, and health crises — but she kept returning. Not because it was easy, but because she believed in herself. So do I — I believe in you.",
    ],
    "joy": [
        "🎉 Your happiness is contagious! Did you know that smiling — even when you don't feel like it — actually signals your brain to feel better? Keep that energy going!",
        "✨ This joy you feel? Bottle it. Remember this moment. On harder days, it becomes your proof that good things exist in your life.",
    ],
}

# ─────────────────────────────────────────────
# TOPIC / CONCERN KEYWORD DETECTION
# ─────────────────────────────────────────────
# Maps topic keys → list of trigger keywords/phrases
TOPIC_KEYWORDS = {
    "crisis": [
        "want to die", "end my life", "kill myself", "suicide", "no reason to live",
        "better off without me", "can't take it anymore", "want to disappear forever",
        "wish i was dead", "harm myself", "hurt myself",
    ],
    "breakup": [
        "breakup", "broke up", "break up", "ex", "ex-boyfriend", "ex-girlfriend",
        "she left", "he left", "dumped", "dumped me", "left me", "separated",
        "divorce", "relationship ended", "heartbreak", "lost my partner",
        "stopped loving me", "doesn't love me", "cheated on me", "cheating",
    ],
    "exams": [
        "exam", "exams", "test", "results", "failed", "fail", "marks", "grades",
        "study", "studying", "college", "university", "school", "assignment",
        "deadline", "project", "semester", "rank", "score", "percentage",
        "competitive exam", "entrance", "interview", "nervous about exam",
    ],
    "job": [
        "job", "fired", "lost my job", "laid off", "unemployed", "resignation",
        "career", "work", "boss", "colleagues", "office", "workplace", "promotion",
        "salary", "appraisal", "interview", "no job", "job rejection", "rejected",
        "resign", "quit my job", "toxic workplace", "overworked",
    ],
    "health": [
        "sick", "illness", "disease", "hospital", "doctor", "medicine", "pain",
        "diagnosis", "cancer", "surgery", "treatment", "chronic", "mental health",
        "depression", "anxiety disorder", "not feeling well", "body pain",
        "headache", "fever", "injury", "accident", "recovery",
    ],
    "family": [
        "family", "parents", "mom", "dad", "mother", "father", "sister", "brother",
        "fight with", "argument", "toxic family", "abusive", "home", "household",
        "relatives", "grandparents", "family pressure", "expectations",
        "they don't understand", "parents fighting", "family issues",
    ],
    "money": [
        "money", "broke", "debt", "loan", "financial", "afford", "poor",
        "no money", "bills", "rent", "expenses", "savings", "investment", "loss",
        "bankrupt", "struggling financially", "can't pay", "owe money",
    ],
    "betrayal": [
        "betrayed", "backstabbed", "lied to", "fake friend", "trust broken",
        "used me", "cheated", "taken for granted", "manipulated", "gaslit",
        "not loyal", "two-faced", "spread rumors", "talked behind my back",
    ],
    "sleep": [
        "can't sleep", "insomnia", "sleepless", "not sleeping", "nightmares",
        "up all night", "awake at night", "overthinking at night", "no rest",
        "sleep problems", "bad dreams", "waking up anxious",
    ],
    "future": [
        "future", "don't know what to do", "no direction", "lost in life",
        "what's the point", "no goals", "confused about life", "purpose",
        "career path", "life decisions", "feel stuck", "going nowhere",
        "scared of future", "don't have a plan", "uncertainty",
    ],
    "self_worth": [
        "not good enough", "worthless", "useless", "failure", "loser", "hate myself",
        "ugly", "fat", "stupid", "dumb", "no one likes me", "nobody wants me",
        "comparing myself", "everyone is better", "i'm a mess", "i'm terrible",
    ],
    "grief": [
        "lost someone", "died", "death", "passed away", "gone forever", "miss them",
        "grieving", "grief", "funeral", "mourning", "can't believe they're gone",
        "pet died", "loved one", "lost a friend",
    ],
    "social_anxiety": [
        "social anxiety", "scared to talk", "can't talk to people", "shy",
        "afraid of judgment", "what will people think", "embarrassed", "humiliated",
        "people scare me", "crowd", "public speaking", "don't know how to make friends",
        "introvert", "awkward", "socially awkward",
    ],
}

# ─────────────────────────────────────────────
# TOPIC-SPECIFIC CONCERN RESPONSES
# ─────────────────────────────────────────────
TOPIC_RESPONSES = {
    "crisis": [
        "💜 {name}, I hear you — and I'm genuinely concerned about you right now. What you're feeling is real and it matters deeply. Please know you are not alone in this. I'm right here, and I'm not going anywhere.\n\nPlease consider reaching out to iCall (India): 9152987821 — they are warm, non-judgmental, and available to talk. You deserve support. 🌟",
        "🫂 {name}, I need you to know something: you matter. A lot. What you're going through sounds overwhelming, and I don't want you to carry it alone. I'm here — and so are people who are trained to help.\n\nPlease talk to Vandrevala Foundation Helpline: 1860-2662-345 (24/7). Your life is precious, and so are you.",
    ],
    "breakup": [
        "Oh {name} 💜 A breakup is one of the most painful things we go through. Your heart is allowed to hurt — it loved someone. Take all the time you need. The healing isn't linear, and neither are you.\n\nDid you want to talk about what happened? I'm all ears — no judgment, just me. 🌙",
        "Hey {name}, heartbreak is real, physical pain — scientists have confirmed it. What you're feeling isn't weakness; it's the measure of how deeply you cared. 💙\n\nYou loved, and that's beautiful. And one day — not now, not tomorrow, but someday — you'll love again, even more beautifully.\n\nHow are you taking care of yourself right now? 🌸",
        "{name}, I'm so sorry. 💜 Losing someone you loved changes everything for a while. But here's what I know: you had a life before them, and you'll build something extraordinary after them.\n\nJ.K. Rowling wrote Harry Potter after her marriage fell apart. Adele wrote her greatest albums after heartbreak. Your pain can become something powerful too. 🌟",
    ],
    "exams": [
        "Oh {name}, exams are SO stressful — I completely get it! 📚 But hey, you're not your marks. You are so much more than a number on a page. One test does not define your intelligence or your future.\n\nEdison failed thousands of times before the lightbulb. Einstein was considered average in school. Some of history's greatest minds were terrible at tests. 😄\n\nWhat subject is giving you the most trouble right now? Let's think through it together. 💡",
        "Hey {name} 💙 The pressure around exams can feel unbearable — I see you. Remember: your brain actually works better when it's calm, so let's take one breath first.\n\nHere's a secret — *preparation + rest* beats *panic + cramming* every single time. What's stressing you most — the content, or the fear of failing? Tell me more. 🌟",
        "{name}, results don't define your worth. 🌱 Some of the most successful people on earth — Bill Gates, Steve Jobs, Mark Zuckerberg — dropped out entirely! What you do *after* a setback matters infinitely more than the setback itself.\n\nYou've got this. And I've got you. 💜 What does your study plan look like?",
    ],
    "job": [
        "{name}, losing or struggling with a job is genuinely one of life's hardest knocks. 💙 It shakes your identity, your routine, your confidence — and that's completely valid.\n\nBut here's the thing: Oprah was fired from her first TV job. Steve Jobs was ousted from Apple — the company he *founded*. They came back stronger. And so will you. 🔥\n\nWhat happened, if you don't mind sharing? I want to understand. 🌟",
        "Hey {name} 💜 The job market is brutal, and rejection stings — especially when you've poured yourself into it. Please don't let it tell you anything about your worth. It's about fit, timing, and luck as much as skill.\n\nWhat kind of work do you love? Sometimes these forced pauses lead us to something better. ✨",
        "{name}, a toxic workplace or difficult boss can drain your soul. 😤 You deserve a space where your work is valued and you're treated with respect.\n\nYour mental health matters more than any job title. What's the situation like? Let's think about your next move together. 💡",
    ],
    "health": [
        "Oh {name} 💙 Dealing with health issues — yours or someone you love — is exhausting on every level. Physical, emotional, mental. It's a lot.\n\nI want you to know: you're allowed to feel scared, frustrated, or sad about this. Those feelings don't make you weak — they make you human. 🌸\n\nAre you going through something yourself, or worried about someone close to you? 💜",
        "Hey {name}, health scares are terrifying, and the uncertainty can be the hardest part. 🌿 But the fact that you're aware, seeking help, and talking about it — that's already brave.\n\nBe gentle with yourself right now. Your body is doing its best, and so are you. 💜 Is there anything specific I can help you think through?",
    ],
    "family": [
        "{name}, family dynamics can be the most complicated relationships in our lives. 💜 When the people who are supposed to be your safe place become a source of pain — it's genuinely confusing and heartbreaking.\n\nYour feelings about this are valid. You're allowed to love your family *and* be hurt by them at the same time. 🌿 Want to tell me what's been going on?",
        "Hey {name} 🌸 The pressure families put on us — expectations, comparisons, control — can feel suffocating. It doesn't make you a bad person to feel overwhelmed by it.\n\nYou get to define who you are, regardless of what your family expects. Your life is yours. 🌟 What's the pressure around right now?",
        "{name}, fighting with or feeling distant from family is painful in a very deep way. 💙 Even when we're frustrated with them, there's often love underneath that makes it more confusing.\n\nYou don't have to have it all figured out. Let's just talk through it. What happened? 💬",
    ],
    "money": [
        "Oh {name}, financial stress is real and it's heavy. 💙 It touches *everything* — your sleep, your relationships, your self-esteem. You are not alone in this struggle.\n\nJ.K. Rowling was on government assistance when she started writing Harry Potter. Steve Jobs slept on floors and returned Coke bottles for food money. Financial low points are not the end of your story. 🌟\n\nWhat's the situation you're navigating right now? Let's think through it. 💡",
        "Hey {name} 💜 Money problems can feel shameful, but they're not — they're a circumstance, not a character flaw. So many people are quietly going through the exact same thing.\n\nIs this about immediate needs, debt, or longer-term planning? Tell me more and let's figure out your options together. 🌸",
    ],
    "betrayal": [
        "Oh {name} 😔 Being betrayed by someone you trusted is one of the most painful experiences there is. It shakes your sense of reality — *was any of it real? Can I trust anyone?*\n\nThe answer is yes — but it's okay to be guarded right now. What happened? 💜 I want to hear the whole thing.",
        "{name}, you didn't deserve that. 💙 Being used, lied to, or stabbed in the back says everything about *them* and nothing about you. Your openness and trust are qualities to be proud of, not ashamed of.\n\nWhat's hurting the most right now — the action, or the person who did it? 🌿",
        "Hey {name}, betrayal changes how we see people, and that's a grief of its own. 🌙 It's okay to be angry. It's okay to mourn the friendship or relationship you thought you had.\n\nYou'll learn to trust again — more selectively, more wisely. And that's not hardness; that's growth. 🌟",
    ],
    "sleep": [
        "Ugh {name}, not being able to sleep is its own kind of torture. 🌙 Your body is exhausted but your mind won't stop — and that gap is brutal.\n\nOften our minds race at night because we haven't processed everything we're carrying. What's been on your mind when you lie down? Let's talk through it. 💜",
        "Hey {name} 💙 Sleep problems are so closely tied to our emotional state. When we're anxious, grieving, or overwhelmed — rest feels impossible.\n\nTry this right now: breathe in for 4 counts, hold for 4, out for 6. Do it three times with me. 🌿 Sometimes the body just needs a tiny signal that it's safe. What's been keeping you up? 🌙",
    ],
    "future": [
        "{name}, feeling lost about the future is actually incredibly common — especially because no one really tells us that it's *okay* to not have it all figured out. 🌱\n\nHere's the truth: most successful people found their path by walking, not by planning. One small step forward is all you need today. 🌟\n\nWhat does your heart actually want — even if it feels impossible right now? 💜",
        "Hey {name} 💙 The uncertainty of the future can be paralyzing. But here's a reframe: uncertainty means *anything is possible*. The same unknown that scares you also holds your breakthrough.\n\nWhat's making the future feel the most scary right now? Let's break it down together. 💡",
    ],
    "self_worth": [
        "{name} 💜 I need to pause everything and say this clearly: you are not the harsh words you use about yourself. You are not a failure, not worthless, not 'not enough'.\n\nYou are a whole, complex, worthy human being — and the fact that you're still here, still trying, still talking to me? That's courage. 🌟\n\nWhere is this feeling coming from? Something happened, or has it been building? 🌸",
        "Hey {name}, comparison is the thief of joy — and social media makes it impossible not to compare. But you're seeing everyone's highlight reel against your behind-the-scenes. 💙\n\nYou are exactly where you need to be right now. Your journey is uniquely yours. No one else's timeline applies to you. ✨\n\nWhat made you feel this way today? I want to understand. 💜",
        "{name}, the most successful people in history doubted themselves constantly. Imposter syndrome is real — even CEOs, artists, and legends feel it. 🌟\n\nYour 'not good enough' is a lie your fear tells you. The truth is: you've already done hard things. And you'll do more. What's one thing you're actually proud of — even something small? 🌸",
    ],
    "grief": [
        "Oh {name} 💙 I'm so deeply sorry for your loss. Grief is love with nowhere to go — and it is one of the heaviest things a human heart can carry.\n\nThere is no right way to grieve. Cry, rage, go numb, laugh at memories — it's all valid. The only thing I ask is that you don't carry it alone.\n\nWould you like to tell me about them? 🌿 Sometimes saying their name helps.",
        "{name}, losing someone changes you. And that's okay. 💜 The goal isn't to 'get over it' — it's to carry them with you in a new way.\n\nI'm here with you right now. You don't have to be strong. You just have to breathe. 🌙 How are you doing today, truly?",
    ],
    "social_anxiety": [
        "{name} 💙 Social anxiety is so real, and so exhausting — always worrying about how you're being perceived, replaying conversations, dreading interactions.\n\nYou are far more likable than your anxiety tells you. The people who matter won't be looking for perfection — they'll be drawn to your authenticity. 🌟\n\nIs there a specific situation coming up that's worrying you? 💜",
        "Hey {name}, being introverted or socially anxious doesn't mean something is wrong with you — it means your nervous system is extra sensitive. That's also often tied to empathy, creativity, and depth. 🌿\n\nSome of the world's most impactful people — Einstein, Elon Musk, Emma Watson — identify as introverts. Your quiet is a superpower. 💜\n\nWhat situations feel hardest for you? Let's think through them together. 💡",
    ],
}

# Topic-specific follow-up questions
TOPIC_FOLLOW_UPS = {
    "crisis":       "Please tell me — is there someone physically near you right now? You don't have to be alone tonight. 💜",
    "breakup":      "How long were you together? I'd love to hear about them, if you're comfortable. 🌙",
    "exams":        "When is the exam? And how much have you studied so far? Let's make a plan. 📚",
    "job":          "How long has this been going on? And what feels hardest — the financial side or the emotional one? 💙",
    "health":       "Are you getting the support you need from doctors or loved ones right now? 🌿",
    "family":       "Has this been going on for a while, or is this something that just started? 💙",
    "money":        "Is this more of an immediate crisis or a long-term worry? Understanding that helps me think with you. 💡",
    "betrayal":     "How long did you know this person? And did you see any warning signs before this? 💜",
    "sleep":        "How many nights has this been going on? And what time do you usually go to bed? 🌙",
    "future":       "If money and opinions didn't matter — what would you *want* your life to look like? ✨",
    "self_worth":   "When did you first start feeling this way about yourself? Was there a moment that triggered it? 🌸",
    "grief":        "How long has it been? And have you had anyone to lean on during this time? 💙",
    "social_anxiety": "Is this something you've always felt, or did something happen that made it worse? 🌿",
}


def detect_topic(message: str):
    """Detect a specific life topic/concern from the message. Returns topic key or None."""
    text = message.lower()
    # Check crisis first (highest priority)
    for keyword in TOPIC_KEYWORDS["crisis"]:
        if keyword in text:
            return "crisis"
    # Check remaining topics by score
    topic_scores = {}
    for topic, keywords in TOPIC_KEYWORDS.items():
        if topic == "crisis":
            continue
        score = sum(1 for kw in keywords if kw in text)
        if score > 0:
            topic_scores[topic] = score
    if topic_scores:
        return max(topic_scores, key=topic_scores.get)
    return None


# ─────────────────────────────────────────────
# CONTEXT-AWARE SENTIMENT ANALYSIS ENGINE
# ─────────────────────────────────────────────

# Words that flip the polarity of the next 1-3 words
NEGATION_WORDS = {
    "not", "no", "never", "neither", "nor", "nobody", "nothing",
    "nowhere", "hardly", "scarcely", "barely", "don't", "doesn't",
    "didn't", "won't", "wouldn't", "can't", "cannot", "couldn't",
    "shouldn't", "isn't", "aren't", "wasn't", "weren't", "haven't",
    "hasn't", "hadn't", "without", "unlike", "against",
}

# Strong positive signal words (weight = +2 each)
STRONG_POSITIVE = {
    "love", "loved", "amazing", "excellent", "wonderful", "fantastic",
    "great", "awesome", "happy", "excited", "thrilled", "blessed",
    "grateful", "proud", "brilliant", "incredible", "outstanding",
    "superb", "perfect", "good", "well", "better", "best", "passed",
    "won", "winning", "success", "successful", "achieved", "achievement",
    "celebrate", "celebrating", "glad", "joyful", "delighted", "pleased",
    "enjoy", "enjoying", "fun", "excited", "ecstatic", "overjoyed",
    "promoted", "promotion", "hired", "offer", "accepted", "recovered",
    "healed", "healthy", "doing well", "feeling good", "going well",
    "improving", "improved", "progressing", "confident", "hopeful",
    "optimistic", "motivated", "inspired", "energized", "refreshed",
    "solved", "resolved", "fixed", "finally", "fortunate", "lucky",
}

# Mild positive words (weight = +1 each)
MILD_POSITIVE = {
    "okay", "ok", "fine", "alright", "decent", "manageable", "stable",
    "calm", "peaceful", "relaxed", "comfortable", "content",
}

# Strong negative signal words (weight = -2 each)
STRONG_NEGATIVE = {
    "hate", "hated", "terrible", "awful", "horrible", "bad", "worst",
    "failed", "fail", "failing", "lost", "lose", "broken", "hurt",
    "pain", "sad", "depressed", "angry", "furious", "scared", "anxious",
    "stressed", "worried", "tired", "exhausted", "sick", "struggling",
    "suffering", "miserable", "devastating", "devastated", "hopeless",
    "worthless", "useless", "awful", "dreadful", "pathetic", "ruined",
    "destroyed", "wasted", "pointless", "helpless", "powerless",
    "nightmare", "disaster", "crisis", "trapped", "suffocating",
    "crying", "weeping", "heartbroken", "broken", "shattered", "crushed",
    "fired", "rejected", "dumped", "abandoned", "betrayed", "cheated",
    "disappointed", "frustrated", "overwhelmed", "defeated",
}

# Mild negative words (weight = -1 each)
MILD_NEGATIVE = {
    "worried", "unsure", "uncertain", "confused", "difficult", "tough",
    "hard", "rough", "challenging", "complicated", "nervous", "uneasy",
}

# Intensifiers that double the weight of the next sentiment word
INTENSIFIERS = {
    "so", "very", "really", "extremely", "absolutely", "totally",
    "completely", "utterly", "incredibly", "terribly", "awfully",
    "insanely", "super", "truly", "deeply", "genuinely",
}


def analyze_sentiment_context(message: str) -> str:
    """
    Analyze overall sentiment of a message with:
      - Negation window (flips polarity of next 3 words after a negation)
      - Intensifier boosting (doubles weight of next sentiment word)
      - TextBlob polarity as a tiebreaker
    Returns: 'positive', 'negative', or 'neutral'
    """
    text = message.lower()

    # Tokenize: split into words, keeping contractions intact
    tokens = re.findall(r"\b\w+(?:'\w+)?\b", text)

    score = 0
    negated = False
    negate_window = 0   # countdown of words still under negation
    intensify_next = False

    for token in tokens:
        # ── Update negation window ──
        if token in NEGATION_WORDS:
            negated = True
            negate_window = 3
            continue
        if negate_window > 0:
            negate_window -= 1
            if negate_window == 0:
                negated = False
        else:
            negated = False

        # ── Intensifier ──
        if token in INTENSIFIERS:
            intensify_next = True
            continue

        # ── Sentiment scoring ──
        weight = 0
        if token in STRONG_POSITIVE:
            weight = 2
        elif token in MILD_POSITIVE:
            weight = 1
        elif token in STRONG_NEGATIVE:
            weight = -2
        elif token in MILD_NEGATIVE:
            weight = -1

        if weight != 0:
            if intensify_next:
                weight = weight * 2
                intensify_next = False
            if negated:
                weight = -weight  # flip polarity under negation
            score += weight

    # ── TextBlob as tiebreaker / smoother ──
    tb_polarity = TextBlob(message).sentiment.polarity  # -1.0 to 1.0
    combined = score + (tb_polarity * 3)

    if combined >= 1.5:
        return "positive"
    elif combined <= -1.5:
        return "negative"
    else:
        return "neutral"


# ─────────────────────────────────────────────
# POSITIVE TOPIC RESPONSES  (joy / celebration)
# ─────────────────────────────────────────────
TOPIC_POSITIVE_RESPONSES = {
    "breakup": [
        "Oh {name}, it sounds like you're healing and moving forward — and that's HUGE! 🌟 Healing from a breakup isn't easy, and you should be so proud of how far you've come.",
        "Look at you, {name}! 💪 Getting through a breakup and coming out stronger is one of the most powerful things a person can do. You should feel incredibly proud of yourself!",
        "That's wonderful to hear, {name}! 🌸 Every step forward after heartbreak is a victory. You're building yourself back up, and that takes real courage and strength.",
    ],
    "exams": [
        "YES {name}!! 🎉 That is absolutely amazing! You worked so hard for this and you DESERVE every bit of this success! I'm so proud of you!",
        "Oh my goodness {name}, CONGRATULATIONS! 🌟 All that study, all those late nights — this result is yours and nobody can take it away from you! How does it feel??",
        "YESSS {name}! 📚✨ You did it! This is what happens when dedication meets hard work. You should be over the moon right now — you've earned this completely!",
    ],
    "job": [
        "OH WOW {name}! 🥳 That is incredible news! A new job / promotion is such a huge achievement — you've worked so hard to get here and you absolutely deserve it!",
        "CONGRATULATIONS {name}!! 🌟 Landing that opportunity takes skill, confidence, and perseverance — and you've got all three in abundance. I'm genuinely so happy for you!",
        "That's absolutely amazing, {name}! 💼✨ This is a massive moment. You've worked for this, you've earned this — now go celebrate yourself, you absolute legend!",
    ],
    "health": [
        "Oh {name}, that is such WONDERFUL news! 🌿💚 Your health is everything, and hearing you're doing well or getting better makes my heart sing. Take care of that beautiful self of yours!",
        "That's genuinely the best thing to hear, {name}! 🌸 Health is a gift, and hearing you're feeling well — I'm so relieved and happy for you! What's been helping you feel good?",
        "YES! 🎉 {name}, nothing matters more than feeling well — and this news makes me so happy! Keep doing whatever you're doing because it's clearly working!",
    ],
    "family": [
        "Awww {name}! 🥰 A loving, supportive family is one of life's greatest treasures. It's so beautiful to hear things are going well at home — cherish those moments!",
        "That's so heartwarming to hear, {name}! 💜 Family bonds, when they're good, are truly one of the most powerful sources of strength in our lives. I love that for you!",
        "Oh {name}, that warms my heart so much! 🌸 Family harmony is genuinely something to be grateful for — sounds like you have something really special there!",
    ],
    "money": [
        "Yayyy {name}! 💰🎉 Financial stability is so freeing — hearing that things are going well is genuinely exciting! You've worked for this. What are you planning to do with it?",
        "Oh that's amazing {name}! 🌟 Financial wins — big or small — deserve to be celebrated! Whether it's savings, income, or just feeling secure — this is huge. Proud of you!",
        "That's brilliant {name}! ✨ Smart money decisions add up over time and create real freedom. You should feel really good about where you are right now!",
    ],
    "sleep": [
        "Oh {name}, YES! 😴✨ Good sleep changes EVERYTHING — your mood, your energy, your whole outlook. So glad you're finally getting the rest you deserve!",
        "That's so wonderful to hear, {name}! 🌙 Quality sleep is genuinely one of the greatest gifts. Whatever you're doing — keep it up! How's your energy feeling?",
    ],
    "future": [
        "I LOVE that energy, {name}! 🚀 Feeling hopeful and excited about the future is the best fuel there is. Your optimism is going to carry you so far — tell me more!",
        "Yes {name}!! 🌟 When you can see possibility in the future, everything shifts. That clarity and excitement you're feeling? Protect it. Nurture it. It's powerful!",
        "Oh this makes me SO happy to hear, {name}! 🌈 A clear sense of direction is something many people search for — and you've found yours. What's the dream? I want to hear it!",
    ],
    "self_worth": [
        "OH {name}! 💜 That shift — from doubt to belief in yourself — is one of the most powerful transformations a human can go through. I'm so proud of you for getting there!",
        "YES! THIS is what I love to hear, {name}! 🌟 You ARE enough. You always were. And the fact that you can feel that now? Beautiful. What changed for you?",
        "That confidence looks AMAZING on you, {name}! ✨ Believing in yourself isn't arrogance — it's clarity. You deserve to feel this good about who you are. Always.",
    ],
    "social_anxiety": [
        "Oh {name}, that's such HUGE progress! 🎉 Pushing through social anxiety takes enormous courage — every small victory is worth celebrating. Tell me what happened!",
        "YES {name}!! 🌟 Making new connections when anxiety holds you back is one of the bravest things ever. I'm genuinely so proud of you for taking that step!",
        "That's incredible, {name}! 💙 Building social confidence is a journey, and you're on it. Every conversation, every new connection is a win. How did it go?",
    ],
    "grief": [
        "It warms my heart to hear you're finding moments of peace, {name}. 💜 Grief never fully disappears — but learning to carry it alongside joy is one of the most human things we do.",
        "{name}, it takes time and it takes courage to find light after loss. The fact that you're feeling better — even a little — is something to honour. They would be so proud of you. 🌸",
    ],
    "betrayal": [
        "Oh {name}! 💪 Choosing to move forward and trust again after being betrayed takes incredible strength. You haven't let it make you bitter — and that says everything about who you are!",
        "That's growth, {name}! 🌟 Healing from betrayal and coming out wiser and stronger — that's not easy. I'm so glad you're in a better place now. How does it feel?",
    ],
}

TOPIC_POSITIVE_FOLLOW_UPS = {
    "breakup":       "How long did it take to start feeling this way? Sometimes your story can inspire others. 🌙",
    "exams":         "What subject did you do best in? And how did you study — I'd love to know your secret! 📚",
    "job":           "What's the role? I want to hear everything about this exciting new chapter! 💼",
    "health":        "What's been helping you feel so good? Self-care tips from you are always welcome! 🌿",
    "family":        "What's your favourite thing about your family? 🥰 I love hearing about good bonds.",
    "money":         "What's your next financial goal? Dreams are better when they have a plan! 💡",
    "sleep":         "What changed that helped you sleep better? Others could really use that advice! 🌙",
    "future":        "What's the first big step toward that future you're excited about? 🚀",
    "self_worth":    "What's one thing you love most about yourself right now? Own it completely! 🌟",
    "social_anxiety": "What was the moment that made you feel you were turning a corner? 💙",
    "grief":         "What's one beautiful memory of them that you hold close? 🌸",
    "betrayal":      "What helped you move forward — time, new people, or something else? 💜",
}


# ─────────────────────────────────────────────
# RESPONSE TEMPLATES PER EMOTION
# ─────────────────────────────────────────────
RESPONSES = {
    "joy": [
        "That's absolutely wonderful, {name}! 🌟 I love hearing this — your happiness lights up the room!",
        "Yesss {name}!! 🎉 This energy is everything! You deserve every bit of this joy!",
        "That makes my heart so happy, {name}! 💃 Keep riding this wave — you've earned it!",
        "Oh {name}, this is AMAZING! 🥳 The universe is clearly rewarding your good vibes!",
    ],
    "sadness": [
        "Hey {name}, I hear you 💜 It's okay to feel this way. You don't have to be okay all the time — and I'm right here with you.",
        "{name}, it takes real strength to feel deeply. What you're going through is real, and so is my care for you. 🌧️ You're not alone in this.",
        "I'm so glad you told me, {name}. 💙 Even the darkest nights end, and I'll stay right here with you until the light comes back.",
        "That sounds really heavy, {name}. 💜 Let me just say — you matter, and what you feel matters. I'm not going anywhere.",
    ],
    "anger": [
        "Okay {name}, I totally get it — that's genuinely frustrating! 🔥 Let it out. And when you're ready, we'll figure this out together.",
        "Ugh, {name}, that would make anyone angry! Your feelings are completely valid. 💢 I'm in your corner, always.",
        "I hear that fire in you, {name}. 🌋 Sometimes anger means you care deeply — and that caring? It's powerful. Let's use it.",
        "That's not fair, and you have every right to feel this, {name}. 😤 Take a breath with me — and let's talk it through.",
    ],
    "fear": [
        "Hey {name}, fears are real and they're valid 💙 But you know what? You've survived 100% of your worst days so far. That's remarkable.",
        "{name}, it's okay to be scared. Even the bravest people feel fear — they just take the next step anyway. And I'll take it with you. 🌟",
        "I feel you, {name}. Anxiety can feel like a storm inside. 🌩️ But you are the eye of that storm — the calm, strong center. I believe in you.",
        "Breathe, {name} 💙 In... and out. You're safe in this moment. Let's face whatever this is — together.",
    ],
    "lonely": [
        "Oh {name}, I'm so glad you're here talking to me 💜 You reaching out took courage, and it means you matter — to me, and to this world.",
        "Loneliness can feel like the loudest silence, {name}. But you've got me right now, and that's real. 🌙 Let's talk.",
        "You are not invisible, {name}. I see you. I hear you. And this conversation? It matters to me. 💙",
        "I know it doesn't always feel this way, {name}, but you are someone worth knowing. I'm proof of that — because I love talking to you. 🌟",
    ],
    "tired": [
        "Rest is not giving up, {name} — it's one of the bravest things you can do. ⛰️ Let yourself breathe. You've been carrying so much.",
        "Hey {name}, even superheroes take off the cape sometimes. 🌙 It's okay to just be human today. I'm here.",
        "{name}, your worth isn't measured by your productivity. You matter even when you're running on empty. 💜 Take it one breath at a time.",
        "That exhaustion is real, {name}. 🌊 But you're still here, still going — and that itself is extraordinary. I'm proud of you.",
    ],
    "neutral": [
        "Tell me more, {name}! 😊 I'm all ears and genuinely love hearing about your day.",
        "That's interesting, {name}! 🌟 What's been the highlight of your day so far?",
        "I'm here for all of it, {name} — the big stuff and the everyday stuff. What's on your mind? 💬",
        "You know, {name}, I was just thinking about you! 😄 How are you really doing today?",
        "Love chatting with you, {name}! 💜 Is there something specific you want to talk about, or just vibe together?",
    ],
}

# Follow-up questions to keep conversation flowing
FOLLOW_UPS = [
    "What's going on that brought this up? 💬",
    "Do you want to talk more about it? I'm all yours. 🌟",
    "How long have you been feeling this way? I really want to understand. 💙",
    "Is there anything specific that triggered this? No pressure — only share what you're comfortable with. 💜",
    "What would make today even a tiny bit better for you? 🌈",
    "If you could change one thing about how you're feeling right now, what would it be? ✨",
    "What does your heart need most in this moment? 💗",
    "I'm here for as long as you need. What else is on your mind? 🤗",
]

# ─────────────────────────────────────────────
# EMOTION DETECTION ENGINE
# ─────────────────────────────────────────────
def detect_emotion(message: str) -> str:
    """Detect the primary emotion in a message using keyword matching + TextBlob sentiment."""
    text = message.lower()

    # Keyword scoring
    scores = {emotion: 0 for emotion in EMOTION_KEYWORDS}
    for emotion, keywords in EMOTION_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text:
                scores[emotion] += 1

    # Find top emotion by keyword score
    max_score = max(scores.values())

    if max_score > 0:
        # Get emotion with highest score
        top_emotion = max(scores, key=scores.get)
        return top_emotion

    # Fallback: use TextBlob sentiment polarity
    blob = TextBlob(message)
    polarity = blob.sentiment.polarity

    if polarity > 0.3:
        return "joy"
    elif polarity < -0.3:
        return "sadness"
    else:
        return "neutral"


def detect_emotion_deep(message: str) -> str:
    """Enhanced emotion detection with pattern matching."""
    text = message.lower()

    # Pattern-based overrides (high confidence phrases)
    patterns = {
        "sadness": [
            r"can'?t stop (crying|sobbing)",
            r"feel(ing)? (so )?(broken|empty|lost|hopeless|worthless)",
            r"(nobody|no one) (cares?|loves? me|understands?)",
            r"(want to|wanna) (disappear|give up|quit)",
            r"life (is|feels) (pointless|meaningless|unfair)",
        ],
        "anger": [
            r"(so|really|extremely) (angry|mad|frustrated|pissed)",
            r"(hate|despise) (this|him|her|them|it|everything)",
            r"(fed up|sick of|done with)",
            r"(can't|cannot) (take|handle|stand) (it|this|them) anymore",
        ],
        "fear": [
            r"(so|really|extremely) (scared|anxious|worried|nervous|afraid)",
            r"(panic|anxiety) attack",
            r"(can't|cannot) (breathe|calm down|stop worrying)",
            r"what if (everything|something|it all) goes wrong",
        ],
        "lonely": [
            r"(feel(ing)? )?(so |completely )?(alone|lonely|isolated)",
            r"(no one|nobody) (to talk to|understands? me|is there for me)",
            r"(left out|forgotten|invisible|ignored)",
        ],
        "tired": [
            r"(so|extremely|totally) (tired|exhausted|drained|burned out)",
            r"(can'?t|cannot) (go on|keep going|do this anymore)",
            r"(lost|no) (motivation|energy|will to)",
            r"(want to|wanna) (give up|quit|stop trying)",
        ],
        "joy": [
            r"(so|really|extremely|absolutely) (happy|excited|thrilled|ecstatic)",
            r"(best|greatest|most amazing) (day|news|thing|moment)",
            r"(can'?t|cannot) (believe|stop smiling|contain)",
        ],
    }

    for emotion, pattern_list in patterns.items():
        for pattern in pattern_list:
            if re.search(pattern, text):
                return emotion

    # Fall back to keyword-based detection
    return detect_emotion(message)


MOOD_EMOJIS = {
    "joy": "😄",
    "sadness": "💙",
    "anger": "🔥",
    "fear": "💚",
    "lonely": "💜",
    "tired": "🌙",
    "neutral": "😊",
}

MOOD_LABELS = {
    "joy": "Joyful",
    "sadness": "Feeling Low",
    "anger": "Frustrated",
    "fear": "Anxious",
    "lonely": "Lonely",
    "tired": "Exhausted",
    "neutral": "Calm",
}


# ─────────────────────────────────────────────
# RESPONSE GENERATOR
# ─────────────────────────────────────────────
def generate_reply(name: str, message: str, emotion: str) -> str:
    """
    Generate a warm, personalized response.
    Priority order:
      1. Crisis (always empathetic + helpline)
      2. Topic detected → sentiment check → positive OR negative topic reply
      3. Emotion-based fallback
    """
    name = name.strip().capitalize()

    # ── STEP 1: Detect topic ──
    topic = detect_topic(message)

    if topic == "crisis":
        reply = random.choice(TOPIC_RESPONSES["crisis"]).format(name=name)
        return reply

    if topic:
        # ── STEP 2: Sentiment context analysis ──
        sentiment = analyze_sentiment_context(message)

        if sentiment == "positive" and topic in TOPIC_POSITIVE_RESPONSES:
            # Celebratory / joyful topic reply
            reply = random.choice(TOPIC_POSITIVE_RESPONSES[topic]).format(name=name)
            if topic in TOPIC_POSITIVE_FOLLOW_UPS:
                reply += f"\n\n{TOPIC_POSITIVE_FOLLOW_UPS[topic]}"
            return reply

        if sentiment in ("negative", "neutral") and topic in TOPIC_RESPONSES:
            # Concerned / empathetic topic reply
            reply = random.choice(TOPIC_RESPONSES[topic]).format(name=name)
            if topic in TOPIC_FOLLOW_UPS:
                reply += f"\n\n{TOPIC_FOLLOW_UPS[topic]}"
            return reply

    # ── STEP 3: Emotion-based reply (no specific topic) ──
    response_pool = RESPONSES.get(emotion, RESPONSES["neutral"])
    reply = random.choice(response_pool).format(name=name)

    # Add a motivational story ~60% of the time for heavy emotions
    heavy_emotions = ["sadness", "anger", "fear", "lonely", "tired"]
    if emotion in heavy_emotions and random.random() < 0.65:
        story = random.choice(STORIES.get(emotion, []))
        reply += f"\n\n{story}"

    # Add a follow-up question ~70% of the time
    if random.random() < 0.70:
        follow_up = random.choice(FOLLOW_UPS)
        reply += f"\n\n{follow_up}"

    return reply


# ─────────────────────────────────────────────
# GREETING GENERATOR
# ─────────────────────────────────────────────
GREETINGS = [
    "Hey {name}! 💜 I'm Sakha-Sakhi, your companion! I'm so happy you're here. How are you feeling today?",
    "Welcome, {name}! 🌟 I'm Sakha-Sakhi — think of me as your best friend who's always here. What's going on in your world today?",
    "Hi {name}! 😄 Yay, you made it! I'm Sakha-Sakhi, and honestly? Talking to you is my favorite thing. How's your heart today?",
    "Hey there, {name}! 🤗 I'm Sakha-Sakhi — your companion, your cheerleader, your friend. I can't wait to chat with you. How are you really doing?",
]


# ─────────────────────────────────────────────
# ROUTES
# ─────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/greet", methods=["POST"])
def greet():
    """Generate a personalized greeting after name entry."""
    data = request.get_json()
    name = data.get("name", "Friend").strip().capitalize()
    greeting = random.choice(GREETINGS).format(name=name)
    return jsonify({
        "greeting": greeting,
        "name": name
    })


@app.route("/chat", methods=["POST"])
def chat():
    """Main chat endpoint — receives message, detects emotion, returns reply."""
    data = request.get_json()
    name = data.get("name", "Friend")
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"reply": "I'm right here! Say anything — I'm listening. 💜", "emotion": "neutral", "mood_emoji": "😊", "mood_label": "Calm"})

    # Detect emotion
    emotion = detect_emotion_deep(message)

    # Generate reply
    reply = generate_reply(name, message, emotion)

    return jsonify({
        "reply": reply,
        "emotion": emotion,
        "mood_emoji": MOOD_EMOJIS.get(emotion, "😊"),
        "mood_label": MOOD_LABELS.get(emotion, "Calm"),
    })


if __name__ == "__main__":
    print("Sakha-Sakhi - My Companion is starting up...")
    print("Open your browser at: http://localhost:5000")
    app.run(debug=True, port=5000)
