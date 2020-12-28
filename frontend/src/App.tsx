import React from 'react';
import './App.css';
import AppRouter from './router';
import {Provider} from "react-redux";
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
