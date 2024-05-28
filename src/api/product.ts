import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { ICategory, IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: (data?.products as IProductItem[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(slug: string) {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.product.details(slug), fetcher);
  const memoizedValue = useMemo(
    () => ({
      product: data?.product as IProductItem,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCategories() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.category.list, fetcher);

  const memoizedValue = useMemo(
    () => ({
      categories: data?.categories as ICategory[],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
    }),
    [data?.categories, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLandingPage() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.landing, fetcher);

  const memoizedValue = useMemo(
    () => ({
      categories: (data?.categories as ICategory[]) || [],
      newProduct: (data?.newProduct as IProductItem[]) || [],
      bestSelling: (data?.bestSelling as IProductItem[]) || [],
      isLoading,
      isError: error,
      isValidating,
    }),
    [data?.categories, data?.bestSelling, data?.newProduct, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCategoryProducts(slug: string) {
  const { data, isLoading, error, isValidating } = useSWR(
    endpoints.category.details(slug),
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      categories: data?.categories as ICategory,
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.categories.products.length,
    }),
    [data?.categories, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const { data, isLoading, error, isValidating } = useSWR(
    endpoints.product.search(query),
    fetcher,
    {
      keepPreviousData: true,
      refreshInterval: 600000,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.products as IProductItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}
