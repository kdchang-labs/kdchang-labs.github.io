/**
 * Ejected from @docusaurus/theme-classic (MIT); same as ai.kdchang.com.
 *
 * Only addition: a last column holding the language selector. It cannot go
 * through `themeConfig.footer.links`, because footer items are static links or
 * raw HTML, and the locale links have to be computed from the current path so
 * that each one points at the same page in the other locale.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import LinkItem from '@theme/Footer/LinkItem';
import type {Props} from '@theme/Footer/Links/MultiColumn';
import LocaleSwitcher from '@site/src/components/LocaleSwitcher';

type ColumnType = Props['columns'][number];
type ColumnItemType = ColumnType['items'][number];

function ColumnLinkItem({item}: {item: ColumnItemType}) {
  return item.html ? (
    <li
      className={clsx('footer__item', item.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: item.html}}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({column}: {column: ColumnType}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        column.className,
      )}>
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

function LanguageColumn() {
  return (
    <div
      className={clsx(ThemeClassNames.layout.footer.column, 'col footer__col')}>
      <div className="footer__title">
        {translate({
          id: 'footer.language.label',
          message: '語言',
          description: 'The title of the footer language column',
        })}
      </div>
      <LocaleSwitcher />
    </div>
  );
}

export default function FooterLinksMultiColumn({columns}: Props): ReactNode {
  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
      <LanguageColumn />
    </div>
  );
}
