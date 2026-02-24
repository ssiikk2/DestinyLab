import type { CalculatorMode } from "@/lib/test-themes";
import type { SeoFaq } from "@/content/seo-data";

export interface ToolPageRichContent {
  concept: string[];
  scoreInterpretation: string[];
  practicalTips: string[];
  nextSteps: string[];
  faqs: SeoFaq[];
  disclaimer: string;
}

const TOOL_PAGE_CONTENT: Partial<Record<CalculatorMode, ToolPageRichContent>> = {
  love: {
    concept: [
      "The love compatibility calculator is a symbolic reflection tool, not a promise engine. It turns two inputs into a score so couples can discuss emotional pace, communication style, and conflict habits without vague labels. Symbolic systems are useful when they trigger honest conversations that might otherwise be avoided.",
      "People often use this test when feelings are strong but direction is unclear. A score helps you slow down and look at patterns that repeat across weeks: who withdraws first, who pursues too quickly, and which topics escalate fastest. When you treat the score as a discussion starter, the result becomes practical.",
    ],
    scoreInterpretation: [
      "A high tier score usually points to smoother emotional timing and faster repair after misunderstandings. It does not mean the relationship can run on autopilot. High-score pairs still need routine check-ins, clear boundaries, and shared decisions about money, time, and digital communication expectations.",
      "A middle score usually means the foundation is workable but consistency is missing. One person may need reassurance while the other needs space, and both needs are valid when clearly negotiated. A lower score indicates pressure points that can still improve through behavior changes, especially with structure and patience.",
    ],
    practicalTips: [
      "Start with one weekly thirty-minute relationship review. Use three prompts: what felt safe this week, what felt tense, and what specific behavior would help next week. Keep examples concrete and recent. This format prevents old arguments from taking over and gives both people a fair speaking turn.",
      "Use a repair rule before conflict begins: if tone rises, pause for twenty minutes, then return with one sentence that names your need instead of blame. Couples who agree on repair process early reduce repeated damage. Process matters more than winning one argument in the moment.",
    ],
    nextSteps: [
      "Track progress for four weeks before judging whether compatibility is changing. Most relationship improvement is gradual and easy to miss without notes. Save one sentence after each check-in and compare month to month. Patterns become visible, and that visibility reduces panic-driven decisions.",
      "If your score is low, focus on one friction area first: response timing, trust repair, or household cooperation. Trying to fix everything at once creates new stress. If your score is high, protect what already works by scheduling intentional quality time and consistent follow-through.",
    ],
    faqs: [
      {
        question: "Does a high love compatibility score guarantee a lasting relationship?",
        answer:
          "No. A high score suggests smoother patterns, but long-term stability still depends on communication, reliability, and shared values.",
      },
      {
        question: "What should we do after getting a middle score?",
        answer:
          "Pick one repeat conflict, define one weekly behavior change, and review outcomes after four weeks before making bigger decisions.",
      },
      {
        question: "Can a low score improve over time?",
        answer:
          "Yes. Many low-score pairs improve when they use clear conflict rules, better timing, and practical follow-up habits.",
      },
      {
        question: "How often should we retake the love test?",
        answer:
          "Monthly is usually enough unless a major life event changes your schedule, stress level, or communication pattern.",
      },
      {
        question: "Is this calculator a replacement for therapy or counseling?",
        answer:
          "No. Use it for reflection and conversation only, then seek qualified support for high-stakes relationship decisions.",
      },
    ],
    disclaimer: "Entertainment-only compatibility guidance. Not medical, legal, financial, or mental-health advice.",
  },
  destiny: {
    concept: [
      "The destiny calculator is a symbolic single-person reading designed to surface personal tendencies that affect relationships. Instead of comparing two people directly, it highlights how you process stress, commitment, and emotional expression. This can improve compatibility outcomes because self-awareness often changes the entire dynamic.",
      "Many users treat destiny results as personality absolutes, but that is not the best use. The practical value comes from identifying recurring behavior loops: overthinking during uncertainty, avoiding difficult feedback, or expecting mind-reading from partners. Naming these loops creates a clear map for intentional relationship growth.",
    ],
    scoreInterpretation: [
      "A high destiny score usually reflects internal alignment: your intentions, words, and actions match more consistently. When this alignment is strong, partners experience greater emotional predictability and trust. You still need communication skills, but the baseline is stable enough to support healthy compromise.",
      "A middle score often indicates mixed signals within yourself. You may know what you want yet hesitate to express it clearly, or you may commit quickly and then feel overwhelmed. A lower score suggests unresolved internal friction, which can be improved through routines, boundaries, and realistic pacing.",
    ],
    practicalTips: [
      "Create a personal decision filter with three checks: does this choice respect my values, does it protect my energy, and can I explain it calmly to a partner. Using this filter before key conversations reduces confusion and prevents reactive promises you cannot maintain.",
      "Build emotional consistency with a short nightly reset: write one emotional trigger from the day and one constructive response for next time. This small habit improves self-regulation and makes relationship communication less volatile. Stable self-management is one of the strongest predictors of compatibility quality.",
    ],
    nextSteps: [
      "Use your destiny score to choose one development goal per month. Examples include speaking needs earlier, setting clearer personal boundaries, or improving conflict recovery language. Measurable goals are more effective than broad intentions such as trying harder or being a better partner in general.",
      "Recheck every four to six weeks and compare progress against your notes, not your mood on one difficult day. Long-term compatibility improves when personal growth is steady and observable. The point of destiny insight is practical adjustment, not identity labels.",
    ],
    faqs: [
      {
        question: "What does the destiny score represent in relationship terms?",
        answer:
          "It reflects how your internal habits can support or strain trust, communication, and emotional consistency with others.",
      },
      {
        question: "Can destiny insights help if I am currently single?",
        answer:
          "Yes. The tool is useful for preparing healthier patterns before entering a new relationship.",
      },
      {
        question: "Why might my destiny score change over time?",
        answer:
          "Scores can shift as your stress management, boundaries, and communication behavior improve or regress.",
      },
      {
        question: "How should I use a lower destiny score constructively?",
        answer:
          "Treat it as a growth signal, pick one behavior target, and track weekly progress with simple notes.",
      },
      {
        question: "Does destiny replace professional support?",
        answer:
          "No. It is a reflective tool and should not replace qualified counseling or clinical advice.",
      },
    ],
    disclaimer: "Entertainment-only destiny reading. Use for reflection, not diagnosis or professional decision-making.",
  },
  zodiac: {
    concept: [
      "Zodiac compatibility is a symbolic language for discussing temperament and relational rhythm. It can be useful when it prompts specific conversations about expectations, not when it is used to stereotype a partner. The best results come from combining sign-based themes with real behavior you both observe.",
      "In practice, this tool helps people frame common differences such as speed of decision making, emotional expression style, and conflict recovery pace. Symbols are memorable, so they make communication easier. Still, no sign pairing is fixed fate. Habits and maturity shape outcomes far more than labels.",
    ],
    scoreInterpretation: [
      "A high zodiac score often suggests that your default styles align with less effort. You may feel understood faster and recover from tension more quickly. Even then, do not skip practical agreements about texting expectations, spending priorities, and personal boundaries because alignment can fade under pressure.",
      "A middle score indicates mixed rhythm: strong chemistry in some areas and friction in others. This is common and manageable when you define routines around the weak points. A lower score highlights predictable triggers, which can become growth opportunities with better timing, empathy, and communication structure.",
    ],
    practicalTips: [
      "Translate symbolic insight into concrete actions. If one sign tends to process internally, schedule pause-and-return conversations instead of demanding instant answers. If one sign values spontaneity, reserve space for flexibility while still protecting key commitments. Behavioral agreements turn symbolic insight into everyday stability.",
      "Use a score-tier checklist after each major disagreement. High tier: protect strengths you already have. Mid tier: refine one weak routine this week. Low tier: simplify communication and reduce escalation triggers first. This approach keeps progress realistic and prevents overcorrection after one hard conversation.",
    ],
    nextSteps: [
      "Retake zodiac compatibility after meaningful changes such as moving, job shifts, or family pressure. External stress can alter how each person expresses sign-like traits. Comparing scores across life phases helps you separate temporary strain from deeper incompatibility assumptions that may not be accurate.",
      "Build long-term success around behavior, not mythology. Keep a shared note of what helps calm conflict, what increases closeness, and what repeatedly causes distance. When that list guides weekly choices, zodiac insight becomes a practical relationship planning tool instead of entertainment-only curiosity.",
    ],
    faqs: [
      {
        question: "Can zodiac compatibility predict relationship success perfectly?",
        answer:
          "No. It highlights tendencies, but relationship outcomes are determined by choices, skills, and consistency.",
      },
      {
        question: "Why do some low-score zodiac pairs still thrive?",
        answer:
          "They often use clear communication rules and adapt behavior instead of relying on assumptions about signs.",
      },
      {
        question: "Should I avoid someone because of sign mismatch?",
        answer:
          "Not necessarily. Use the score to prepare for likely friction points, not to make automatic judgments.",
      },
      {
        question: "How often should zodiac scores be checked?",
        answer:
          "Every one to two months is enough, or after major life changes that affect stress and communication.",
      },
      {
        question: "Is zodiac compatibility scientifically diagnostic?",
        answer:
          "No. It is symbolic and for reflection, not a clinical or scientific diagnosis tool.",
      },
    ],
    disclaimer: "Entertainment-only zodiac interpretation. Real-life compatibility depends on communication and behavior.",
  },
  birthday: {
    concept: [
      "Birthday compatibility uses date-based symbolism to explore life rhythm, emotional timing, and decision style between two people. It is helpful when used as a structured conversation prompt. Instead of asking whether a match is perfect, it encourages practical discussion about how each person handles routine, stress, and future planning.",
      "Dates can represent pacing differences: one partner may prefer rapid decisions while the other needs reflection. When these differences are unnamed, frustration grows. A birthday score gives you a neutral starting point to discuss timing needs without blame. This makes difficult topics easier to approach with respect.",
    ],
    scoreInterpretation: [
      "A higher birthday score usually suggests smoother day-to-day coordination and fewer surprises in communication pace. You still need explicit agreements around priorities, but the baseline feels cooperative. High scores are strongest when both people maintain consistency and avoid assuming that natural alignment removes the need for effort.",
      "A middle score often means your core connection is real, but practical rhythm needs refinement. You might connect emotionally while clashing over routines and deadlines. A lower score usually flags recurring timing stress. Improvement is possible when you define response windows, planning habits, and conflict reset practices.",
    ],
    practicalTips: [
      "Use a weekly planning ritual with two parts: one emotional check-in and one logistics review. Ask what felt supportive this week, then plan next week schedules together. Combining feelings with planning reduces the classic mismatch where both people care deeply but still miss each other in daily timing.",
      "When disagreements happen, identify whether the issue is value conflict or timing conflict. Many birthday mismatches are timing-based, not value-based. If values are aligned, adjust cadence first: slower responses for one partner, clearer deadlines for the other. Small rhythm adjustments often produce outsized relationship relief.",
    ],
    nextSteps: [
      "For high scores, focus on maintenance. Protect quality time, keep promises visible, and revisit boundaries before stress builds. For middle scores, prioritize one shared routine that improves reliability. For lower scores, narrow effort to one recurring trigger and practice a single better response until it becomes natural.",
      "Retake the birthday calculator monthly and compare with lived outcomes from your notes. If your communication quality improves while conflict intensity drops, your compatibility process is working even before scores shift dramatically. The goal is practical progress in real life, not perfection on one test.",
    ],
    faqs: [
      {
        question: "What does birthday compatibility measure best?",
        answer:
          "It is most useful for discussing pace, routine fit, and how two people coordinate emotional and practical life.",
      },
      {
        question: "Can we have good chemistry with a middle score?",
        answer:
          "Yes. Middle scores often indicate strong potential when communication and planning habits are improved.",
      },
      {
        question: "Why does timing matter so much in compatibility?",
        answer:
          "Because many conflicts come from mismatched response pace rather than disagreement about core values.",
      },
      {
        question: "How can a low score pair improve quickly?",
        answer:
          "Set clear communication windows, use weekly planning, and practice one conflict reset rule consistently.",
      },
      {
        question: "Is birthday matching a deterministic outcome?",
        answer:
          "No. It is symbolic guidance and should be used for reflection rather than fixed predictions.",
      },
    ],
    disclaimer: "Entertainment-only birthday compatibility guidance. Use results as conversation prompts, not certainty.",
  },
  crush: {
    concept: [
      "The crush compatibility calculator is designed for early-stage uncertainty when attraction is strong but information is limited. It offers a symbolic score that helps you pace expectations and communicate clearly. Early dynamics are often shaped by assumptions, so the score works best when it encourages honest, low-pressure dialogue.",
      "A crush phase can feel intense because imagination fills gaps before real compatibility is known. This tool reduces that noise by framing key questions: do communication styles align, is emotional interest balanced, and are intentions compatible. The value is not prediction, but clarity before deeper emotional investment.",
    ],
    scoreInterpretation: [
      "A high crush score suggests promising alignment in early communication and emotional pacing. It does not confirm long-term compatibility yet. Treat it as permission to continue learning about values, boundaries, and consistency. Early attraction should be paired with observation, not immediate assumptions about permanence.",
      "A middle score indicates potential with uncertainty. One person may be more expressive while the other is cautious, which can still work with clear expectations. A lower score often signals mismatch in intention or pace. Use that signal to protect your emotional boundaries and avoid over-investing too quickly.",
    ],
    practicalTips: [
      "Set communication expectations early. If one person prefers frequent messages and the other communicates less often, define a rhythm that feels respectful to both. Ambiguity creates avoidable anxiety in early dating. Clear cadence is one of the fastest ways to reduce confusion and build trust.",
      "Watch for consistency between words and behavior over two to three weeks. Genuine compatibility shows up in follow-through, not only chemistry. If plans repeatedly change without clear communication, treat that as meaningful data. Compatibility is less about perfect vibes and more about reliable mutual effort.",
    ],
    nextSteps: [
      "If your score is high, keep momentum grounded: ask direct questions about goals, boundaries, and lifestyle fit before exclusivity decisions. If your score is mid, move slower and gather real behavioral evidence. If low, protect your energy by setting limits and avoiding one-sided pursuit cycles.",
      "Retake the crush test after meaningful interactions, not every day. Frequent retesting can amplify anxiety. Use each result to adjust one practical action such as communication clarity, date planning style, or emotional pacing. This keeps your decisions informed by patterns instead of momentary emotions.",
    ],
    faqs: [
      {
        question: "Is a high crush score enough to commit quickly?",
        answer:
          "No. It indicates positive early alignment, but long-term fit still requires time and behavioral consistency.",
      },
      {
        question: "How should I use a low crush score?",
        answer:
          "Use it as a boundary signal to slow down, clarify intentions, and protect your emotional balance.",
      },
      {
        question: "What matters most in early compatibility?",
        answer:
          "Consistency, honest communication, and aligned intentions matter more than intense first-week chemistry.",
      },
      {
        question: "Can a middle crush score turn into a strong match?",
        answer:
          "Yes, especially when both people communicate expectations and show dependable follow-through over time.",
      },
      {
        question: "Does this replace real conversations with my crush?",
        answer:
          "No. The score should support direct communication, not replace it.",
      },
    ],
    disclaimer: "Entertainment-only crush compatibility insight. Use it to guide pacing, not to force outcomes.",
  },
  initials: {
    concept: [
      "Initials compatibility is a symbolic quick-read format built for short, repeatable check-ins. It simplifies complexity into a lightweight score so users can reflect without overanalyzing every message. Symbolic tools are most useful when they trigger useful questions about communication quality and emotional intention.",
      "Because initials are minimal input, the result should be treated as a directional prompt rather than a detailed profile. The practical advantage is speed. You can run a quick check, then decide whether the current relationship dynamic needs reassurance, clearer boundaries, or a slower pace.",
    ],
    scoreInterpretation: [
      "A high initials score usually points to smooth surface-level flow and positive interaction energy. Keep in mind that surface harmony still needs deeper verification through behavior over time. Use high results to reinforce healthy communication habits instead of assuming the relationship will manage itself.",
      "A middle score suggests mixed signals that can improve with intentional communication. A lower score may highlight uneven effort, unclear intent, or mismatched emotional timing. None of these outcomes are permanent labels. They are indicators that help you choose the right next conversation and set realistic expectations.",
    ],
    practicalTips: [
      "Treat initials results as a weekly pulse check. Ask one practical question after each run: what specific behavior improved trust this week, and what behavior reduced it. This keeps insight tied to evidence. Relationship clarity grows faster when reflection is anchored to observable actions.",
      "If communication feels inconsistent, reduce guesswork with direct statements about availability, preferred response timing, and boundaries around emotionally heavy topics. Simple agreements prevent many misunderstandings that people wrongly interpret as lack of compatibility. Clarity is often more important than chemistry in daily stability.",
    ],
    nextSteps: [
      "For high scores, maintain momentum by protecting routines that already work, such as predictable check-ins and respectful feedback tone. For middle scores, choose one friction point to improve this week. For low scores, prioritize emotional safety and avoid escalating investment until consistency improves.",
      "Recheck monthly and compare with your notes instead of relying on memory. This helps you see whether the relationship trend is improving, flat, or declining. The power of initials compatibility is its speed plus consistency: small check-ins that support smarter long-term choices.",
    ],
    faqs: [
      {
        question: "How accurate is initials compatibility compared with full tests?",
        answer:
          "It is a quick symbolic pulse check, so use it for direction and pair it with deeper behavior-based evaluation.",
      },
      {
        question: "Can initials compatibility be useful in established relationships?",
        answer:
          "Yes. It works well as a lightweight weekly reflection tool to spot changing communication patterns.",
      },
      {
        question: "What should I do after a middle initials score?",
        answer:
          "Clarify one expectation this week and track whether communication quality improves in real interactions.",
      },
      {
        question: "Does a low score mean we should stop talking?",
        answer:
          "Not automatically. It means you should slow down, check consistency, and protect healthy boundaries.",
      },
      {
        question: "Is initials compatibility a scientific assessment?",
        answer:
          "No. It is symbolic and intended for entertainment and reflection.",
      },
    ],
    disclaimer: "Entertainment-only initials compatibility reading. Use as a quick reflection checkpoint.",
  },
  friendship: {
    concept: [
      "Friendship compatibility focuses on trust rhythm, emotional reliability, and communication style between friends. It is symbolic, but practical when used to discuss how support actually shows up in daily life. Strong friendships are built on repeat behavior, not only shared interests or occasional high-energy conversations.",
      "This calculator helps identify whether your friendship dynamic is balanced or draining. It can reveal patterns like unequal emotional labor, inconsistent follow-through, or different conflict styles. Naming these patterns early protects long-term connection and prevents silent resentment from becoming permanent distance.",
    ],
    scoreInterpretation: [
      "A high friendship score usually indicates stable trust signals: promises are kept, boundaries are respected, and conflict repair is quick. Even high-score friendships need maintenance through honest check-ins and mutual effort. Reliability over time matters more than one great week of communication.",
      "A middle score suggests potential with uneven consistency. You may share values but differ in availability, responsiveness, or emotional directness. A lower score often means support expectations are unclear or mismatched. Improvement is possible when both friends agree on practical standards for communication and accountability.",
    ],
    practicalTips: [
      "Use a simple friendship reset when tension appears: name the issue without accusation, explain impact briefly, and propose one concrete adjustment. This structure keeps conversations respectful and reduces defensive reactions. Friendships improve faster when feedback is direct, specific, and focused on repair rather than blame.",
      "Set realistic support boundaries. Not every friend can be available for every emotional need, and clarity prevents disappointment. Discuss preferred communication channels, response expectations, and crisis boundaries. Healthy limits strengthen trust because each person knows what kind of support is reliable and sustainable.",
    ],
    nextSteps: [
      "If your score is high, protect the routines that make trust easy, such as consistent check-ins and clear follow-through. If middle, improve one weak area this month, like response consistency. If low, have an honest conversation about expectations before investing more emotional energy.",
      "Retake monthly and compare with lived behavior, especially after stressful periods. Friendship compatibility is dynamic, and life changes can shift availability and communication tone. Tracking trends over time helps you decide whether to repair, recalibrate boundaries, or simply accept different friendship capacities.",
    ],
    faqs: [
      {
        question: "What does friendship compatibility evaluate most effectively?",
        answer:
          "It is best for reflecting on trust consistency, communication reliability, and conflict repair behavior.",
      },
      {
        question: "Can friendship compatibility improve after conflict?",
        answer:
          "Yes. Clear repair conversations and consistent follow-through can significantly improve friendship quality.",
      },
      {
        question: "Why would a close friendship still get a middle score?",
        answer:
          "Because affection can be strong while practical reliability or boundaries remain inconsistent.",
      },
      {
        question: "How should I use a low friendship score constructively?",
        answer:
          "Clarify expectations, set boundaries, and observe whether behavior aligns over the next few weeks.",
      },
      {
        question: "Is this a professional mental-health tool?",
        answer:
          "No. It is a symbolic reflection tool for entertainment and communication support.",
      },
    ],
    disclaimer: "Entertainment-only friendship compatibility guidance. Use it to improve communication habits.",
  },
};

export function getToolPageRichContent(mode: CalculatorMode): ToolPageRichContent | null {
  return TOOL_PAGE_CONTENT[mode] ?? null;
}
