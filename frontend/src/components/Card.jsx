import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, title, icon, subtitle, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card-wrapper ${className || ''}`}
    >
      <div className="card-header">
        {icon && <div className="card-icon">{icon}</div>}
        <div className="card-info">
          <h4 className="card-title">{title}</h4>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="card-body">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
