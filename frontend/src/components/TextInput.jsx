import React from 'react';
import { Type } from 'lucide-react';
import { motion } from 'framer-motion';

const TextInput = ({ value, onChange, placeholder, disabled, loading }) => {
  return (
    <div className="input-field-container">
      <div className="input-icon-wrapper">
        <Type size={18} className={loading ? 'spinning' : ''} />
      </div>
      <textarea
        className="input-field"
        placeholder={placeholder || "Enter content to adapt..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <div className="input-stats">
        <span>{value.trim() ? value.trim().split(/\s+/).length : 0} Words</span>
        <span>{value.length} Characters</span>
      </div>
    </div>
  );
};

export default TextInput;
