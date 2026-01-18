import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { wordDatabase, WordContent } from '@/data/wordContent';
import { SessionProgressBar } from '@/components/SessionProgressBar';
import wordAnchorExamples from '@/lib/wordAnchorExamples';

interface SessionFlowProps {
  selectedWordNames: string[];
  onComplete?: (results: any) => void;
}

// Comprehensive category emoji and example mapping - automatically provides emoji for any anchor category
const categoryMetadata: Record<string, { emoji: string; example: string }> = {
  'Absorption': { emoji: '🧲', example: 'When a book or idea completely captivates you' },
  'Acceptance': { emoji: '🤲', example: 'When you finally stop fighting reality and let go' },
  'Access': { emoji: '🔑', example: 'When doors open that were previously closed to you' },
  'Accountability': { emoji: '⚖️', example: 'When you own your mistake instead of making excuses' },
  'Achievement': { emoji: '🌟', example: 'When you finally accomplish something you worked hard for' },
  'Action': { emoji: '⚡', example: 'When you stop planning and actually do the thing' },
  'Adaptation': { emoji: '🔄', example: 'When life changes and you have to adjust your approach' },
  'Advice': { emoji: '💭', example: 'When someone older shares what they learned the hard way' },
  'Advocacy': { emoji: '📢', example: 'When you speak up for someone who can\'t speak for themselves' },
  'Agency': { emoji: '🎯', example: 'When you realize you can choose your response to any situation' },
  'Ambiguity': { emoji: '🌫️', example: 'When someone\'s words could mean two completely different things' },
  'Analysis': { emoji: '🔍', example: 'When you break down a complex problem into smaller parts' },
  'Anxiety': { emoji: '😰', example: 'When your mind races with worst-case scenarios before an event' },
  'Art': { emoji: '🎨', example: 'When you see a painting or performance that moves you deeply' },
  'Atmosphere': { emoji: '🌌', example: 'When you walk into a room and immediately feel the tension or joy' },
  'Attachment': { emoji: '💗', example: 'When you can\'t imagine life without someone or something' },
  'Attention': { emoji: '👀', example: 'When you notice something everyone else missed' },
  'Attitude': { emoji: '💪', example: 'When your outlook determines whether you see opportunity or obstacle' },
  'Authenticity': { emoji: '✨', example: 'When you stop pretending and show who you really are' },
  'Authority': { emoji: '👑', example: 'When someone has the power to make final decisions' },
  'Autonomy': { emoji: '🕊️', example: 'When you make your own choices without needing permission' },
  'Avoidance': { emoji: '🚫', example: 'When you dodge a difficult conversation you know you need to have' },
  'Awareness': { emoji: '💡', example: 'When you suddenly realize a pattern in your own behavior' },
  'Balance': { emoji: '⚗️', example: 'When you juggle work and life without letting either fall' },
  'Beauty': { emoji: '🌹', example: 'When something strikes you as profoundly beautiful' },
  'Beginning': { emoji: '🌅', example: 'When you start fresh after an ending' },
  'Belief': { emoji: '🙏', example: 'When you hold onto something even without proof' },
  'Beliefs': { emoji: '⭐', example: 'When your deepest values guide a tough decision' },
  'Belonging': { emoji: '🏘️', example: 'When you finally find your people and feel at home' },
  'Bias': { emoji: '⚠️', example: 'When you catch yourself judging unfairly based on assumptions' },
  'Bonds': { emoji: '🔗', example: 'When shared experience creates unbreakable connection' },
  'Book Quote': { emoji: '📕', example: 'When a line from a book perfectly captures your feeling' },
  'Boundaries': { emoji: '🚧', example: 'When you say "no" to protect your time or energy' },
  'Business': { emoji: '💼', example: 'When profit, strategy, or commerce drive decisions' },
  'Care': { emoji: '❤️', example: 'When you tend to someone\'s needs with genuine concern' },
  'Career': { emoji: '🎯', example: 'When you think about your professional future and path' },
  'Career Interest': { emoji: '🚀', example: 'When a field or role genuinely excites you' },
  'Cause': { emoji: '✊', example: 'When you fight for something bigger than yourself' },
  'Challenge': { emoji: '🧗', example: 'When something pushes you beyond your comfort zone' },
  'Challenges': { emoji: '⛰️', example: 'When multiple obstacles test your resolve' },
  'Chance': { emoji: '🎲', example: 'When an unexpected opportunity appears out of nowhere' },
  'Change': { emoji: '🌊', example: 'When life shifts and you have to adapt or resist' },
  'Character': { emoji: '👤', example: 'When pressure reveals what you\'re truly made of' },
  'Childhood': { emoji: '🎈', example: 'When you remember how you felt as a kid' },
  'Childhood Memory': { emoji: '🎪', example: 'When a smell or song brings back vivid childhood moments' },
  'Childhood Place': { emoji: '🏠', example: 'When you visit where you grew up and feel the memories flood back' },
  'Choice': { emoji: '🤔', example: 'When you stand at a crossroads and have to pick a path' },
  'Clarity': { emoji: '🔆', example: 'When confusion lifts and everything suddenly makes sense' },
  'Client Communication': { emoji: '📧', example: 'When you craft an email that balances professionalism with warmth' },
  'Client Email': { emoji: '💌', example: 'When you need to deliver bad news diplomatically' },
  'Codes': { emoji: '🔐', example: 'When unspoken rules govern how things really work' },
  'Collaboration': { emoji: '🤝', example: 'When working together achieves more than working alone' },
  'Commitment': { emoji: '💎', example: 'When you promise to see something through no matter what' },
  'Communication': { emoji: '💬', example: 'When you struggle to find the right words to express yourself' },
  'Community': { emoji: '👥', example: 'When your neighbors rally together to solve a problem' },
  'Competition': { emoji: '🏁', example: 'When someone\'s success makes you push yourself harder' },
  'Complexity': { emoji: '🧩', example: 'When a situation has so many moving parts you can\'t see them all' },
  'Compliments': { emoji: '😊', example: 'When genuine praise makes you uncomfortable or proud' },
  'Compromise': { emoji: '🤝', example: 'When both sides give up something to move forward' },
  'Confidence': { emoji: '💪', example: 'When you trust your abilities even facing the unknown' },
  'Conflict': { emoji: '⚔️', example: 'When two people want incompatible things and tension builds' },
  'Connection': { emoji: '🔗', example: 'When you feel truly understood by another person' },
  'Connections': { emoji: '🌐', example: 'When who you know opens doors you couldn\'t open alone' },
  'Consequences': { emoji: '🎯', example: 'When your actions ripple out and affect others' },
  'Constraint': { emoji: '⛓️', example: 'When limited resources force creative solutions' },
  'Constraints': { emoji: '🚫', example: 'When you have to work within strict boundaries' },
  'Control': { emoji: '🎮', example: 'When you realize you can influence but not dictate outcomes' },
  'Conversation': { emoji: '🗨️', example: 'When dialogue reveals what someone is really thinking' },
  'Coordination': { emoji: '🔄', example: 'When timing multiple moving pieces perfectly' },
  'Coping': { emoji: '🛡️', example: 'When you use strategies to handle overwhelming stress' },
  'Courage': { emoji: '🦁', example: 'When you do the right thing despite being afraid' },
  'Courtship': { emoji: '💕', example: 'When you slowly win someone\'s heart over time' },
  'Creative Collaboration': { emoji: '🎨🤝', example: 'When artists combine their talents to make something neither could alone' },
  'Creative Pursuit': { emoji: '🎭', example: 'When you chase an artistic dream despite obstacles' },
  'Creative Work': { emoji: '✨', example: 'When you make something original that didn\'t exist before' },
  'Creativity': { emoji: '💡', example: 'When an unexpected solution pops into your mind' },
  'Crisis': { emoji: '🌪️', example: 'When everything goes wrong at once and you must act fast' },
  'Crisis Management': { emoji: '🚨', example: 'When you keep calm and make decisions under extreme pressure' },
  'Critical Thinking': { emoji: '🧠', example: 'When you question assumptions instead of accepting them' },
  'Criticism': { emoji: '📝', example: 'When someone points out flaws you didn\'t want to see' },
  'Cultural Differences': { emoji: '🌍', example: 'When customs or values clash across cultures' },
  'Culture': { emoji: '🎭', example: 'When shared beliefs and practices define how a group behaves' },
  'Current Events': { emoji: '📰', example: 'When breaking news shifts the conversation everywhere' },
  'Customer Service': { emoji: '🤝', example: 'When you help someone solve their problem patiently' },
  'Data': { emoji: '📊', example: 'When numbers tell a story words cannot' },
  'Debate': { emoji: '🗣️', example: 'When you defend your position against strong counterarguments' },
  'Deception': { emoji: '🎭', example: 'When you realize someone intentionally misled you' },
  'Decision Making': { emoji: '⚖️', example: 'When you weigh options knowing the stakes are high' },
  'Decision-Making': { emoji: '🤔', example: 'When critical choices require wisdom and courage' },
  'Decisions': { emoji: '✅', example: 'When you commit to a path despite uncertainty' },
  'Degradation': { emoji: '📉', example: 'When quality or conditions steadily worsen over time' },
  'Design': { emoji: '🎨', example: 'When form and function come together intentionally' },
  'Development': { emoji: '📈', example: 'When gradual progress compounds into significant growth' },
  'Devotion': { emoji: '🙏', example: 'When you dedicate yourself completely to someone or something' },
  'Difficult Conversations': { emoji: '😬', example: 'When you must say something hard but necessary' },
  'Directness': { emoji: '→', example: 'When you skip the sugar-coating and speak plainly' },
  'Disagreement': { emoji: '❌', example: 'When you respectfully hold opposing views' },
  'Discovery': { emoji: '🔍', example: 'When you stumble upon something that changes your understanding' },
  'Divine': { emoji: '✨', example: 'When you feel connected to something transcendent' },
  'Division': { emoji: '📍', example: 'When a group splits into opposing factions' },
  'Dreams': { emoji: '💭', example: 'When your subconscious reveals what you truly want or fear' },
  'Economics': { emoji: '💰', example: 'When supply, demand, and incentives drive behavior' },
  'Education': { emoji: '🎓', example: 'When formal learning opens new ways of thinking' },
  'Efficiency': { emoji: '⚡', example: 'When you accomplish more with less effort or time' },
  'Embarrassment': { emoji: '😳', example: 'When you\'re exposed and want to disappear' },
  'Emotion': { emoji: '😊', example: 'When feelings overwhelm rational thought' },
  'Emotional Literacy': { emoji: '💭', example: 'When you can name and understand complex feelings' },
  'Emotional Support': { emoji: '🤗', example: 'When someone holds space for your feelings without trying to fix' },
  'Emotions': { emoji: '❤️', example: 'When what you feel conflicts with what you think' },
  'Empathy': { emoji: '👂', example: 'When you truly understand how someone else feels' },
  'Encouragement': { emoji: '🌟', example: 'When someone\'s belief in you helps you believe in yourself' },
  'Energy': { emoji: '⚡', example: 'When vitality or exhaustion determines what\'s possible' },
  'Environment': { emoji: '🌍', example: 'When your surroundings profoundly affect your state' },
  'Equivalence': { emoji: '=', example: 'When two different things turn out to be essentially the same' },
  'Ethics': { emoji: '⚖️', example: 'When you must choose between conflicting moral principles' },
  'Evasion': { emoji: '🏃', example: 'When you dodge accountability or difficult truths' },
  'Evidence': { emoji: '📋', example: 'When facts either support or undermine a claim' },
  'Excess': { emoji: '🌊', example: 'When too much of something becomes harmful' },
  'Exclusion': { emoji: '🚫', example: 'When someone is deliberately left out of a group' },
  'Expectations': { emoji: '🎯', example: 'When what you anticipate shapes what you experience' },
  'Exploration': { emoji: '🧭', example: 'When curiosity leads you into uncharted territory' },
  'Extremes': { emoji: '⛰️', example: 'When you push to the absolute limits' },
  'Failure': { emoji: '❌', example: 'When things don\'t work and you must decide what that means' },
  'Fairness': { emoji: '⚖️', example: 'When you ensure everyone gets what they deserve' },
  'False Friends': { emoji: '🤐', example: 'When words that look similar mean completely different things' },
  'Family': { emoji: '👨‍👩‍👧‍👦', example: 'When blood or chosen bonds create your closest ties' },
  'Family History': { emoji: '🌳', example: 'When your ancestors\' stories shape your identity' },
  'Family Moment': { emoji: '🏠', example: 'When shared experiences bind you to loved ones' },
  'Fatigue': { emoji: '😴', example: 'When exhaustion makes everything harder' },
  'Feedback': { emoji: '📝', example: 'When input from others helps you improve or stings your pride' },
  'Film': { emoji: '🎬', example: 'When cinema captures something words cannot' },
  'First Impressions': { emoji: '👀', example: 'When those first few seconds shape everything that follows' },
  'First Meeting': { emoji: '🤝', example: 'When you connect with someone new for the first time' },
  'Follow-through': { emoji: '✅', example: 'When you keep promises even when enthusiasm fades' },
  'Formality': { emoji: '🎩', example: 'When proper manners and protocol matter' },
  'Freedom': { emoji: '🕊️', example: 'When you make choices unconstrained by others' },
  'Friend': { emoji: '👫', example: 'When connection runs deeper than circumstances' },
  'Friendliness': { emoji: '😊', example: 'When warmth creates easy connection' },
  'Friendship': { emoji: '💕', example: 'When trust and affection grow over time' },
  'Future': { emoji: '🚀', example: 'When you imagine what\'s ahead with hope or dread' },
  'Gestures': { emoji: '👋', example: 'When small acts communicate what words cannot' },
  'Goal': { emoji: '🎯', example: 'When a clear target focuses your efforts' },
  'Gratitude': { emoji: '🙏', example: 'When appreciation deepens your experience' },
  'Growth': { emoji: '📈', example: 'When you become more capable than you were before' },
  'Habits': { emoji: '🔄', example: 'When repeated actions become automatic' },
  'Healing': { emoji: '🩹', example: 'When time and care mend what was broken' },
  'Health': { emoji: '💪', example: 'When your body\'s condition enables or limits you' },
  'Historical Era': { emoji: '📜', example: 'When a specific time period shapes events and values' },
  'History': { emoji: '🏛️', example: 'When the past explains the present' },
  'Hobby': { emoji: '🎮', example: 'When you pursue something purely for joy' },
  'Home': { emoji: '🏡', example: 'When a place represents safety and belonging' },
  'Honesty': { emoji: '✅', example: 'When telling truth risks consequences' },
  'Honor': { emoji: '🏆', example: 'When you uphold principles even when it costs you' },
  'Hope': { emoji: '🌈', example: 'When you believe better is possible despite evidence' },
  'Human Impact': { emoji: '🌍', example: 'When actions affect people in profound ways' },
  'Humility': { emoji: '🙏', example: 'When you recognize your limitations honestly' },
  'Humor': { emoji: '😄', example: 'When laughter provides perspective or relief' },
  'Identity': { emoji: '👤', example: 'When you define who you are' },
  'Imbalance': { emoji: '⚗️', example: 'When things tip unfairly or unsustainably' },
  'Impact': { emoji: '💥', example: 'When actions create lasting change' },
  'Impartiality': { emoji: '🪞', example: 'When you judge fairly without bias' },
  'Impermanence': { emoji: '🌬️', example: 'When you realize nothing stays the same' },
  'Importance': { emoji: '❗', example: 'When something deserves priority and attention' },
  'Improvement': { emoji: '📈', example: 'When effort makes things measurably better' },
  'Incentives': { emoji: '🎁', example: 'When rewards shape behavior powerfully' },
  'Inequality': { emoji: '⚠️', example: 'When unfair systems advantage some over others' },
  'Inference': { emoji: '🧠', example: 'When you draw conclusions from incomplete information' },
  'Influence': { emoji: '🌊', example: 'When your words or actions shape others\' choices' },
  'Innocence': { emoji: '😇', example: 'When you haven\'t yet been corrupted by cynicism' },
  'Insight': { emoji: '💡', example: 'When sudden understanding illuminates what was dark' },
  'Inspiration': { emoji: '✨', example: 'When something ignites your imagination' },
  'Integrity': { emoji: '💎', example: 'When your actions match your stated values' },
  'International Work': { emoji: '🌏', example: 'When cultural context complicates collaboration' },
  'Interpretation': { emoji: '📖', example: 'When meaning depends on perspective' },
  'Intuition': { emoji: '🔮', example: 'When your gut knows before your brain can explain' },
  'Jargon': { emoji: '🗣️', example: 'When specialized language excludes or includes' },
  'Job Search': { emoji: '🔍', example: 'When you hunt for meaningful work' },
  'Journey': { emoji: '🛤️', example: 'When the path matters as much as the destination' },
  'Judgment': { emoji: '⚖️', example: 'When you evaluate worth or quality' },
  'Justice': { emoji: '👨‍⚖️', example: 'When fairness is served through systems or actions' },
  'Language': { emoji: '🗣️', example: 'When words unlock or obscure understanding' },
  'Language Learning': { emoji: '🌍', example: 'When you acquire new ways of thinking through tongues' },
  'Leadership': { emoji: '👑', example: 'When you guide others toward a shared vision' },
  'Learning': { emoji: '📚', example: 'When knowledge fundamentally changes you' },
  'Life Direction': { emoji: '🧭', example: 'When big choices determine your path' },
  'Life Experience': { emoji: '📖', example: 'When living teaches what studying cannot' },
  'Life Lesson': { emoji: '💡', example: 'When hard-won wisdom emerges from struggle' },
  'Light': { emoji: '💡', example: 'When illumination reveals what was hidden' },
  'Limitations': { emoji: '🚫', example: 'When boundaries define what\'s possible' },
  'Limits': { emoji: '🛑', example: 'When you reach the edge of capacity' },
  'Listening': { emoji: '👂', example: 'When you truly hear beyond the words' },
  'Literature': { emoji: '📖', example: 'When stories reveal universal human truths' },
  'Logic': { emoji: '🧮', example: 'When reason guides you through complexity' },
  'Loss': { emoji: '💔', example: 'When absence becomes presence' },
  'Lost Dream': { emoji: '😢', example: 'When you grieve what will never be' },
  'Love': { emoji: '❤️', example: 'When deep affection transcends rational explanation' },
  'Love Letters': { emoji: '💌', example: 'When written words carry the heart' },
  'Loyalty': { emoji: '🛡️', example: 'When commitment persists through difficulty' },
  'Major Setback': { emoji: '⚠️', example: 'When catastrophe tests your resilience' },
  'Manipulation': { emoji: '🎭', example: 'When someone controls through deception' },
  'Mastery': { emoji: '🏆', example: 'When skill becomes second nature through dedication' },
  'Meaning': { emoji: '🌌', example: 'When purpose makes struggle worthwhile' },
  'Media': { emoji: '📺', example: 'When information shapes collective understanding' },
  'Meetings': { emoji: '👥', example: 'When groups gather to decide or discuss' },
  'Memory': { emoji: '🧠', example: 'When a smell instantly transports you to a specific moment from your past' },
  'Mental Health': { emoji: '🧠', example: 'When you notice yourself stuck in thought loops about the same worry' },
  'Mentorship': { emoji: '🧑‍🏫', example: 'When someone more experienced shows you the ropes and believes in you' },
  'Mindfulness': { emoji: '🧘', example: 'When you pause to notice your breath and bring yourself back to the present' },
  'Mindset': { emoji: '💭', example: 'When your beliefs about what\'s possible limit or expand what you try' },
  'Miscommunication': { emoji: '😕', example: 'When you realize you both meant completely different things' },
  'Mistakes': { emoji: '❌', example: 'When an error teaches you more than getting it right would have' },
  'Misunderstandings': { emoji: '🤔', example: 'When assumptions lead two people to different conclusions' },
  'Money': { emoji: '💰', example: 'When financial constraints force you to make difficult choices' },
  'Mood': { emoji: '😊', example: 'When your emotional state colors everything you experience that day' },
  'Morality': { emoji: '⚖️', example: 'When you wrestle with what\'s right versus what\'s easy' },
  'Motivation': { emoji: '🔥', example: 'When you find the inner drive to push through resistance' },
  'Music': { emoji: '🎵', example: 'When a song captures exactly what you\'re feeling' },
  'Mystery': { emoji: '🔍', example: 'When you\'re drawn to something you can\'t fully explain' },
  'Mythology': { emoji: '🐉', example: 'When ancient stories reveal timeless human truths' },
  'Natural Setting': { emoji: '🌲', example: 'When you step outside and feel instantly different' },
  'Nature': { emoji: '🌿', example: 'When wild forces remind you you\'re not in control' },
  'Neglect': { emoji: '😢', example: 'When ignoring something small grows into crisis' },
  'Networking': { emoji: '🌐', example: 'When you build connections that might matter later' },
  'Norms': { emoji: '📋', example: 'When unwritten rules dictate acceptable behavior' },
  'Nostalgia': { emoji: '🌅', example: 'When an old song floods you with bittersweet memories' },
  'Nuance': { emoji: '🎨', example: 'When subtle differences change everything' },
  'Objectivity': { emoji: '📊', example: 'When you set aside feelings to see facts clearly' },
  'Observation': { emoji: '👀', example: 'When you notice what everyone else misses' },
  'Obstacles': { emoji: '⛰️', example: 'When barriers force you to find another way' },
  'Old Customs': { emoji: '🏛️', example: 'When ancient traditions clash with modern values' },
  'Old Home': { emoji: '🏚️', example: 'When you return to a place that shaped you' },
  'Organization': { emoji: '📋', example: 'When structure makes chaos manageable' },
  'Outsider': { emoji: '🚪', example: 'When you watch from beyond the circle' },
  'Park': { emoji: '🌳', example: 'When public green space offers respite from concrete' },
  'Partnership': { emoji: '👥', example: 'When shared goals bind two people or groups' },
  'Past Relationship': { emoji: '💔', example: 'When an old love still echoes in your present' },
  'Path': { emoji: '🛤️', example: 'When the route forward isn\'t clear but you walk anyway' },
  'Patience': { emoji: '⏳', example: 'When you resist the urge to force what needs time' },
  'Patterns': { emoji: '🔄', example: 'When you recognize cycles repeating again' },
  'Peace': { emoji: '☮️', example: 'When inner quiet finally arrives after turmoil' },
  'Performance': { emoji: '🎭', example: 'When you present your best self despite nerves' },
  'Performance Review': { emoji: '📝', example: 'When feedback reveals how others see your work' },
  'Personal Experience': { emoji: '📖', example: 'When living through something teaches more than reading about it' },
  'Personal Goals': { emoji: '🎯', example: 'When your aspirations pull you forward' },
  'Personal Growth': { emoji: '🌱', example: 'When you look back and barely recognize who you were' },
  'Personal Story': { emoji: '📕', example: 'When sharing your truth connects you to others' },
  'Personality': { emoji: '👤', example: 'When your unique traits shape how you move through the world' },
  'Perspective': { emoji: '🔭', example: 'When shifting your viewpoint changes everything you see' },
  'Philosophy': { emoji: '🧘', example: 'When deep questions about existence demand answers' },
  'Planning': { emoji: '📅', example: 'When you map the future to avoid chaos' },
  'Polarization': { emoji: '⚡', example: 'When people split into opposing camps with no middle ground' },
  'Policy': { emoji: '📜', example: 'When official rules structure what\'s possible' },
  'Possibility': { emoji: '🚀', example: 'When a door opens you didn\'t know existed' },
  'Potential': { emoji: '💎', example: 'When you sense capability waiting to emerge' },
  'Power': { emoji: '⚡', example: 'When influence shifts who gets to decide' },
  'Practice': { emoji: '🎯', example: 'When repetition turns struggle into flow' },
  'Pragmatism': { emoji: '🛠️', example: 'When what works matters more than what\'s ideal' },
  'Precision': { emoji: '🎯', example: 'When exact details make all the difference' },
  'Prediction': { emoji: '🔮', example: 'When you forecast what\'s coming based on patterns' },
  'Presence': { emoji: '🧘', example: 'When you\'re fully here instead of lost in thought' },
  'Presentations': { emoji: '🎤', example: 'When you communicate your ideas to a watching crowd' },
  'Prevention': { emoji: '🛡️', example: 'When stopping trouble before it starts saves everything' },
  'Principles': { emoji: '⭐', example: 'When core values guide you through gray areas' },
  'Priorities': { emoji: '📍', example: 'When you must decide what matters most right now' },
  'Privilege': { emoji: '👑', example: 'When unearned advantages reveal themselves' },
  'Problem Solving': { emoji: '🧩', example: 'When you work through challenges systematically' },
  'Problem-Solving': { emoji: '🔨', example: 'When obstacles demand creative solutions' },
  'Professional': { emoji: '💼', example: 'When workplace standards shape your behavior' },
  'Professional Communication': { emoji: '📧', example: 'When you balance clarity with diplomacy in formal settings' },
  'Professional Distance': { emoji: '📏', example: 'When you maintain appropriate boundaries at work' },
  'Professional Email': { emoji: '💌', example: 'When you craft formal communication with care' },
  'Professional Knowledge': { emoji: '📚', example: 'When specialized expertise sets you apart' },
  'Professional Skill': { emoji: '🛠️', example: 'When workplace competence opens opportunities' },
  'Professional Tone': { emoji: '🎩', example: 'When formality shapes how your message lands' },
  'Progress': { emoji: '📊', example: 'When incremental advances compound over time' },
  'Project': { emoji: '🎯', example: 'When focused effort brings an idea to life' },
  'Project Management': { emoji: '📋', example: 'When you coordinate resources and people toward completion' },
  'Projects': { emoji: '✅', example: 'When ambitious initiatives test your resolve' },
  'Prophecy': { emoji: '🔮', example: 'When ancient predictions echo in current events' },
  'Protection': { emoji: '🛡️', example: 'When you shield someone vulnerable from harm' },
  'Psychological': { emoji: '🧠', example: 'When mental patterns explain mysterious behavior' },
  'Public Speaking': { emoji: '🎤', example: 'When you address a crowd and must command attention' },
  'Purpose': { emoji: '🎯', example: 'When you discover what makes struggle worthwhile' },
  'Reaction': { emoji: '💥', example: 'When your instant response reveals who you really are' },
  'Reading': { emoji: '📚', example: 'When words on a page transport you elsewhere' },
  'Reasoning': { emoji: '🧠', example: 'When logic helps you think through complexity' },
  'Recognition': { emoji: '🏆', example: 'When others finally acknowledge your contribution' },
  'Recovery': { emoji: '💚', example: 'When you bounce back from what nearly broke you' },
  'Reflection': { emoji: '🪞', example: 'When you examine yourself honestly in quiet moments' },
  'Regulation': { emoji: '⚖️', example: 'When you control impulses that want to take over' },
  'Relationship': { emoji: '💕', example: 'When connection with another person shapes your world' },
  'Relationships': { emoji: '👥', example: 'When the web of human bonds defines your life' },
  'Reliability': { emoji: '✅', example: 'When people know they can count on you' },
  'Religion': { emoji: '🙏', example: 'When faith provides answers reason cannot' },
  'Repetition': { emoji: '🔄', example: 'When doing something again and again changes you' },
  'Reports': { emoji: '📊', example: 'When formal documentation captures what happened' },
  'Resilience': { emoji: '💪', example: 'When you keep going despite devastating setbacks' },
  'Resources': { emoji: '🎁', example: 'When the tools and support you need become available' },
  'Respect': { emoji: '🙏', example: 'When you honor someone\'s worth without agreement' },
  'Responsibility': { emoji: '⚖️', example: 'When you own the consequences of your choices' },
  'Restoration': { emoji: '🔧', example: 'When careful work returns something to former glory' },
  'Revelation': { emoji: '✨', example: 'When hidden truth suddenly becomes visible' },
  'Risk': { emoji: '⚠️', example: 'When you must decide if potential loss is worth possible gain' },
  'Road Trip': { emoji: '🚗', example: 'When the journey itself transforms you' },
  'Romance': { emoji: '💕', example: 'When attraction and connection intertwine' },
  'Routine': { emoji: '🔄', example: 'When familiar rhythms provide comfort and structure' },
  'Safety': { emoji: '🛡️', example: 'When you finally feel secure enough to lower your guard' },
  'Sanctuary': { emoji: '🎰', example: 'When you find a space where the world can\'t reach you' },
  'School Memory': { emoji: '🎓', example: 'When classroom moments still shape how you think' },
  'Science': { emoji: '🔬', example: 'When systematic discovery reveals how nature works' },
  'Self-Assessment': { emoji: '🪞', example: 'When you honestly evaluate your own performance' },
  'Self-Awareness': { emoji: '💭', example: 'When you recognize patterns in your own behavior' },
  'Self-Care': { emoji: '🛀', example: 'When you prioritize your own wellbeing without guilt' },
  'Self-Discovery': { emoji: '🔍', example: 'When you uncover truths about who you actually are' },
  'Self-Examination': { emoji: '🔬', example: 'When you probe your own motives and biases' },
  'Self-Insight': { emoji: '💡', example: 'When sudden understanding illuminates your own nature' },
  'Self-Monitoring': { emoji: '📊', example: 'When you track your thoughts and behaviors deliberately' },
  'Self-Respect': { emoji: '👑', example: 'When you honor your own worth and boundaries' },
  'Self-Teaching': { emoji: '📖', example: 'When you master something without formal instruction' },
  'Signals': { emoji: '📡', example: 'When subtle cues communicate what words don\'t say' },
  'Sincerity': { emoji: '💝', example: 'When genuine authenticity shines through performance' },
  'Skepticism': { emoji: '🤨', example: 'When you question claims others accept without proof' },
  'Skill Development': { emoji: '🎯', example: 'When practice transforms inability into mastery' },
  'Social Dynamics': { emoji: '🌐', example: 'When group interactions reveal power and belonging' },
  'Social Events': { emoji: '🎉', example: 'When gatherings create connection or awkwardness' },
  'Social Issues': { emoji: '🌍', example: 'When society grapples with inequality and justice' },
  'Social Justice': { emoji: '✊', example: 'When you fight systems that harm marginalized people' },
  'Society': { emoji: '👥', example: 'When collective norms shape individual behavior' },
  'Spin': { emoji: '🎭', example: 'When narratives are twisted to favor one perspective' },
  'Spirituality': { emoji: '✨', example: 'When you connect to something beyond material reality' },
  'Sports': { emoji: '⚽', example: 'When competition reveals character under pressure' },
  'Stability': { emoji: '🏔️', example: 'When consistent ground beneath your feet feels precious' },
  'Stakeholders': { emoji: '👥', example: 'When multiple people have competing interests in an outcome' },
  'Standards': { emoji: '📏', example: 'When benchmarks define acceptable quality' },
  'Stranger': { emoji: '🚪', example: 'When an unknown person unexpectedly impacts your life' },
  'Strategy': { emoji: '♟️', example: 'When careful planning gives you advantage' },
  'Strength': { emoji: '💪', example: 'When power emerges from resilience or force' },
  'Stress': { emoji: '😰', example: 'When pressure builds until you can barely function' },
  'Supernatural': { emoji: '👻', example: 'When the mysterious defies rational explanation' },
  'Support': { emoji: '🤗', example: 'When someone holds you up when you can\'t stand alone' },
  'Surprise': { emoji: '😲', example: 'When the unexpected shatters your assumptions' },
  'Sustainability': { emoji: '🌱', example: 'When you maintain something long-term without depletion' },
  'Systems': { emoji: '⚙️', example: 'When interconnected parts create larger patterns' },
  'Tact': { emoji: '🎩', example: 'When you navigate sensitive topics without causing offense' },
  'Teacher': { emoji: '👨‍🏫', example: 'When someone guides your understanding with patience' },
  'Teaching': { emoji: '📚', example: 'When you help others discover what you already know' },
  'Team Communication': { emoji: '💬', example: 'When clear messaging keeps everyone aligned' },
  'Team Dynamics': { emoji: '🤝', example: 'When group energy determines collective success' },
  'Team Management': { emoji: '👥', example: 'When you coordinate people toward shared goals' },
  'Team Project': { emoji: '👥', example: 'When collaboration produces what individuals couldn\'t' },
  'Teams': { emoji: '🏃', example: 'When groups achieve more together than alone' },
  'Teamwork': { emoji: '🤝', example: 'When synergy makes one plus one equal three' },
  'Technical Skill': { emoji: '🔧', example: 'When specialized expertise solves complex problems' },
  'Testing': { emoji: '✅', example: 'When you verify something works as intended' },
  'Threshold': { emoji: '🚪', example: 'When you stand at the edge between before and after' },
  'Time': { emoji: '⏳', example: 'When moments slip away or stretch endlessly' },
  'Tone': { emoji: '🎵', example: 'When how you say something matters more than what you say' },
  'Traditions': { emoji: '🎭', example: 'When old customs carry meaning across generations' },
  'Transfer': { emoji: '🔄', example: 'When something moves from one context to another' },
  'Transformation': { emoji: '🦋', example: 'When fundamental change makes you unrecognizable from before' },
  'Travel': { emoji: '✈️', example: 'When exploring new places shifts your perspective' },
  'Travel Memory': { emoji: '📸', example: 'When a journey\'s moments remain vivid years later' },
  'Trust': { emoji: '🤝', example: 'When you rely on someone completely without guarantee' },
  'Truth': { emoji: '✅', example: 'When reality reveals itself despite comfortable lies' },
  'Uncertainty': { emoji: '❓', example: 'When unknowns loom larger than what you know' },
  'Understanding': { emoji: '🧠', example: 'When comprehension finally dawns after confusion' },
  'Unity': { emoji: '🤝', example: 'When separate people bond into one purpose' },
  'Urgency': { emoji: '🚨', example: 'When time pressure demands immediate action' },
  'Validation': { emoji: '✅', example: 'When external confirmation affirms your internal truth' },
  'Values': { emoji: '⭐', example: 'When core principles guide difficult choices' },
  'Variety': { emoji: '🎨', example: 'When diversity enriches what monotony dulls' },
  'Visibility': { emoji: '👀', example: 'When presence makes your existence register to others' },
  'Vulnerability': { emoji: '🫂', example: 'When you risk exposure by opening up honestly' },
  'Walk': { emoji: '🚶', example: 'When putting one foot ahead of the other clarifies thinking' },
  'Warning': { emoji: '⚠️', example: 'When caution signals danger ahead' },
  'Warning Ignored': { emoji: '🙈', example: 'When you dismiss red flags and regret it later' },
  'Wellbeing': { emoji: '💚', example: 'When you nurture physical and mental health deliberately' },
  'Wisdom': { emoji: '🧙', example: 'When deep understanding comes from lived experience' },
  'Work': { emoji: '💼', example: 'When your job defines much of your daily experience' },
  'Work Anxiety': { emoji: '😰', example: 'When career pressure keeps you awake at night' },
  'Work Email': { emoji: '📧', example: 'When professional communication requires careful wording' },
  'Work Habits': { emoji: '🔄', example: 'When routines determine your productivity patterns' },
  'Work Situation': { emoji: '🏢', example: 'When workplace dynamics affect your wellbeing' },
  'Workplace': { emoji: '🏢', example: 'When professional environment shapes daily reality' },
  'Workplace Relationships': { emoji: '👥', example: 'When colleague bonds make work better or worse' },
  'Writing': { emoji: '✍️', example: 'When you craft words to capture what you mean' },
  'Youth': { emoji: '🌟', example: 'When vitality and inexperience mix in equal measure' }
};

