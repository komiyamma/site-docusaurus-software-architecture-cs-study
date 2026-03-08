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
 * Extracts the docs folder prefix from the current path.
 * e.g. "/docs/kiss_cs/kiss_cs_study_001" → "kiss_cs"
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
      {/* Category links section */}
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

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Original navbar items (komiyamma.net, GitHub, etc.) */}
      <PrimaryMenu {...props} />
    </>
  );
}
