// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  Root: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  root: '/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  about: `/about`,
  contact: `/contact`,
  faqs: `/faqs`,
  shop: `/shop`,
  wholesale: `/wholesale`,
  categories: `/categories`,
  tag: {
    root: `/tags`,
    single: (id: string) => `/tags/${id}`,
  },
  category: {
    root: `/categories`,
    single: (id: string) => `/categories/${id}`,
  },

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/jwt/login`,
    register: `${ROOTS.AUTH}/jwt/register`,
    forgot: `${ROOTS.AUTH}/jwt/forgot-password`,
    token_expired: `${ROOTS.AUTH}/jwt/forgot-password`,
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  product: {
    root: ROOTS.Root,
    checkout: `/checkout`,
    details: (slug: string) => `/shop/${slug}`,
  },
};