// Shuffle and reassign option IDs while preserving correct answer mapping
function shuffleOptions(options: Array<{ id: string; text: string }>, correctAnswer: string) {
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  const reassigned = shuffled.map((option, index) => ({
    ...option,
    id: String.fromCharCode(65 + index) // 'A', 'B', 'C', ...
  }));

  // Find the original item that was correct, then its new id
  const correctOriginalIndex = shuffled.findIndex(opt => opt.id === correctAnswer);
  const newCorrectId = correctOriginalIndex >= 0
    ? reassigned[correctOriginalIndex].id
    : 'A';

  return {
    options: reassigned,
    correctAnswer: newCorrectId
  };
}

export function SessionFlow({ selectedWordNames, onComplete }: SessionFlowProps) {
  // Get full word data
  const sessionWords = wordDatabase.filter(w => selectedWordNames.includes(w.word));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<1 | 2 | 3>(1); // Definition, Exercise, Anchor
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [anchorCategory, setAnchorCategory] = useState<string | null>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [showInfo, setShowInfo] = useState(false); // tooltip visibility
  const [showInfoIcon, setShowInfoIcon] = useState(false); // persist icon after first wrong
  const [showAnchorExample, setShowAnchorExample] = useState(false); // Show memory loop example

  const currentWord = sessionWords[currentIndex];
  const isLastWord = currentIndex === sessionWords.length - 1;

  // Shuffle exercise options once per word
  const shuffledExercise = useMemo(() => {
    if (!currentWord) return null;
    return shuffleOptions(currentWord.exercise.options, currentWord.exercise.correctAnswer);
  }, [currentWord]);

  // Auto-retry after wrong answer (Step 2)
  useEffect(() => {
    if (step === 2 && selectedAnswer !== null) {
      const targetCorrect = shuffledExercise?.correctAnswer ?? currentWord.exercise.correctAnswer;
      const isCorrect = selectedAnswer === targetCorrect;
      if (!isCorrect) {
        // Mark that a wrong answer occurred; show icon until user continues
        setShowInfoIcon(true);
        const timer = setTimeout(() => {
          setSelectedAnswer(null); // Reset to allow retry
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [step, selectedAnswer, currentWord, shuffledExercise]);

  // Step 1: Definition → Continue
  const handleDefinitionContinue = () => setStep(2);

  // Step 2: Exercise → Must be correct
  const handleExerciseAnswer = (answer: string, correctId?: string) => {
    setSelectedAnswer(answer);
    const targetCorrect = correctId ?? currentWord.exercise.correctAnswer;
    if (answer === targetCorrect) {
      setTimeout(() => {
        setSelectedAnswer(null);
        setStep(3);
      }, 1500);
    }
  };

  // Step 3: Anchor → Continue
  const handleAnchorComplete = () => {
    // Record this interaction
    const interaction = {
      word: currentWord.word,
      step1_completed: true,
      step2_correct: true,
      step3_category: anchorCategory
    };
    
    if (isLastWord) {
      // All words completed, show completion and call onComplete
      const completionData = {
        words: sessionWords.map(w => w.word),
        responses: [...responses, interaction]
      };
      
      if (onComplete) {
        onComplete(completionData);
      }
      return;
    }
    
    // Move to next word
    setResponses([...responses, interaction]);
    setCurrentIndex(prev => prev + 1);
    setStep(1);
    setSelectedAnswer(null);
    setAnchorCategory(null);
  };

  if (!currentWord) return null;

  // STEP 1: DEFINITION
  if (step === 1) {
    return (
      <div className="min-h-screen md:min-h-0 bg-stone-50 pt-4 pb-4 md:p-6 md:h-full md:flex md:flex-col md:overflow-hidden flex flex-col">
        {/* Content */}
        <div className="md:flex-1 md:flex md:items-center md:justify-center md:overflow-hidden md:py-0">
          <div className="w-full max-w-2xl">
            <SessionProgressBar 
              currentStep={1}
              currentWord={currentIndex + 1}
              totalWords={sessionWords.length}
            />
            
            <h1 className="text-2xl md:text-3xl font-medium mb-2 md:mb-2" style={{ color: getClusterColor(currentWord.cluster) }}>
              {currentWord.word}
            </h1>
            <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">{currentWord.cluster}</p>

            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-6 shadow-soft border border-stone-200 mb-4 md:mb-4">
              <p className="text-base md:text-lg leading-relaxed text-stone-700">{currentWord.definition}</p>
            </div>
          </div>
        </div>
        
        {/* Button */}
        <div className="w-full max-w-2xl mx-auto md:flex-shrink-0 bg-stone-50 mt-auto md:mt-0 mb-10 md:mb-0">
          <button
            onClick={handleDefinitionContinue}
            className="w-full py-3 md:py-3 bg-stone-800 text-white rounded-full font-medium hover:bg-stone-900 transition shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: EXERCISE
  if (step === 2) {
    const isCorrect = selectedAnswer === (shuffledExercise?.correctAnswer ?? currentWord.exercise.correctAnswer);
    const showFeedback = selectedAnswer !== null;
    const wrongExplanation = currentWord.exercise.explanation || 'This option does not match the definition or usage.';
    const handleShowInfo = () => {
      setShowInfo(true);
      setTimeout(() => setShowInfo(false), 2500);
    };

    const handleExerciseContinue = () => {
      setShowInfoIcon(false);
      setStep(3);
    };

    return (
      <div className="min-h-screen md:min-h-0 bg-stone-50 pt-4 pb-4 md:p-6 md:h-full md:flex md:flex-col md:overflow-hidden flex flex-col">
        {/* Content */}
        <div className="md:flex-1 md:flex md:items-center md:justify-center md:overflow-hidden md:py-0">
          <div className="w-full max-w-2xl">
            <SessionProgressBar 
              currentStep={2}
              currentWord={currentIndex + 1}
              totalWords={sessionWords.length}
            />
            
            <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-6" style={{ color: getClusterColor(currentWord.cluster) }}>
              {currentWord.word}
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-stone-700 mb-3 md:mb-4">{currentWord.exercise.question}</h2>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-4">
              {(shuffledExercise?.options ?? currentWord.exercise.options).map(option => {
                const isSelected = selectedAnswer === option.id;
                const isCorrectAnswer = option.id === (shuffledExercise?.correctAnswer ?? currentWord.exercise.correctAnswer);
                const showCorrect = showFeedback && isCorrectAnswer && isSelected;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => !showFeedback && handleExerciseAnswer(option.id, shuffledExercise?.correctAnswer)}
                    disabled={showFeedback}
                    className={`
                      w-full p-3 md:p-3 rounded-xl md:rounded-xl text-left text-sm md:text-base font-medium transition-all
                      ${!showFeedback ? 'bg-white border-2 border-stone-300 hover:border-stone-400' : ''}
                      ${showCorrect ? 'bg-emerald-700 text-white' : ''}
                      ${showWrong ? 'bg-red-600 text-white' : ''}
                    `}
                  >
                    {option.id}: {option.text}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`p-3 md:p-3 rounded-xl text-sm md:text-base mb-2 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                {isCorrect ? '✓ Correct! Moving to next step...' : '✗ Not quite. Try again...'}
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="w-full max-w-2xl mx-auto md:flex-shrink-0 bg-stone-50 mt-auto md:mt-0 mb-10 md:mb-0 relative">
          {showInfoIcon && (
            <>
              <button
                type="button"
                aria-label="Why is this choice wrong?"
                onClick={handleShowInfo}
                className="absolute -top-9 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-stone-800 text-white flex items:center justify-center shadow-md"
              >
                i
              </button>
              {showInfo && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-stone-800 text-sm rounded-xl shadow-lg border border-stone-200 px-3 py-2 max-w-[90%]">
                  {wrongExplanation}
                </div>
              )}
            </>
          )}
          <button
            onClick={() => showFeedback && isCorrect ? handleExerciseContinue() : null}
            disabled={!showFeedback || !isCorrect}
            className={`w-full py-3 md:py-3 rounded-full font-medium transition shadow-lg ${
              showFeedback && isCorrect
                ? 'bg-stone-800 text-white hover:bg-stone-900'
                : 'bg-stone-200 text-stone-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // STEP 3: ANCHOR
  if (step === 3) {
    const selectedCategoryData = anchorCategory ? categoryMetadata[anchorCategory] : null;

    return (
      <div className="min-h-screen md:min-h-0 bg-stone-50 pt-4 pb-4 md:p-6 md:h-full md:flex md:flex-col md:overflow-hidden flex flex-col">
        {/* Content */}
        <div className="md:flex-1 md:flex md:items-center md:justify-center md:overflow-hidden md:py-0">
          <div className="w-full max-w-2xl">
            <SessionProgressBar 
              currentStep={3}
              currentWord={currentIndex + 1}
              totalWords={sessionWords.length}
            />
            
            <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-6" style={{ color: getClusterColor(currentWord.cluster) }}>
              {currentWord.word}
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-stone-700 mb-3 md:mb-4">{currentWord.anchor?.prompt || 'Reflect on this word'}</h2>

            <div className="grid grid-cols-2 gap-3 md:gap-3 mb-4 md:mb-4">
              {(currentWord.anchor?.categories || []).map((cat, index) => {
                const metadata = categoryMetadata[cat];
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setAnchorCategory(cat);
                      setShowAnchorExample(true);
                    }}
                    className={`
                      p-3 md:p-4 rounded-xl md:rounded-xl text-sm md:text-base font-medium transition-all flex flex-col items-center gap-1
                      ${anchorCategory === cat ? 'bg-stone-800 text-white shadow-lg scale-105' : 'bg-white border-2 border-stone-200 hover:border-stone-300'}
                    `}
                  >
                    <span className="text-2xl">{metadata?.emoji || '📌'}</span>
                    <span>{cat}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Memory Loop: Show contextual example when category is selected */}
            {anchorCategory && showAnchorExample && selectedCategoryData && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }} 
                className="bg-stone-100 border-2 border-stone-200 rounded-xl p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{selectedCategoryData.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-stone-600 mb-1">In your {anchorCategory.toLowerCase()}:</p>
                    <p className="text-base text-stone-700 italic">&quot;{
                      // First try word-specific examples
                      currentWord.anchor?.examples?.[anchorCategory] ||
                      // Then try from the mapping file
                      wordAnchorExamples[currentWord.word]?.[anchorCategory] ||
                      // Finally fall back to category metadata
                      selectedCategoryData.example
                    }&quot;</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Button */}
        <div className="w-full max-w-2xl mx-auto md:flex-shrink-0 bg-stone-50 mt-auto md:mt-0 mb-10 md:mb-0">
          <button
            onClick={handleAnchorComplete}
            disabled={!anchorCategory}
            className="w-full py-3 md:py-3 bg-stone-800 text-white rounded-full font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-900 transition shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function getClusterColor(cluster: string) {
  const colors: Record<string, string> = {
    Work: '#6B5B6F',
    School: '#4A6D7A',
    Daily: '#8B7555',
    Literary: '#6B5A6A',
    Conflict: '#8B5F5F',
    Culture: '#5A7B6B'
  };
  return colors[cluster] || '#6B5B6F';
}

function CompletionScreen({ words }: { words: string[] }) {
  return (
    <div className="mobile-fit-screen md:min-h-screen bg-stone-50 px-4 md:px-6 py-6 md:py-12 flex items-center justify-center">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-2xl md:text-4xl">✓</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-medium mb-3 md:mb-4">Session Complete</h1>
        <p className="text-base md:text-lg text-stone-600 mb-6 md:mb-8">You explored {words.length} words</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 md:px-12 md:py-4 text-sm md:text-base bg-stone-800 text-white rounded-full font-medium hover:bg-stone-900 transition"
        >
          Explore More
        </button>
      </div>
    </div>
  );
}
