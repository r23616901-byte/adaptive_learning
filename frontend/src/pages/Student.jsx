import React, { useState } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import OutputBox from '../components/OutputBox';
import { transformContent } from '../services/api';
import { GraduationCap, BookOpen, PenTool } from 'lucide-react';

const Student = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await transformContent(input, 'Student Mode');
      setOutput(res.output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout student-layout">
      <header className="page-header">
         <h1 className="page-title"><GraduationCap size={32} /> Smart Learning (Students)</h1>
         <p className="page-subtitle">Personalized notes and smart summaries from your material.</p>
      </header>

      <div className="main-grid">
        <Card title="Smart Input" subtitle="Drop your notes or text books here." icon={<BookOpen size={20} />}>
          <TextInput value={input} onChange={setInput} loading={loading} placeholder="Paste lecture notes or textbook segments..." />
          <button className="main-action-btn student-btn" onClick={handleTransform} disabled={loading || !input}>
            {loading ? <PenTool className="spinning" size={18} /> : <PenTool size={18} />}
            <span>{loading ? 'Creating Guide...' : 'Create Study Guide'}</span>
          </button>
        </Card>

        <Card title="Study Guide" subtitle="A simplified, focused list of key takeaways." icon={<PenTool size={20} />}>
          <OutputBox output={output} loading={loading} mode="Student Mode" onSpeech={(t) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(t))} />
        </Card>
      </div>
    </div>
  );
};

export default Student;
