import React from 'react';
import styles from './App.module.less';
import { BrowserRouter } from 'react-router-dom';
import RouterController from './Router';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <RouterController />
      </BrowserRouter>
    </div>
  );
}

export default App;
