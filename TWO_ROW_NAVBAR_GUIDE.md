# Docusaurus ナビバー2段構成 適用ガイド

Docusaurusサイトのナビバーを1段→2段構成に変更するための手順書。
同じ構成の別サイトに適用する際のリファレンスとして利用する。

## 完成イメージ

```
┌──────────────────────────────────────────────────────────────────┐
│ 🏠 HOME │ komiyamma.net      [🔍 検索欄]           GitHub      │  ← 1段目（メインnavbar）
├──────────────────────────────────────────────────────────────────┤
│ カテゴリA │ カテゴリB │ カテゴリC │ ... （横スクロール可能）     │  ← 2段目（CategoryBar）
└──────────────────────────────────────────────────────────────────┘
```

- **1段目**: ホームアイコン＋HOMEテキスト → `|` 区切り → komiyamma.net → （右側）検索＋GitHub
- **2段目**: 各カテゴリタブ（旧navbar.itemsのdocSidebarリンク）、横スクロール対応、アクティブハイライト

---

## 前提

- Docusaurus 3.x (3.9.2で検証済み)
- `@docusaurus/preset-classic` 使用
- 仕組み: `Navbar/Layout` の **wrapスウィズル** で元のNavbar直下にCategoryBarを注入

---

## 変更ファイル一覧

| # | パス | 操作 |
|---|------|------|
| 1 | `website/docusaurus.config.ts` | **修正** — navbar.items整理 |
| 2 | `website/src/theme/Navbar/Layout/index.tsx` | **新規作成** — スウィズルラッパー |
| 3 | `website/src/components/CategoryBar/index.tsx` | **新規作成** — 2段目コンポーネント |
| 4 | `website/src/components/CategoryBar/styles.module.css` | **新規作成** — 2段目スタイル |
| 5 | `website/src/css/custom.css` | **修正** — 1段目スタイル変更 |

---

## 手順1: `docusaurus.config.ts` を修正

### やること

1. `navbar.title` を `'HOME'` に設定
2. `navbar.items` から全ての `type: 'docSidebar'` 項目を **削除**
3. `komiyamma.net` リンクを `position: 'right'` → `position: 'left'` に変更
4. GitHub リンクは `position: 'right'` のまま

### 変更後のnavbar部分

```typescript
navbar: {
  title: 'HOME',
  logo: {
    alt: 'Home',
    src: 'img/home_white.svg',
    srcDark: 'img/home_white.svg',
  },
  items: [
    // komiyamma.net を左側に配置（HOME の右隣、「|」区切りで表示）
    {
      href: 'https://komiyamma.net',
      label: 'komiyamma.net',
      position: 'left',
      className: 'navbar-link-site-home',
      target: '_self',
    },
    // GitHub は右側のまま
    {
      href: 'https://github.com/komiyamma/site-docusaurus-software-architecture-cs-study',
      label: 'GitHub',
      position: 'right',
    },
  ],
},
```

> **ポイント**: 検索プラグイン（`@easyops-cn/docusaurus-search-local` 等）が設定されていれば、検索欄は自動的に1段目の右側に表示される。

---

## 手順2: `Navbar/Layout` のスウィズルラッパーを作成

### ファイル: `website/src/theme/Navbar/Layout/index.tsx`

```tsx
import React from 'react';
import Layout from '@theme-original/Navbar/Layout';
import type LayoutType from '@theme/Navbar/Layout';
import type {WrapperProps} from '@docusaurus/types';
import CategoryBar from '@site/src/components/CategoryBar';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): React.ReactNode {
  return (
    <>
      <Layout {...props} />
      <CategoryBar />
    </>
  );
}
```

> **解説**: `--wrap`モード相当のスウィズル。元の`Navbar/Layout`をそのままレンダリングし、直後に`CategoryBar`を追加。Docusaurusアップデート時も壊れにくい。

---

## 手順3: `CategoryBar` コンポーネントを作成

### ファイル: `website/src/components/CategoryBar/index.tsx`

