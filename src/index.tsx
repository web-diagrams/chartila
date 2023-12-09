import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
        ]
    },
]);

container.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)