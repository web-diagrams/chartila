import { Provider } from 'react-redux';
import { store } from './app/store';
import './app/styles/index.scss';
import { ReactFlowProvider } from 'reactflow';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeConfig } from './shared/config/routeConfig';
import { AuthProvider } from './app/providers/AuthProvider';
import ReactDOM from 'react-dom/client'
import { ServerProvide } from './app/providers/ServerProvider/ServerProvider.tsx';
import { ToastContainer } from 'react-toastify';

async function enableMocking() {
  // Проверяем, что мы в режиме разработки и включен режим моков
  if (process.env.MOCK_ENV !== 'mock') {
    return;
  }

  const { worker } = await import('../public/mocks/browser.ts');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <ServerProvide>
        <AuthProvider>
          <ReactFlowProvider>
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
          </ReactFlowProvider>
        </AuthProvider>
      </ServerProvide>
    </Provider>
  )
})
