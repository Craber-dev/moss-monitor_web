import React, { Suspense } from 'react';
import { RouteItem, ROUTE_CONFIG } from './route';
import { Routes, Route, Navigate } from 'react-router-dom';

function renderRoute(route: RouteItem) {
  return (
    <Route
      key={route.path}
      path={route.children ? route.path + '/*' : route.path}
      element={(() => {
        const { redirect, layout: Layout, children, component: Component } = route;
        if (redirect) {
          return (<Navigate to={redirect} />);
        } else {
          const childrenNode = children ? (<Routes>{children.map(renderRoute)}</Routes>) : (Component && (<Component />));
          if (Layout) {
            return (<Layout>{ childrenNode }</Layout>);
          } else {
            return childrenNode;
          }
        }
      })()}
    />
  );
}

function RouterController() {
  const RouterDom = ROUTE_CONFIG.map(renderRoute);
  return (
    <Suspense fallback={(<h2>Loading...</h2>)}>
      <Routes>
        { RouterDom }
      </Routes>
    </Suspense>
  );
}

export default React.memo(RouterController);
