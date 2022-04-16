// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import routes from './router';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />}/>)}
      </Routes>
    </Router>
  )
}

export default App;
