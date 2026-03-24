import React, { useState } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import OutputBox from '../components/OutputBox';
import { transformContent } from '../services/api';
import { Baby, Star, Wand2 } from 'lucide-react';

const Kids = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await transformContent(input, 'Kids Mode');
      setOutput(res.output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2; // kids pitch
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="page-layout kids-layout">
      <div className="kids-decor z-0">🌈 ⭐ 🚀  🧸</div>
      <header className="page-header relative z-10">
        <img src="/images/reading-kids.png" className="reading-kids-img" alt="Kids reading" />
        <h1 className="page-title"><Baby size={32} /> Cartoon Learning (Kids 5-10)</h1>
        <p className="page-subtitle text-lg font-bold">Let's turn your lessons into fun stories and animated adventures!</p>
      </header>
      <div className="floating-elements">
        <img src="/images/cloud.png" className="cloud" alt="cloud" />
      </div>
      <div className="main-grid relative z-10">
        <Card title="Animated Input" subtitle="Paste your text and see the magic!" icon={<Star size={20} className="text-yellow-400" />}>
          <TextInput value={input} onChange={setInput} loading={loading} placeholder="Paste a story or school lesson..." />
          <button className="main-action-btn kids-btn mt-4" onClick={handleTransform} disabled={loading || !input}>
            {loading ? <Wand2 className="spinning" size={24} /> : <Wand2 size={24} />}
            <span>{loading ? 'Magic is happening...' : 'Make it Playful! ✨'}</span>
          </button>
        </Card>

        <Card title="Your Cartoon Summary" subtitle="Here is your simple and fun summary!" icon={<Star size={20} className="text-yellow-400" />}>
          <OutputBox output={output} loading={loading} mode="Kids Mode" onSpeech={handleSpeech} />
        </Card>
      </div>

      <div className="mt-8 relative z-10 mb-12">
        <Card title="Fun Learning Video" subtitle="Watch and learn amazing things!" icon={<Star size={20} className="text-yellow-400" />}>
          <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden' }}>
            <iframe src="https://www.youtube.com/embed/1vclBtzGkC0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allowFullScreen title="Kids Learning Video"></iframe>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Kids;
