import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'fs';
import * as path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'software-architecture-cs-study.komiyamma.net',
  tagline: 'ソフトウェアアーキテクチャ入門者用の学習教材',
  favicon: 'img/architecture_logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://software-architecture-cs-study.komiyamma.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'komiyamma', // Usually your GitHub org/user name.
  projectName: 'site-docusaurus-software-architecture-cs-study', // Usually your repo name.

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },

  markdown: {
    format: 'detect',  // .md は CommonMark、.mdx は MDX として処理
    mermaid: true,
    // 外部の .memo ファイルからページの description を読み込む
    parseFrontMatter: async (params) => {
      // デフォルトのパーサーを使用
      const result = await params.defaultParseFrontMatter(params);

      // すでに description があれば何もしない
      if (result.frontMatter.description) {
        return result;
      }

      // 対応する .memo ファイルのパスを計算
      // 以前: const memoPath = params.filePath.replace(/\.mdx?$/, '.memo');
      // 変更: .md ファイルがあるディレクトリの memo サブフォルダ内を探す
      const fileDir = path.dirname(params.filePath);
      const fileName = path.basename(params.filePath).replace(/\.mdx?$/, '.memo');
      const memoPath = path.join(fileDir, 'memo', fileName);

      // .memo ファイルが存在すれば description として読み込む
      if (fs.existsSync(memoPath)) {
        const memoContent = fs.readFileSync(memoPath, 'utf-8').trim().replace(/[\r\n]+/g, ' ');
        if (memoContent) {
          result.frontMatter.description = memoContent;
        }
      }

      return result;
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      "@easyops-cn/docusaurus-search-local",
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["ja"],
        indexBlog: false,
        indexPages: false,
        // Split search index by top-level docs folders to avoid a huge single JSON.
        searchContextByPaths: [
          "docs/adr_cs",
          "docs/ddd_cs",
          "docs/di_cs",
          "docs/dip_cs",
          "docs/dpn_rule_cs",
          "docs/dry_cs",
          "docs/entity_obj_cs",
          "docs/err_model_cs",
          "docs/hc_lc_cs",
          "docs/hex_cs",
          "docs/isa_hasa_cs",
          "docs/kiss_cs",
          "docs/mvc_cs",
          "docs/soc_cs",
          "docs/solid_cs",
          "docs/yagni_cs",
          "docs/clean_cs",
          "docs/cqs_cs",
          "docs/cqrs_cs",
          "docs/invariants_cs",
          "docs/svbc_cs",
          "docs/state_machine_cs",
          "docs/acl_cs",
          "docs/ab_tcb_cs",
          "docs/dbc_cs",
          "docs/cap_cs",
          "docs/es_cs",
          "docs/de_cs",
          "docs/bc_cs",
          "docs/idem_cs",
          "docs/saga_cs",
          "docs/refactoring_cs",
          "docs/mod_mono_cs",
          "docs/tdd_cs",
          "docs/api_contract_cs",
          "docs/testable_cs",
        ],
        hideSearchBarWithNoSearchContext: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.

        },
        blog: false, // Blog機能は無効化 (フォルダ削除済み)
        /*
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.

          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        */
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'ソフトウェア設計 C#',
      logo: {
        alt: 'Home',
        src: 'img/home_white.svg',
        srcDark: 'img/home_white.svg',
      },
      items: [
        {
          href: 'https://komiyamma.net',
          label: 'komiyamma.net',
          position: 'right',
          className: 'navbar-link-site-home',
          target: '_self',
        },
        {
          href: 'https://github.com/komiyamma/site-docusaurus-software-architecture-cs-study',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} komiyamma, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
