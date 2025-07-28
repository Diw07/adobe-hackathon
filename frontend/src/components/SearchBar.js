import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <input
        type="text"
        placeholder="Search document..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        style={{ width: "70%", padding: "6px", fontSize: "16px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "6px 12px" }}>
        Search
      </button>
    </div>
  );
}
