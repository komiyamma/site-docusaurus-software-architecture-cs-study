import os
import re

docs_dir = r"g:\repogitory\site-docusaurus-software-architecture-cs-study\website\docs\de_cs"
picture_dir = os.path.join(docs_dir, "picture")

# 画像ファイルのリストを取得
images = os.listdir(picture_dir)

def fix_image_links(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 画像リンクの正規表現: ![caption](./picture/filename)
    pattern = re.compile(r'!\[.*?\]\(\./picture/(.*?)\)')
    
    def replace_func(match):
        current_filename = match.group(1)
        # 拡張子を除いたベース名を取得
        base_name = os.path.splitext(current_filename)[0]
        
        # 実際のファイルリストから、同じベース名で始まるファイルを探す
        # より具体的に、"_study_###_" までの部分が一致するものを優先するなどの工夫
        # ここでは単純に前方一致で探すが、一意に決まるようにする
        matches = [img for img in images if img.startswith(base_name)]
        
        # もし見つからなかった場合、"de_cs_study_XXX" までの部分だけで探してみる
        if not matches:
            study_prefix_match = re.match(r'(de_cs_study_\d{3})', base_name)
            if study_prefix_match:
                prefix = study_prefix_match.group(1)
                # リンク先にある特徴的な単語を探す
                words = base_name.replace(prefix, "").strip("_").split("_")
                for word in words:
                    if len(word) > 2: # 短すぎる単語は無視
                        matches = [img for img in images if img.startswith(prefix) and word in img]
                        if matches: break

        if matches:
            # 最も一致度が高いものを使用。とりあえず最初のもの
            new_filename = matches[0]
            if current_filename != new_filename:
                print(f"  Fixed: {current_filename} -> {new_filename}")
                return f"![image](./picture/{new_filename})" # キャプションは一旦固定かそのままにするかだが、ビルドを通すことが優先
            return match.group(0)
        else:
            print(f"  Warning: No match found for {current_filename}")
            return match.group(0)

    new_content = pattern.sub(replace_func, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# 全ての .md ファイルを処理
for filename in os.listdir(docs_dir):
    if filename.endswith(".md"):
        print(f"Processing {filename}...")
        if fix_image_links(os.path.join(docs_dir, filename)):
            print(f"  Updated {filename}")
