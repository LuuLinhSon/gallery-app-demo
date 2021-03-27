import { createStore, createHook, StoreActionApi } from 'react-sweet-state';

import { StorePageType, ParamsStore } from './commonPageStore.d';

export const PAGE_STORE = 'StorePage';

type StorePage = StoreActionApi<StorePageType>;
type Action = typeof actions;

export const defaultOffset = 0;
export const defaultLimit = 8;

export const initialParams = {
  offset: 0,
  limit: 8,
  q: '',
  lang: 'en',
  rating: 'g',
  api_key: 'wgXAgR3UB4bCcZ5nYF0JcGOo6UHhtYxw',
};

export const initialState: StorePageType = {
  isSearch: false,
  isPagination: false,
  params: initialParams,
};

export const actions = {
  setPagination: (offset: number) => ({ setState, getState }: StorePage) => {
    const preState = getState();
    setState({
      ...preState,
      params: {
        ...preState.params,
        offset,
      },
    });
  },
  setSearching: (isSearch: boolean = false, params: ParamsStore = {}) => ({ setState, getState }: StorePage) => {
    const preState = getState();
    setState({
      ...preState,
      params: {
        ...preState.params,
        offset: defaultOffset,
        limit: defaultLimit,
        ...params,
      },
      isSearch,
    });
  },
};

export const store = createStore<StorePageType, Action>({
  initialState,
  actions,
  name: PAGE_STORE,
});

const usePage = createHook(store);

export default usePage;
