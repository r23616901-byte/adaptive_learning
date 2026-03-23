const openai = require('../config/openai');

const transformText = async (req, res) => {
  const { text, mode } = req.body;

  if (!text || !mode) {
    return res.status(400).json({ error: 'Text and mode are required' });
  }

  // MOCK ENGINE (If API Key is missing or invalid)
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai_api_key')) {
    console.warn('OPENAI_API_KEY not found. Using Mock AI Engine.');
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let output = [];

    switch (mode) {
      case 'Kids Mode':
        output = sentences.slice(0, 5).map(s => `🌟 ${s.trim()} - This is super exciting! ✨`);
        break;
      case 'Visual Mode':
        output = sentences.map((s, i) => `CONCEPT ${i + 1}: ${s.trim().toUpperCase()}`);
        break;
      case 'Student Mode':
        output = sentences.map(s => `📖 KEY POINT: ${s.trim()}`);
        break;
      case 'Exam Prep Mode':
        output = sentences.slice(0, 4).map(s => `❓ PRACTICE: Explain the significance of "${s.trim().split(' ').slice(0, 3).join(' ')}..."`);
        break;
      case 'ADHD Mode':
        output = sentences.map(s => `🎯 FOCUS: ${s.trim()}`);
        break;
      default:
        output = sentences.map(s => s.trim());
    }
    return res.status(200).json({ output });
  }

  // REAL AI LOGIC
  const systemMessage = `You are an adaptive learning assistant.

Convert the given text into a neurodivergent-friendly format based on the selected mode: ${mode}

If Dyslexia Mode:
- Use simple words, short sentences, and bullet points.
- Focus on clarity and readability.

If ADHD Mode:
- Break text into small chunks and highlight key ideas using bullet points.
- Keep output engaging and distraction-free.

If Normal Mode:
- Summarize clearly in professional bullet points.

If Kids Mode (Kids 5-10 - Cartoon Learning):
- Use very simple, playful, and animated-style language.
- Explain things as if they were part of a cartoon or movie.
- Focus on storytelling and engagement.

If Visual Mode (Teens 10-16 - Visual Learning):
- Break concepts into highly structured, diagram-like descriptions.
- Focus on relationships between ideas and conceptual mapping.
- Use clear hierarchies.

If Student Mode (Smart Learning):
- Extract key takeaways, notes, and professional summaries.
- Focus on academic retention and study optimization.

If Exam Prep Mode (Adults/Exams - Exam Focus):
- Focus on answer writing strategies, scoring tips, and factual accuracy.
- Highlight common exam terms and structured response formats.

IMPORTANT:
- No long paragraphs.
- Return ONLY bullet points.
- Each bullet point must start with "-".
- Do not add any conversational text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: text },
      ],
      temperature: 0.7,
    });

    const outputRaw = response.choices[0].message.content;
    const outputLines = outputRaw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.substring(1).trim());

    res.status(200).json({ output: outputLines });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'AI processing failed', details: error.message });
  }
};

module.exports = { transformText };
