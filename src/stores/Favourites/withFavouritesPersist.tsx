import { FC, ComponentType, useState, useLayoutEffect } from 'react';

import databases from '../../cache';
import { FavouritesContainer, storeKey, initialState as initialStoreState } from './favouritesStore';

const withFavouritesPersist = <P extends object>(Component: ComponentType<P>): FC<P> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);

  useLayoutEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey).catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
      if (data) {
        setStorePersisted({
          ...data,
          initiated: true,
        });
      } else {
        setStorePersisted({
          ...initialStoreState,
          initiated: true,
        });
      }
    })();
  }, []);
  if (storePersisted && !storePersisted.initiated) return null;
  return (
    <FavouritesContainer isGlobal initialState={storePersisted}>
      <Component {...(props as P)} />
    </FavouritesContainer>
  );
};

export default withFavouritesPersist;
