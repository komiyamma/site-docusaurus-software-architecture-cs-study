# Docusaurus モバイルメニュー カテゴリリンク追加ガイド

2段構成ナビバー（`TWO_ROW_NAVBAR_GUIDE.md` で構築）のモバイル表示で、ハンバーガーメニューにカテゴリリンクを表示するための手順書。
同じ構成の別サイトに適用する際のリファレンスとして利用する。

## 問題

モバイル表示（画面幅≤996px）では:
- 2段目のカテゴリバーが `display: none` で非表示になる
- ハンバーガーメニューには1段目の項目（komiyamma.net, GitHub）しか表示されない
- カテゴリへのナビゲーション手段がない

## 完成イメージ

```
ハンバーガーメニュー展開時:
┌──────────────────────────────┐
│  ✕                          │
├──────────────────────────────┤
│  カテゴリ                     │  ← セクションヘッダー
│  ・KISS C#版                 │
│  ・YAGNI C#版                │
│  ・SoC C#版                  │
│  ・...                       │
├──────────────────────────────┤  ← 区切り線
│  🔗 komiyamma.net            │
│  🔗 GitHub                   │
└──────────────────────────────┘
```

## 前提

- `TWO_ROW_NAVBAR_GUIDE.md` の構成が適用済みであること
- `CategoryBar` コンポーネントが存在すること
- Docusaurus 3.x

---

## 変更ファイル一覧

| # | パス | 操作 |
|---|------|------|
| 1 | `website/src/components/CategoryBar/index.tsx` | **修正** — categories配列をexport化 |
| 2 | `website/src/theme/Navbar/MobileSidebar/PrimaryMenu/index.tsx` | **新規作成** — スウィズルラッパー |
| 3 | `website/src/theme/Navbar/MobileSidebar/PrimaryMenu/styles.module.css` | **新規作成** — モバイルメニュー用スタイル |

---

## 手順1: `CategoryBar/index.tsx` の categories 配列を export 化

### やること

`categories` 配列を `const` → `export const` に変更して、他のコンポーネントからインポート可能にする。

### 変更箇所

```diff
-const categories: CategoryItem[] = [
+export const categories: CategoryItem[] = [
```

> **注意**: デフォルトエクスポートの `CategoryBar` コンポーネント自体はそのまま。名前付きエクスポートを追加するだけ。

---

## 手順2: `MobileSidebar/PrimaryMenu` のスウィズルラッパーを作成

### ファイル: `website/src/theme/Navbar/MobileSidebar/PrimaryMenu/index.tsx`

```tsx
import React from 'react';
import PrimaryMenu from '@theme-original/Navbar/MobileSidebar/PrimaryMenu';
import type PrimaryMenuType from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import type {WrapperProps} from '@docusaurus/types';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {categories} from '@site/src/components/CategoryBar';
import styles from './styles.module.css';

type Props = WrapperProps<typeof PrimaryMenuType>;

/**
 * 現在のURLパスからdocsフォルダ名を抽出してアクティブカテゴリを判定
 * 例: "/docs/kiss_cs/kiss_cs_study_001" → "kiss_cs"
 */
function getActiveFolder(pathname: string): string | null {
  const match = pathname.match(/^\/docs\/([^/]+)\//);
  return match ? match[1] : null;
}

export default function PrimaryMenuWrapper(props: Props): React.ReactNode {
  const {pathname} = useLocation();
  const activeFolder = getActiveFolder(pathname);
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <>
      {/* カテゴリリンクセクション */}
      <div className={styles.categorySection}>
        <div className={styles.categorySectionTitle}>カテゴリ</div>
        <ul className="menu__list">
          {categories.map((cat) => {
            const folderMatch = cat.path.match(/^\/docs\/([^/]+)\//);
            const catFolder = folderMatch ? folderMatch[1] : '';
            const isActive = activeFolder === catFolder;

            return (
              <li key={cat.sidebarId} className="menu__list-item">
                <Link
                  to={cat.path}
                  className={`menu__link ${isActive ? 'menu__link--active' : ''}`}
                  onClick={() => mobileSidebar.toggle()}
                >
                  {cat.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 区切り線 */}
      <hr className={styles.divider} />

      {/* 元のナビバー項目（komiyamma.net, GitHub等） */}
      <PrimaryMenu {...props} />
    </>
  );
}
```

> **解説**: `--wrap`モード相当のスウィズル。オリジナルの`PrimaryMenu`（navbar.itemsの表示）の上にカテゴリリンクを注入。リンクをクリックするとサイドバーが自動で閉じる。

---

## 手順3: モバイルメニュー用スタイルを作成

### ファイル: `website/src/theme/Navbar/MobileSidebar/PrimaryMenu/styles.module.css`

```css
/* ========================================
   Mobile Sidebar - Category Section
   ======================================== */

.categorySection {
  padding: 0.5rem 0;
}

.categorySectionTitle {
  padding: 0.4rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ifm-color-emphasis-500);
}

.divider {
  margin: 0.5rem 0.75rem;
  border: none;
  border-top: 1px solid var(--ifm-color-emphasis-200);
}
```

---

## 検証手順

```bash
# ビルド確認
cd website
npm run build

# ローカル確認
npm run start
```

### 確認ポイント

- [ ] ハンバーガーメニュー展開時、カテゴリリンク一覧がkomiyamma.net/GitHubの上に表示される
- [ ] 「カテゴリ」ヘッダーとリンク一覧の間に適切な間隔がある
- [ ] 区切り線でカテゴリリンクと既存リンクが視覚的に分離されている
- [ ] カテゴリリンクをクリックすると正しいページに遷移する
- [ ] 遷移後にモバイルメニューが自動で閉じる
- [ ] 現在のカテゴリがアクティブ表示（ハイライト）される
- [ ] デスクトップ幅に戻しても、従来のカテゴリバー（2段目）が正常に表示される

---

## カスタマイズポイント

他のサイトに適用する際は:

1. **`categories` 配列**（`CategoryBar/index.tsx` 内）を対象サイトのコンテンツに合わせて書き換える
2. セクションヘッダー「カテゴリ」のテキストは `categorySectionTitle` の中で変更可能
3. 色やスペーシングは CSS Variables を使っているので、テーマに自動適応する
