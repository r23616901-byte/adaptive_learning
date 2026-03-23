import React, { useState } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import OutputBox from '../components/OutputBox';
import { transformContent } from '../services/api';
import { Brain, Activity, Zap, Sparkles } from 'lucide-react';

const Home = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('Normal Mode');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await transformContent(input, mode);
      setOutput(res.output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="page-layout">
      <header className="page-header">
         <h1 className="page-title">Adaptive Learning Center</h1>
         <p className="page-subtitle">Personalize your education with AI-powered support.</p>
      </header>

      <div className="modes-row">
        {['Normal Mode', 'Dyslexia Mode', 'ADHD Mode'].map(m => (
          <button 
            key={m} 
            className={`mode-btn ${mode === m ? 'active' : ''}`}
            onClick={() => setMode(m)}
          >
            {m === 'Normal Mode' && <Brain size={16} />}
            {m === 'Dyslexia Mode' && <Activity size={16} />}
            {m === 'ADHD Mode' && <Zap size={16} />}
            <span>{m}</span>
          </button>
        ))}
      </div>

      <div className="main-grid">
        <Card title="Source Material" subtitle="Drop your text here to begin the adaptation." icon={<Brain size={20} />}>
          <TextInput value={input} onChange={setInput} loading={loading} />
          <button className="main-action-btn" onClick={handleTransform} disabled={loading || !input}>
            {loading ? <Sparkles className="spinning" size={18} /> : <Sparkles size={18} />}
            <span>{loading ? 'Processing...' : 'Transform Content'}</span>
          </button>
        </Card>

        <Card title="Adapted Content" subtitle="Your personalized learning result will appear here." icon={<Zap size={20} />}>
          <OutputBox output={output} loading={loading} mode={mode} onSpeech={handleSpeech} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
