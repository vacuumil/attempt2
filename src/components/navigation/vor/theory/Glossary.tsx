import React, { useState } from 'react';
import './Glossary.css';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  icon: string;
}

interface GlossaryProps {
  terms: GlossaryTerm[];
}

export const Glossary: React.FC<GlossaryProps> = ({ terms }) => {
  const [activeTermId, setActiveTermId] = useState<string | null>(null);

  const handleTermClick = (termId: string) => {
    setActiveTermId(activeTermId === termId ? null : termId);
  };

  const handleCopyTerm = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(term);
    // Можно добавить toast-уведомление
  };

  return (
    <div className="glossary-container">
      <h3>Глоссарий</h3>
      <div className="glossary-list">
        {terms.map((term) => (
          <div key={term.id} className="glossary-item">
            <button
              className="glossary-term-button"
              onClick={() => handleTermClick(term.id)}
              aria-expanded={activeTermId === term.id}
            >
              <span className="term-icon">{term.icon}</span>
              <span className="term-text">{term.term}</span>
              <div className="term-actions">
                <button
                  className="copy-button"
                  onClick={(e) => handleCopyTerm(term.term, e)}
                  title="Скопировать термин"
                >
                  📋
                </button>
                <span className="term-arrow">
                  {activeTermId === term.id ? '▼' : '►'}
                </span>
              </div>
            </button>
            <div className="glossary-definition">
              <p>{term.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};