```tsx
import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

type CategoryItem = {
  label: string;
  sidebarId: string;
  path: string;
};

/**
 * ★★★ サイトごとにカスタマイズが必要な部分 ★★★
 * 各カテゴリのラベル、sidebarId、インデックスページパスを定義。
 * 元の docusaurus.config.ts の navbar.items (type: 'docSidebar') から移植する。
 *
 * パス規則: /docs/{フォルダ名}/{フォルダ名}_index
 */
const categories: CategoryItem[] = [
  { label: 'カテゴリA',  sidebarId: 'categoryASidebar',  path: '/docs/category_a/category_a_index' },
  { label: 'カテゴリB',  sidebarId: 'categoryBSidebar',  path: '/docs/category_b/category_b_index' },
  // ... 必要なだけ追加
];

/**
 * 現在のURLパスからdocsフォルダ名を抽出してアクティブカテゴリを判定
 * 例: "/docs/kiss_cs/kiss_cs_study_001" → "kiss_cs"
 */
function getActiveFolder(pathname: string): string | null {
  const match = pathname.match(/^\/docs\/([^/]+)\//);
  return match ? match[1] : null;
}

export default function CategoryBar(): React.ReactNode {
  const { pathname } = useLocation();
  const activeFolder = getActiveFolder(pathname);

  return (
    <div className={styles.categoryBar}>
      <div className={styles.categoryBarInner}>
        {categories.map((cat) => {
          const folderMatch = cat.path.match(/^\/docs\/([^/]+)\//);
          const catFolder = folderMatch ? folderMatch[1] : '';
          const isActive = activeFolder === catFolder;

          return (
            <Link
              key={cat.sidebarId}
              to={cat.path}
              className={`${styles.categoryLink} ${isActive ? styles.categoryLinkActive : ''}`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

> **カスタマイズポイント**: `categories` 配列を対象サイトのコンテンツに合わせて書き換える。元の `docusaurus.config.ts` の `navbar.items` で `type: 'docSidebar'` だった項目を、`{ label, sidebarId, path }` の形式に変換して配置する。

---

## 手順4: `CategoryBar` のスタイルを作成

### ファイル: `website/src/components/CategoryBar/styles.module.css`

```css
/* ========================================
   Category Bar (2nd row of navigation)
   ======================================== */

.categoryBar {
  background: #1e5490;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08),
              0 1px 3px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: var(--ifm-navbar-height);
  z-index: var(--ifm-z-index-fixed);
  width: 100%;
}

.categoryBarInner {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 0.5rem;

  /* Subtle scrollbar to indicate scrollability */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
}

.categoryBarInner::-webkit-scrollbar {
  height: 5px;
}

.categoryBarInner::-webkit-scrollbar-track {
  background: transparent;
}

.categoryBarInner::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 4px;
}

.categoryBarInner::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.55);
}

/* Individual category link */
.categoryLink {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  flex-shrink: 0;
}

.categoryLink:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  text-decoration: none;
}

/* Active (current section) highlight */
.categoryLinkActive {
  color: #ffffff;
  font-weight: 600;
  border-bottom-color: #ffffff;
}

/* ========================================
   Responsive: hide on mobile (use sidebar)
   ======================================== */
@media (max-width: 996px) {
  .categoryBar {
    display: none;
  }
}
```

> **色調の設計**: 1段目 `#2563a7`（明るめの青）、2段目 `#1e5490`（やや暗い青）で視覚的に段を区別。

---

## 手順5: `custom.css` を修正

### やること

旧ナビバーの横スクロール関連CSS（`.navbar__inner` の relative、`.navbar__items` の overflow-x、`.navbar__brand` の absolute配置 等）を**削除**し、以下の1段目用スタイルに置き換える。

### 置き換えるCSSブロック

**Before（削除対象）**: `/* Navbar Horizontal Scroll (Simple) */` セクション全体と、右側の `navbar-link-site-home` スタイル

**After（追加する内容）**:

```css
/* ========================================
   Navbar - 1st row layout
   ======================================== */

/* Navbar brand (HOME icon + text) - normal flow, no absolute positioning */
.navbar__brand {
  flex-shrink: 0;
}

/* HOME text color */
.navbar__title {
  color: rgba(255, 255, 255, 0.9);
}

/* Separator between HOME and komiyamma.net */
.navbar__items:not(.navbar__items--right) .navbar-link-site-home {
  position: relative;
  padding-left: 1rem;
  margin-left: 0.25rem;
}

.navbar__items:not(.navbar__items--right) .navbar-link-site-home::before {
  content: "|";
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

/* 三本線ボタン自体の色（アイコンの色） */
.navbar__toggle {
  color: white;
}
/* ホバーした時の色 */
.navbar__toggle:hover {
  color: rgba(255, 255, 255, 0.8);
}
```

> **注意**: `.navbar__link`、`.navbar__link:hover`、`.navbar .DocSearch-Button` 等の既存スタイルは**そのまま残す**。

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

- [ ] 1段目に HOME | komiyamma.net（左）+ 検索 + GitHub（右）が表示される
- [ ] 2段目に全カテゴリタブが横スクロールで表示される
- [ ] 2段目の背景色が1段目より少し暗い
- [ ] カテゴリをクリックすると正しいdocsページに遷移する
- [ ] 遷移先ページで該当カテゴリがハイライト（白文字+下線）される
- [ ] モバイル幅（996px以下）で2段目が非表示になる
