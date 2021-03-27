// import databases from '../../cache';
import databases from 'cache';
import { createStore, createHook, StoreActionApi, createContainer } from 'react-sweet-state';
import { FavouritesState, ImageGiphy } from './favouritesStore.d';

export const FAVOURITES_STORE = 'StoreFavourites';
type StoreFavourites = StoreActionApi<FavouritesState>;
type Actions = typeof actions;

export const initialState: FavouritesState = {
  initiated: false,
  dataFavourites: [],
};

export const actions = {
  addImageToFavourites: (image: ImageGiphy) => ({ setState, getState }: StoreFavourites) => {
    const preState = getState();
    setState({
      ...preState,
      dataFavourites: [
        ...preState.dataFavourites,
        {
          ...image,
        },
      ],
    });
  },
  removeImageFromFavourites: (image: ImageGiphy) => ({ setState, getState }: StoreFavourites) => {
    const preState = getState();
    const newdataFavourites = preState.dataFavourites.filter((item) => item.id !== image.id);
    setState({
      ...preState,
      dataFavourites: [...newdataFavourites],
    });
  },
  removeAllImageFromFavourites: () => async ({ setState }: StoreFavourites) => {
    setState({ ...initialState });
    await databases.removeItem(storeKey);
  },
};

export const Store = createStore<FavouritesState, Actions>({
  initialState,
  actions,
  name: FAVOURITES_STORE,
});

const useFavourites = createHook(Store);

export const storeKey = `${Store.key.join('__')}@__global__`;

type StoreContainerProps = {
  initialState: any;
};
export const FavouritesContainer = createContainer<FavouritesState, Actions, StoreContainerProps>(Store, {
  onInit: () => ({ setState }: StoreFavourites, { initialState }) => {
    setState({ ...initialState });
  },
});

export default useFavourites;
