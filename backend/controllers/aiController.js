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
  
  If Kids Mode (Kids 5-10 - Cartoon Learning):
  - Write a very simple, playful, and animated-style story.
  - Explain the concepts as if they were part of a fun adventure.
  - Use plenty of emojis.
  - Break the story into short, engaging chunks.
  - **CRITICAL**: Also identify a single "subjectKeyword" that represents the main topic of the text.
  - **IMPORTANT**: The keyword MUST be a descriptive noun (e.g., "moon", "robot", "castle"). **DO NOT** use common words like "the", "a", "is", "my", "how".
  - Return the response in this EXACT JSON format:
    {
      "output": ["Chunk 1 of the story...", "Chunk 2...", ...],
      "subjectKeyword": "meaningful-keyword"
    }

  For all other modes return ONLY bullet points starting with "-".
  Each bullet point must be clear and concise.
  Do not add any conversational text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: text },
      ],
      temperature: 0.7,
      response_format: mode === 'Kids Mode' ? { type: 'json_object' } : { type: 'text' }
    });

    const outputRaw = response.choices[0].message.content;
    
    if (mode === 'Kids Mode') {
      const parsed = JSON.parse(outputRaw);
      return res.status(200).json({ 
        output: parsed.output, 
        subjectKeyword: parsed.subjectKeyword 
      });
    }

    const outputLines = outputRaw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.substring(1).trim());

    res.status(200).json({ output: outputLines });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    
    // Fallback to Mock AI Engine if API fails
    console.warn('Falling back to Mock AI Engine due to API error.');
    
    const words = text.split(/\s+/).filter(w => w.length > 3 && !['the', 'a', 'an', 'is', 'how', 'why', 'what'].includes(w.toLowerCase()));
    let subjectKeyword = words[0]?.toLowerCase() || 'learning';

    switch (mode) {
      case 'Kids Mode':
        output = [
          `🌟 Once upon a time, we learned about ${subjectKeyword}! ✨`,
          `🚀 It was like a big adventure in a magical land!`,
          `🌈 Every part of ${subjectKeyword} is so special and fun! 🧸`
        ];
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
    return res.status(200).json({ output, subjectKeyword, isMock: true });
  }
};

module.exports = { transformText };
