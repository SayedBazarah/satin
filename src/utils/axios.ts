import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    authorization: 'CLIENT',
    'accept-language': 'en',
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
    forgot_password: '/api/auth/register',
    check_token: '/api/auth/register',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  order: {
    create: '/api/order',
  },
  product: {
    list: '/api/product/shop',
    slugs: '/api/product/slugs',
    categories_tags: '/api/product/categories-tags',
    details: (slug: string) => `/api/product/details/${slug}`,
    search: (query: string) => `/api/product/search/${query}`,
  },
  category: {
    list: '/api/category',
    details: (slug: string) => `/api/category/${slug}`,
  },
  landing: '/api/common/landing-page',
  wholesale: `/api/common/wholesale`,
};
