import React, { useState } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import OutputBox from '../components/OutputBox';
import { transformContent } from '../services/api';
import { ClipboardList, Target, CheckCircle } from 'lucide-react';

const Exam = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await transformContent(input, 'Exam Prep Mode');
      setOutput(res.output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout exam-layout">
      <header className="page-header">
         <h1 className="page-title"><ClipboardList size={32} /> Exam Focus (Adults)</h1>
         <p className="page-subtitle">Focused answer writing tips, scoring, and key factual highlights.</p>
      </header>

      <div className="main-grid">
        <Card title="Exam Prep Input" subtitle="Drop your syllabus points or text for extraction." icon={<Target size={20} />}>
          <TextInput value={input} onChange={setInput} loading={loading} placeholder="Paste syllabus or textbook content..." />
          <button className="main-action-btn exam-btn" onClick={handleTransform} disabled={loading || !input}>
            {loading ? <CheckCircle className="spinning" size={18} /> : <CheckCircle size={18} />}
            <span>{loading ? 'Preparing Questions...' : 'Practice Questions'}</span>
          </button>
        </Card>

        <Card title="Exam Highlights" subtitle="A breakdown of potential exam questions and key takeaways." icon={<CheckCircle size={20} />}>
          <OutputBox output={output} loading={loading} mode="Exam Prep Mode" onSpeech={(t) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(t))} />
        </Card>
      </div>
    </div>
  );
};

export default Exam;
