'use client';

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function Layout({ children, params: { locale } }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
