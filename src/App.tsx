import React from 'react';
import withFavouritesPersist from 'stores/Favourites/withFavouritesPersist';
import Routes from './pages/routes';
import './stores/middlewares/persistent';

export const App: React.FC = () => {
  return <Routes />;
};

export default withFavouritesPersist(App);
