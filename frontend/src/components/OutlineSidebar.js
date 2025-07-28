import React from "react";

export default function OutlineSidebar({ outline, onSectionClick, selectedIndex }) {
  return (
    <div style={{ borderRight: '1px solid #ccc', padding: '10px', width: '250px', overflowY: 'auto', height: '80vh' }}>
      <h2>Document Outline</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {outline.map((sec, idx) => (
          <li
            key={idx}
            onClick={() => onSectionClick(idx)}
            style={{
              cursor: 'pointer',
              padding: '5px',
              backgroundColor: idx === selectedIndex ? '#add8e6' : 'transparent',
              marginLeft: sec.level === 'H2' ? '15px' : '0'
            }}
          >
            {sec.text} (p.{sec.page})
          </li>
        ))}
      </ul>
    </div>
  );
}
