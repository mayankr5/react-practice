import React, { useState } from 'react';
import data from './data';
import './styles.css';

interface DataItem {
  id: string;
  question: string;
  answer: string;
}

const Accordion: React.FC = () => {
  const [enableMultiSelection, setEnableMultiSelection] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  const handleEnableMultiSelection = () => {
    if (enableMultiSelection) {
      const lastSelected = multiSelected[0] ?? null;
      setSelected(lastSelected);
    } else {
      setMultiSelected(selected ? [selected] : []);
    }
    setEnableMultiSelection(prev => !prev);
  };

  const handleMultipleSelection = (id: string) => {
    setMultiSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [id, ...prev]
    );
  };

  const handleSingleSelection = (id: string) => {
    setSelected(prev => (prev === id ? null : id));
  };

  return (
    <div className="container">
        <button onClick={handleEnableMultiSelection}>
          {enableMultiSelection ? 'Disable' : 'Enable'} Multi-Selection
        </button>
      <div className="accordion">

        {data && data.length > 0 ? (
          data.map((dataItem: DataItem) => {
            const isActive = enableMultiSelection
              ? multiSelected.includes(dataItem.id)
              : selected === dataItem.id;

            return (
              <div
                className="item"
                key={dataItem.id}
                onClick={() =>
                  enableMultiSelection
                    ? handleMultipleSelection(dataItem.id)
                    : handleSingleSelection(dataItem.id)
                }
              >
                <div className="title">
                  <h3>{dataItem.question}</h3>
                  <span>{isActive ? '-' : '+'}</span>
                </div>
                {isActive && (
                  <div className="item-answer">{dataItem.answer}</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
