import os
import re

base_dir = r"g:\repogitory\site-docusaurus-software-architecture-cs-study\website\docs\outbox_cs"

def check_images():
    print(f"Checking images in {base_dir}")
    md_files = [f for f in os.listdir(base_dir) if f.endswith(".md")]
    
    missing_images = []
    
    for md_file in md_files:
        file_path = os.path.join(base_dir, md_file)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Match standard markdown images: ![alt](url "title") or ![alt](url)
        # We assume typical docusaurus usage.
        matches = re.findall(r'!\[.*?\]\((.*?)\)', content)
        
        for match in matches:
            # Handle potential title part in the link usually separated by space
            url = match.split()[0]
            
            # Resolve path
            # Most links are like ./picture/foo.png or picture/foo.png
            if url.startswith("http"):
                continue # Ignore external links
            
            # Construct absolute path
            # Docusaurus resolves relative to the file
            image_path = os.path.normpath(os.path.join(base_dir, url))
            
            if not os.path.exists(image_path):
                missing_images.append(f"{md_file}: {url} -> {image_path}")
                
    if missing_images:
        print("Found missing images:")
        for missing in missing_images:
            print(missing)
    else:
        print("All image links are valid.")

if __name__ == "__main__":
    check_images()
