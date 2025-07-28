import React, { useState } from "react";
import { processPdf, semanticSearch } from "./api";
import OutlineSidebar from "./components/OutlineSidebar";
import SemanticLinks from "./components/SemanticLinks";
import SearchBar from "./components/SearchBar";

function App() {
  const [outline, setOutline] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleFileChange = async (e) => {
    if (e.target.files.length === 0) return;

    setSearchResults([]);
    setSelectedIndex(null);
    setOutline([]);
    setLinks([]);

    const file = e.target.files[0];
    try {
      const data = await processPdf(file);
      setOutline(data.outline);
      setLinks(data.links);
    } catch (err) {
      alert("Error processing PDF. Make sure backend server is running.");
      console.error(err);
    }
  };

  const handleSearch = async (query) => {
    if (!query || outline.length === 0) return;

    try {
      const { results } = await semanticSearch(query, outline);
      setSearchResults(results || []);
    } catch (e) {
      console.error("Search error:", e);
    }
  };

  return (
    <div style={{ display: 'flex', height: '95vh' }}>
      <div style={{ flexShrink: 0 }}>
        <input type="file" onChange={handleFileChange} />
        {outline.length > 0 && <SearchBar onSearch={handleSearch} />}
        {searchResults.length > 0 && (
          <div style={{ padding: '10px', width: '300px', overflowY: 'auto', height: '50vh' }}>
            <h3>Search Results</h3>
            <ul>
              {searchResults.map((sec, idx) => (
                <li
                  key={idx}
                  style={{ cursor: 'pointer', marginBottom: '8px' }}
                  onClick={() => {
                    const idxInOutline = outline.findIndex(o => o.text === sec.text);
                    setSelectedIndex(idxInOutline !== -1 ? idxInOutline : null);
                    setSearchResults([]);
                  }}
                >
                  {sec.text} (p.{sec.page}) — Score: {sec.score?.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {outline.length > 0 && (
        <>
          <OutlineSidebar
            outline={outline}
            onSectionClick={setSelectedIndex}
            selectedIndex={selectedIndex}
          />
          <SemanticLinks
            outline={outline}
            links={links}
            selected={selectedIndex}
          />
        </>
      )}
    </div>
  );
}

export default App;
