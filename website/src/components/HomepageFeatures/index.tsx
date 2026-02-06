import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [

  {
    title: 'DDD C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        ドメイン駆動設計（DDD）の基本概念と、<br/>C#を用いた実践的な実装パターンを学びます。<br/>戦略的設計から戦術的設計まで。<br/>
      </>
    ),
    link: '/docs/ddd_cs/ddd_cs_index',
  },
  {
    title: 'ADR C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Architecture Decision Records（ADR）の<br/>書き方と運用方法を学びます。<br/>C#プロジェクトでの実践例を中心に。<br/>
      </>
    ),
    link: '/docs/adr_cs/adr_cs_index',
  },
  {
    title: 'YAGNI C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶYAGNI（You Aren't Gonna Need It）。<br/>「今必要なものだけ作る」技術と<br/>過剰な作り込みを防ぐ設計判断。<br/>
      </>
    ),
    link: '/docs/yagni_cs/yagni_cs_index',
  },
  {
    title: 'KISS C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#版KISS（Keep It Simple, Stupid）。<br/>複雑さを排除し、<br/>読みやすく変更しやすいコードを書く。<br/>
      </>
    ),
    link: '/docs/kiss_cs/kiss_cs_index',
  },
  {
    title: 'SOLID C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶSOLID原則。<br/>オブジェクト指向設計の基礎から実践まで、<br/>変更に強いコードの書き方を学びます。<br/>
      </>
    ),
    link: '/docs/solid_cs/solid_cs_index',
  },
  {
    title: 'DRY C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶDRY（重複排除）。<br/>コピペコードからの脱却と<br/>メソッド抽出など実践的なリファクタリング手法。<br/>
      </>
    ),
    link: '/docs/dry_cs/dry_cs_index',
  },
  {
    title: 'SoC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶSoC（関心の分離）。<br/>UI、ロジック、データアクセスの<br/>適切な分離と依存関係の整理。<br/>
      </>
    ),
    link: '/docs/soc_cs/soc_cs_index',
  },
  {
    title: 'HC/LC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶ高凝集・低結合。<br/>変更に強いコード設計の基礎。<br/>責務の分離と依存関係のコントロール。<br/>
      </>
    ),
    link: '/docs/hc_lc_cs/hc_lc_cs_index',
  },
  {
    title: 'MVC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶMVCパターン。<br/>Model-View-Controllerの責務分担と<br/>Webアプリケーション設計の基礎。<br/>
      </>
    ),
    link: '/docs/mvc_cs/mvc_cs_index',
  },
  {
    title: 'DI C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶ依存性注入（DI）。<br/>疎結合な設計とテスト容易性。<br/>変更に強いアーキテクチャの要。<br/>
      </>
    ),
    link: '/docs/di_cs/di_cs_index',
  },
  {
    title: 'DIP C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶ依存性逆転の原則。<br/>抽象への依存とDIコンテナの活用。<br/>テスト容易性と保守性の向上。<br/>
      </>
    ),
    link: '/docs/dip_cs/dip_cs_index',
  },
  {
    title: 'Is-a/Has-a C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶ合成（Composition）。<br/>「継承より合成」を合言葉に、<br/>変更に強く、部品として再利用可能な設計。<br/>
      </>
    ),
    link: '/docs/isa_hasa_cs/isa_hasa_cs_index',
  },
  {
    title: '依存関係ルール C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        依存関係ルール（Dependency Rule）の基本と、<br/>C#での実践的な適用方法を学びます。<br/>中心と外側を意識し、変更に強い設計を。<br/>
      </>
    ),
    link: '/docs/dpn_rule_cs/dpn_rule_cs_index',
  },
  {
    title: 'レイヤー C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶレイヤードアーキテクチャ。<br/>関心の分離と依存性の制御。<br/>
      </>
    ),
    link: '/docs/layer_cs/layer_cs_index',
  },
  {
    title: 'Entity/VO C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶEntityとValue Object。<br/>同一性による識別と値の不変性。<br/>ドメイン駆動設計の基礎となる実装パターン。<br/>
      </>
    ),
    link: '/docs/entity_obj_cs/entity_obj_cs_index',
  },
  {
    title: 'ヘキサゴナル C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶヘキサゴナルアーキテクチャ。<br/>Ports & Adaptersの基本概念から、<br/>外部依存に振り回されない堅牢な設計へ。<br/>
      </>
    ),
    link: '/docs/hex_cs/hex_cs_index',
  },
  {
    title: 'エラーモデリング C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        エラーを「仕様」として扱う設計手法を学びます。<br/>例外境界、Result型、ProblemDetailsなど、<br/>堅牢で運用しやすいエラー設計の実践パターン。<br/>
      </>
    ),
    link: '/docs/err_model_cs/err_model_cs_index',
  },
  {
    title: 'Observer C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        C#で学ぶObserverパターン。<br/>イベント駆動やデータバインディングの<br/>基礎となる重要なパターン。<br/>
      </>
    ),
    link: '/docs/observer_cs/observer_cs_index',
  },
  {
    title: 'クリーンアーキ C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶクリーンアーキテクチャ。<br/>
        依存関係のルール、4層の責務、<br/>
        テスト容易な設計を体得します。<br/>
      </>
    ),
    link: '/docs/clean_cs/clean_cs_index',
  },
  {
    title: 'CQS C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶCQS（コマンド・クエリ分離）。<br/>
        「変更するなら返さない」原則を徹底し、<br/>
        読みやすくテストしやすいコードを目指します。<br/>
      </>
    ),
    link: '/docs/cqs_cs/cqs_cs_index',
  },
  {
    title: 'CQRS C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶCQRS（コマンド・クエリ責務分離）。<br/>「読む」と「書く」の責務を明確に分け、<br/>拡張性とパフォーマンスを両立させた設計を学びます。<br/>
      </>
    ),
    link: '/docs/cqrs_cs/cqrs_cs_index',
  },
  {
    title: '不変条件 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        「正しい状態しか存在させない」設計手法を学びます。<br/>ガード節、値オブジェクト、状態遷移のガードなど、<br/>C#での実践的なパターン。<br/>
      </>
    ),
    link: '/docs/invariants_cs/invariants_cs_index',
  },
  {
    title: 'SemVer C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        セマンティックバージョニング（SemVer）と互換性ポリシーを学びます。<br/>
        C#環境でのバージョン管理、破壊的変更の判断、<br/>
        NuGetパッケージの運用まで実践的に習得。<br/>
      </>
    ),
    link: '/docs/svbc_cs/svbc_cs_index',
  },
  {
    title: '状態機械 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        「学食モバイル注文」の題材を通して、<br/>状態機械の設計と実装を詳しく学びます。<br/>if文地獄からの脱却、単体テスト、永続化まで。<br/>
      </>
    ),
    link: '/docs/state_machine_cs/state_machine_cs_index',
  },
  {
    title: 'ACL C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        腐敗防止層（ACL）の概念と実装を学びます。<br/>
        外部システムの仕様からドメインモデルを守り、<br/>
        クリーンな設計を維持する翻訳レイヤーを構築。
      </>
    ),
    link: '/docs/acl_cs/acl_cs_index',
  },
  {
    title: 'CAPの肌感覚 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        最終的整合性と分散の基本を学びます。<br/>
        「学食モバイルオーダー」を題材に、<br/>
        CAP判断から冪等性、Outboxパターンまで。<br/>
      </>
    ),
    link: '/docs/cap_cs/cap_cs_index',
  },
  {
    title: '集約と境界 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        集約（Aggregate）の設計と境界を学びます。<br/>
        整合性を保つための設計判断、不変条件の守り方、<br/>
        そして最終的整合性への橋渡しまで。
      </>
    ),
    link: '/docs/ab_tcb_cs/ab_tcb_cs_index',
  },
  {
    title: 'DbC C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        契約による設計（Design by Contract）を学びます。<br/>事前条件、事後条件、不変条件の実装と、<br/>C#での堅牢なプログラミング手法。<br/>
      </>
    ),
    link: '/docs/dbc_cs/dbc_cs_index',
  },
  {
    title: 'ES C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶイベントソーシング（ES）。<br/>
        「状態」ではなく「出来事」を積む設計。<br/>
        不変条件、Rehydrate、Projectionまで実践習得。<br/>
      </>
    ),
    link: '/docs/es_cs/es_cs_index',
  },
  {
    title: 'ドメインイベント C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        「起きた事実」を扱うドメインイベントを学びます。<br/>
        巨大メソッドの回避、関心の分離、<br/>
        そしてOutboxパターンによる信頼性の確保まで。
      </>
    ),
    link: '/docs/de_cs/de_cs_index',
  },
  {
    title: '境界づけられたコンテキスト C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        「言葉とモデルの意味が一貫する範囲」を学びます。<br/>
        境界の見つけ方、Context Mapによる関係整理、<br/>
        そしてC#による境界の保護まで。
      </>
    ),
    link: '/docs/bc_cs/bc_cs_index',
  },
  {
    title: '冪等性 (Idempotency) C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        「同じ要求が何回きても壊れない」設計を学びます。<br/>
        自然冪等、冪等キー、DB一意制約、状態遷移、<br/>
        非同期における重複排除まで。<br/>
      </>
    ),
    link: '/docs/idem_cs/idem_cs_index',
  },
  {
    title: 'Saga C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        分散システムでの長期間実行プロセス（Saga）を学びます。<br/>
        失敗時の補償トランザクション、状態管理、<br/>
        冪等性、Outboxパターンなど実践的なパターンを習得。<br/>
      </>
    ),
    link: '/docs/saga_cs/saga_cs_index',
  },
  {
    title: 'Refactoring C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        「動作を変えずに内部を良くする」技術を学びます。<br/>
        安全な手順、コードスメルの見極め、<br/>
        IDEとAIを活用した実践的な改善手法。<br/>
      </>
    ),
    link: '/docs/refactoring_cs/refactoring_cs_index',
  },
  {
    title: 'モジュラーモノリス C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        「モノリスのまま内部を分割」する設計手法を学びます。<br/>
        境界設計、Outboxパターン、ドメインイベント、<br/>
        そして冪等性まで、実践的な構成を習得。<br/>
      </>
    ),
    link: '/docs/mod_mono_cs/mod_mono_cs_index',
  },
  {
    title: 'TDD C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        テスト駆動開発（TDD）の基礎からAI活用までを学びます。<br/>
        Red/Green/Refactorの習慣、依存の分離、<br/>
        そしてBlazorでのUIテストまで、50章で徹底習得。<br/>
      </>
    ),
    link: '/docs/tdd_cs/tdd_cs_index',
  },
  {
    title: 'API Contract CS Study',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        API設計における型安全性と疎結合の学習。<br/>
        C#によるAPIコントラクトの実装例。<br/>
      </>
    ),
    link: '/docs/api_contract_cs/api_contract_cs_index',
  },
  {
    title: 'Outbox C#版',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        トランザクションアウトボックスパターンの<br/>
        概念とC#での実装方法を学びます。<br/>
        確実なメッセージ配送と整合性の確保。<br/>
      </>
    ),
    link: '/docs/outbox_cs/outbox_cs_index',
  },
  {
    title: 'テスト容易な設計 C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶテスト容易な設計。<br/>
        DI、モック、境界の設計など、<br/>
        テストしやすく保守性の高いコードを書く技術。<br/>
      </>
    ),
    link: '/docs/testable_cs/testable_cs_index',
  },
  {
    title: 'GoF C#版',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        C#で学ぶGoFデザインパターン。<br/>
        23パターンの基本から、<br/>
        .NET標準クラスや定番ライブラリでの実践まで。<br/>
      </>
    ),
    link: '/docs/gof_cs/gof_cs_index',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link to={link}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
