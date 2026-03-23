import React, { useState } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import OutputBox from '../components/OutputBox';
import { transformContent } from '../services/api';
import { Eye, Layers, Image as ImageIcon } from 'lucide-react';

const Visual = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await transformContent(input, 'Visual Mode');
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
    <div className="page-layout visual-layout">
      <header className="page-header">
         <h1 className="page-title"><Eye size={32} /> Visual Learning (Teens 10-16)</h1>
         <p className="page-subtitle">Highly structured concept mapping, diagrams, and visual breakdowns.</p>
      </header>

      <div className="main-grid">
        <Card title="Teens Input" subtitle="Structural breakdown for abstract ideas." icon={<Layers size={20} />}>
          <TextInput value={input} onChange={setInput} loading={loading} placeholder="Paste complex concepts here..." />
          <button className="main-action-btn visual-btn" onClick={handleTransform} disabled={loading || !input}>
            {loading ? <ImageIcon className="spinning" size={18} /> : <ImageIcon size={18} />}
            <span>{loading ? 'Visualizing...' : 'Map Concepts'}</span>
          </button>
        </Card>

        <Card title="Structural Map" subtitle="A visual-friendly breakdown of concepts." icon={<ImageIcon size={20} />}>
          <OutputBox output={output} loading={loading} mode="Visual Mode" onSpeech={handleSpeech} />
        </Card>
      </div>
    </div>
  );
};

export default Visual;
