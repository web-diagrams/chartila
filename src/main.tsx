import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './app/styles/index.scss';
import { ReactFlowProvider } from 'reactflow';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeConfig } from './shared/config/routeConfig';
import { AuthProvider } from './app/providers/AuthProvider';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(
  <Provider store={store}>
    <ReactFlowProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {Object.values(routeConfig).map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <div>{route.element}</div> : route.element}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ReactFlowProvider>
  </Provider>,
);
