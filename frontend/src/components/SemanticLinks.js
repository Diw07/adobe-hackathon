import React from "react";

export default function SemanticLinks({ outline, links, selected }) {
  if (selected == null || links.length === 0) return null;
  const relatedIndices = links[selected]?.related_sections || [];
  const scores = links[selected]?.scores || [];

  if (relatedIndices.length === 0) return (
    <div style={{ padding: '10px' }}>
      <h3>No related sections found.</h3>
    </div>
  );

  return (
    <div style={{ padding: '10px', width: '300px', height: '80vh', overflowY: 'auto' }}>
      <h3>Related Sections</h3>
      <ul>
        {relatedIndices.map((idx, i) => (
          <li key={idx} style={{ marginBottom: '8px' }}>
            <b>{outline[idx].text}</b> (p.{outline[idx].page})  
            <br />
            <small>Score: {scores[i].toFixed(2)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
