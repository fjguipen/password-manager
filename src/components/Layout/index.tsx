import * as React from 'react';
import { withSuspense } from '../../hoc/withSuspense';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode;
  meta?: {
    title: string;
    description?: string;
  };
};

export const Layout = ({ children, meta }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        {meta?.title && <title>{t(meta.title)}</title>}
        {meta?.description && (
          <meta name="description" content={t(meta.description)} />
        )}
      </Helmet>
      <main className="workspace">{children}</main>
    </>
  );
};

export const LayoutWithSuspense = withSuspense(Layout);
