import { defaults, StoreState } from 'react-sweet-state';

import database from '../../cache/';
import { FAVOURITES_STORE } from '../Favourites/favouritesStore';
import { STORE_NAME } from '../../api/storeAPI';

const WHITE_LIST = [STORE_NAME, FAVOURITES_STORE];

const persistent = (storeState: StoreState<any>) => (next: any) => (fn: any) => {
  const result = next(fn);
  const { key } = storeState;
  const isWhiteList: string[] = WHITE_LIST.filter((store) => key.includes(store));
  if (isWhiteList.length > 0) {
    const state = storeState.getState();
    database.setItem(storeState.key, state).catch((err: Error) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
  }

  return result;
};

defaults.middlewares.add(persistent);
