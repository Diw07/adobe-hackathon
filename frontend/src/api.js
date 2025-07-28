export async function processPdf(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('http://127.0.0.1:8000/process_pdf/', {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function semanticSearch(query, sections) {
  const res = await fetch('http://127.0.0.1:8000/semantic_search/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, sections }),
  });
  return res.json();
}
