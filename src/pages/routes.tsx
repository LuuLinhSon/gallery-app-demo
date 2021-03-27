import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import withLayout from '../components/layout/withLayout';
import Spinner from 'components/spinner/Spinner';
import RoutesString, { Pages } from './routesString';
import CommonLayout from 'components/layout/CommonLayout/CommonLayout';
import { ToastContainer } from 'react-toastify';
import { DURATION, POSITION } from 'constants/enum';

const Routes: React.FC = (): JSX.Element => {
  return (
    <div>
      <ToastContainer
        position={POSITION.TOP_CENTER}
        autoClose={DURATION.TOAST}
        hideProgressBar={false}
        closeButton
        closeOnClick
        pauseOnHover
        draggable={false}
        limit={1}
        style={{ height: 30 }}
      />
      <Switch>
        <Route
          path={RoutesString.Home}
          exact={true}
          component={withLayout(CommonLayout, () => (
            <Suspense fallback={<Spinner />}>
              <Pages.Home />
            </Suspense>
          ))}
        />
      </Switch>
    </div>
  );
};

export default Routes;
