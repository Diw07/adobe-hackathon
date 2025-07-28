import PyPDF2

def extract_outline(pdf_path):
    """
    Extract headings/outlines from a PDF by scanning each page.
    Detect lines starting with numbering (e.g., '1.', '2.1.', etc.)
    or lines which are uppercase and longer than 4 characters (e.g., section titles).
    Returns list of dicts: [{level, text, page}, ...]
    """
    reader = PyPDF2.PdfReader(pdf_path)
    outline = []
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        if not text:
            continue
        lines = text.split('\n')
        for line in lines:
            l = line.strip()
            if not l:
                continue
            # Detect headings by number-dot pattern or by all caps with length > 4
            if (l[0].isdigit() and '.' in l) or (l.isupper() and len(l) > 4):
                dots = l.count('.')
                level = 'H1' if dots == 1 else ('H2' if dots == 2 else 'H3')
                outline.append({
                    "level": level,
                    "text": l,
                    "page": int(page_num + 1)   # <-- **Cast explicitly to int to avoid numpy types**
                })
    return outline

# Quick test (optional)
if __name__ == "__main__":
    outline = extract_outline("../test_pdfs/sample.pdf")
    print(outline)
