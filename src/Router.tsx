import React, { Suspense, useMemo } from 'react';
import { RouteItem, ROUTE_CONFIG } from './route';
import { Routes, Route, Navigate } from 'react-router-dom';

import styles from './App.module.less';

function renderRoute(route: RouteItem) {
  return (
    <Route
      key={route.path}
      path={route.path}
      element={route.redirect ? (<Navigate to={route.redirect} />) : (
        <>
          <div className={styles.body}>
            {route.layout ? (
              <route.layout>
                { route.component }
              </route.layout>
            ) : (
              route.component && <route.component />
            )}
          </div>
        </>
      )}
    />
  );
}

function RouterController() {
  const RouterDom = useMemo(() => {
    return Object.values(ROUTE_CONFIG).map(renderRoute);
  }, []);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        {RouterDom}
      </Routes>
    </Suspense>
  );
}

export default React.memo(RouterController);
