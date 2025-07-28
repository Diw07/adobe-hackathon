from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embeddings(sections):
    texts = [sec['text'] for sec in sections]
    return model.encode(texts, show_progress_bar=False)

def compute_links(sections, threshold=0.65):
    if not sections:
        return []
    embeddings = get_embeddings(sections)
    sim_matrix = cosine_similarity(embeddings)
    links = []
    for i, row in enumerate(sim_matrix):
        # Get top 3 related sections excluding self, above threshold
        top_indices = [j for j in row.argsort()[::-1] if j != i and row[j] > threshold][:3]
        links.append({
            "section_idx": int(i),                               # Cast explicitly to int
            "related_sections": [int(idx) for idx in top_indices],   # Cast all indices to int
            "scores": [float(sim_matrix[i][j]) for j in top_indices] # Cast scores to float
        })
    return links

def semantic_search(sections, query):
    """
    Given a list of sections and a query string,
    return top 3 semantically most similar sections.
    """
    if not sections or not query:
        return []
    texts = [sec['text'] for sec in sections]
    section_embs = model.encode(texts)
    query_emb = model.encode([query])[0]
    sims = util.cos_sim([query_emb], section_embs)[0].tolist()
    top_indices = sorted(range(len(sims)), key=lambda i: sims[i], reverse=True)[:3]
    results = [
        {
            "text": sections[i]["text"],
            "page": int(sections[i]["page"]),   # Cast page to int
            "score": float(sims[i])             # Cast score to float
        }
        for i in top_indices
    ]
    return results
