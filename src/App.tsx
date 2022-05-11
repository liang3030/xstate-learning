import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

import routes from './router';

function App() {
  return (
    <HashRouter>
      <Routes>
        {routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      </Routes>
    </HashRouter>
  )
}

export default App;
