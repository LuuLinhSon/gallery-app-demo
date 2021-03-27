export interface StorePageType {
  isSearch: boolean;
  isPagination: boolean;
  params: { api_key: string; offset: number; limit: number; rating?: string; q?: string; lang?: string };
}

export interface ParamsStore {
  [field: string]: number | string | string[] | undefined | null;
}
