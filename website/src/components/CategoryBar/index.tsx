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
 * Category link definitions.
 * Each entry maps a sidebar to its index page and display label.
 * Order matches the original navbar order.
 */
export const categories: CategoryItem[] = [
  { label: 'KISS C#版',                    sidebarId: 'kissCsSidebar',           path: '/docs/kiss_cs/kiss_cs_index' },
  { label: 'YAGNI C#版',                   sidebarId: 'yagniCsSidebar',          path: '/docs/yagni_cs/yagni_cs_index' },
  { label: 'SoC C#版',                     sidebarId: 'socCsSidebar',            path: '/docs/soc_cs/soc_cs_index' },
  { label: 'ADR C#版',                     sidebarId: 'adrCsSidebar',            path: '/docs/adr_cs/adr_cs_index' },
  { label: 'HC/LC C#版',                   sidebarId: 'hcLcCsSidebar',           path: '/docs/hc_lc_cs/hc_lc_cs_index' },
  { label: 'DRY C#版',                     sidebarId: 'dryCsSidebar',            path: '/docs/dry_cs/dry_cs_index' },
  { label: 'Refactoring C#版',             sidebarId: 'refactoringCsSidebar',    path: '/docs/refactoring_cs/refactoring_cs_index' },
  { label: 'テスト容易な設計 C#版',          sidebarId: 'testableCsSidebar',       path: '/docs/testable_cs/testable_cs_index' },
  { label: 'TDD C#版',                     sidebarId: 'tddCsSidebar',            path: '/docs/tdd_cs/tdd_cs_index' },
  { label: 'エラーモデリング C#版',          sidebarId: 'errModelCsSidebar',       path: '/docs/err_model_cs/err_model_cs_index' },
  { label: 'レイヤー C#版',                 sidebarId: 'layerCsSidebar',          path: '/docs/layer_cs/layer_cs_index' },
  { label: 'MVC C#版',                     sidebarId: 'mvcCsSidebar',            path: '/docs/mvc_cs/mvc_cs_index' },
  { label: '依存関係ルール C#版',           sidebarId: 'dpnRuleCsSidebar',        path: '/docs/dpn_rule_cs/dpn_rule_cs_index' },
  { label: 'DIP C#版',                     sidebarId: 'dipCsSidebar',            path: '/docs/dip_cs/dip_cs_index' },
  { label: 'DI C#版',                      sidebarId: 'diCsSidebar',             path: '/docs/di_cs/di_cs_index' },
  { label: 'Is-a/Has-a C#版',              sidebarId: 'isaHasaCsSidebar',        path: '/docs/isa_hasa_cs/isa_hasa_cs_index' },
  { label: 'SOLID C#版',                   sidebarId: 'solidCsSidebar',          path: '/docs/solid_cs/solid_cs_index' },
  { label: 'GoF C#版',                     sidebarId: 'gofCsSidebar',            path: '/docs/gof_cs/gof_cs_index' },
  { label: 'Observer C#版',                sidebarId: 'observerCsSidebar',       path: '/docs/observer_cs/observer_cs_index' },
  { label: 'CQS C#版',                     sidebarId: 'cqsCsSidebar',            path: '/docs/cqs_cs/cqs_cs_index' },
  { label: '状態機械 C#版',                 sidebarId: 'stateMachineCsSidebar',   path: '/docs/state_machine_cs/state_machine_cs_index' },
  { label: '不変条件 C#版',                 sidebarId: 'invariantsCsSidebar',     path: '/docs/invariants_cs/invariants_cs_index' },
  { label: 'Entity/VO C#版',               sidebarId: 'entityObjCsSidebar',      path: '/docs/entity_obj_cs/entity_obj_cs_index' },
  { label: 'DDD C#版',                     sidebarId: 'dddCsSidebar',            path: '/docs/ddd_cs/ddd_cs_index' },
  { label: '集約と境界 C#版',               sidebarId: 'abTcbCsSidebar',          path: '/docs/ab_tcb_cs/ab_tcb_cs_index' },
  { label: 'ドメインイベント C#版',          sidebarId: 'deCsSidebar',             path: '/docs/de_cs/de_cs_index' },
  { label: 'モジュラーモノリス C#版',        sidebarId: 'modMonoCsSidebar',        path: '/docs/mod_mono_cs/mod_mono_cs_index' },
  { label: 'ヘキサゴナル C#版',             sidebarId: 'hexCsSidebar',            path: '/docs/hex_cs/hex_cs_index' },
  { label: 'クリーンアーキ C#版',           sidebarId: 'cleanCsSidebar',          path: '/docs/clean_cs/clean_cs_index' },
  { label: 'ACL C#版',                     sidebarId: 'aclCsSidebar',            path: '/docs/acl_cs/acl_cs_index' },
  { label: 'API Contract CS',              sidebarId: 'apiContractCsSidebar',    path: '/docs/api_contract_cs/api_contract_cs_index' },
  { label: 'SemVer C#版',                  sidebarId: 'svbcCsSidebar',           path: '/docs/svbc_cs/svbc_cs_index' },
  { label: 'DbC C#版',                     sidebarId: 'dbcCsSidebar',            path: '/docs/dbc_cs/dbc_cs_index' },
  { label: '冪等性 C#版',                   sidebarId: 'idemCsSidebar',           path: '/docs/idem_cs/idem_cs_index' },
  { label: 'CAPの肌感覚 C#版',             sidebarId: 'capCsSidebar',            path: '/docs/cap_cs/cap_cs_index' },
  { label: 'Outbox C#版',                  sidebarId: 'outboxCsSidebar',         path: '/docs/outbox_cs/outbox_cs_index' },
  { label: 'Saga C#版',                    sidebarId: 'sagaCsSidebar',           path: '/docs/saga_cs/saga_cs_index' },
  { label: 'CQRS C#版',                    sidebarId: 'cqrsCsSidebar',           path: '/docs/cqrs_cs/cqrs_cs_index' },
  { label: 'ES C#版',                      sidebarId: 'esCsSidebar',             path: '/docs/es_cs/es_cs_index' },
  { label: '境界づけられたコンテキスト C#版', sidebarId: 'bcCsSidebar',             path: '/docs/bc_cs/bc_cs_index' },
];

/**
 * Extracts the docs folder prefix from the current path to determine
 * which category is active. e.g. "/docs/kiss_cs/kiss_cs_study_001" → "kiss_cs"
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
          // Determine if this category is active based on the current URL path
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
