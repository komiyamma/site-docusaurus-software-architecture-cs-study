import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const fs = require('fs');
const path = require('path');

/**
 * Custom function to generate sidebar items from a directory.
 * It enforces that files ending with '_index.md' appear first in the list.
 */
function generateProjectSidebar(dirName: string) {
  const docsPath = path.join(__dirname, 'docs', dirName);

  if (!fs.existsSync(docsPath)) {
    console.warn(`Warning: Docs directory not found: ${docsPath}`);
    return [];
  }

  const files = fs.readdirSync(docsPath)
    .filter(file => file.endsWith('.md'))
    .sort((a, b) => {
      // Prioritize files containing '_index'
      const aIsIndex = a.includes('_index');
      const bIsIndex = b.includes('_index');

      if (aIsIndex && !bIsIndex) return -1;
      if (!aIsIndex && bIsIndex) return 1;

      return a.localeCompare(b);
    });

  return files.map(file => {
    const id = `${dirName}/${file.replace(/\.md$/, '')}`;
    return {
      type: 'doc' as const,
      id: id,
    };
  });
}

// Helper for DDD which uses manual grouping
function generateStudyIds(folder: string, prefix: string, start: number, end: number): string[] {
  const ids: string[] = [];
  for (let i = start; i <= end; i++) {
    const idStr = i.toString().padStart(3, '0');
    const id = `${folder}/${prefix}_study_${idStr}`;
    const filePath = path.join(__dirname, 'docs', `${id}.md`);
    if (fs.existsSync(filePath)) {
      ids.push(id);
    }
  }
  return ids;
}

function generateSidebarItems(folder: string, prefix: string, modules: { title?: string; start: number; end: number }[]) {
  return modules.flatMap(mod => {
    const items = generateStudyIds(folder, prefix, mod.start, mod.end);

    // If title is provided, create a Category (Folder)
    if (mod.title) {
      return [{
        type: 'category' as const,
        label: mod.title,
        items: items,
      }];
    }

    // If no title, expand as Flat Docs (No Folder)
    return items.map(id => ({
      type: 'doc' as const,
      id: id,
    }));
  });
}



const dddModules = [
  { title: "第1部：【そもそも設計とは何か？】なぜコードを書く前に考えるのか", start: 1, end: 10 },
  { title: "第2部：【DDDの大きな枠組み】万能ではない「道具」の使い所", start: 11, end: 20 },
  { title: "第3部：【戦略的設計】AIに「このアプリの正解」を教える", start: 21, end: 35 },
  { title: "第4部：【設計の基礎力：戦術】AIを暴走させない「型」の作り方", start: 36, end: 55 },
  { title: "第5部：【アーキテクチャ】1人のスピードを最大化する構造", start: 56, end: 75 },
  { title: "第6部：【DDD以外の選択肢と割り切り】現実的な設計者へ", start: 76, end: 90 },
  { title: "第7部：【継続と成長】AI時代に生き残る設計者になる", start: 91, end: 100 },
];



/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {



  entityObjCsSidebar: generateProjectSidebar('entity_obj_cs'),

  dryCsSidebar: generateProjectSidebar('dry_cs'),

  dddCsSidebar: [
    {
      type: 'doc',
      id: 'ddd_cs/ddd_cs_index',
    },
    ...generateSidebarItems('ddd_cs', 'ddd_cs', dddModules),
  ],

  adrCsSidebar: generateProjectSidebar('adr_cs'),
  yagniCsSidebar: generateProjectSidebar('yagni_cs'),
  kissCsSidebar: generateProjectSidebar('kiss_cs'),
  solidCsSidebar: generateProjectSidebar('solid_cs'),
  socCsSidebar: generateProjectSidebar('soc_cs'),
  hcLcCsSidebar: generateProjectSidebar('hc_lc_cs'),
  mvcCsSidebar: generateProjectSidebar('mvc_cs'),
  diCsSidebar: generateProjectSidebar('di_cs'),
  dipCsSidebar: generateProjectSidebar('dip_cs'),
  isaHasaCsSidebar: generateProjectSidebar('isa_hasa_cs'),
  hexCsSidebar: generateProjectSidebar('hex_cs'),

  dpnRuleCsSidebar: generateProjectSidebar('dpn_rule_cs'),

  layerCsSidebar: generateProjectSidebar('layer_cs'),

  errModelCsSidebar: generateProjectSidebar('err_model_cs'),

  observerCsSidebar: generateProjectSidebar('observer_cs'),

  cleanCsSidebar: generateProjectSidebar('clean_cs'),

  cqsCsSidebar: generateProjectSidebar('cqs_cs'),
  cqrsCsSidebar: generateProjectSidebar('cqrs_cs'),
  invariantsCsSidebar: generateProjectSidebar('invariants_cs'),

  svbcCsSidebar: generateProjectSidebar('svbc_cs'),
  stateMachineCsSidebar: generateProjectSidebar('state_machine_cs'),

  aclCsSidebar: generateProjectSidebar('acl_cs'),
  capCsSidebar: generateProjectSidebar('cap_cs'),
  abTcbCsSidebar: generateProjectSidebar('ab_tcb_cs'),
  dbcCsSidebar: generateProjectSidebar('dbc_cs'),
  esCsSidebar: generateProjectSidebar('es_cs'),
  deCsSidebar: generateProjectSidebar('de_cs'),

  bcCsSidebar: generateProjectSidebar('bc_cs'),
};

export default sidebars;
