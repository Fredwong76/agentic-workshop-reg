import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def get_docx_text(path):
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
    except Exception as e:
        return f"Error reading {path}: {str(e)}"
        
    tree = ET.fromstring(xml_content)
    
    # Namespaces
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    paragraphs = []
    for paragraph in tree.findall('.//w:p', ns):
        texts = [node.text for node in paragraph.findall('.//w:t', ns) if node.text]
        if texts:
            paragraphs.append("".join(texts))
            
    return '\n'.join(paragraphs)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python read_docx.py <input_docx> <output_txt>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        sys.exit(1)
        
    text = get_docx_text(input_path)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Successfully wrote {output_path}")
