import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Suspense} from "react";
import Flow from "./Flow";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = document.getElementById('root')

if(!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Flow />,
        children: [
        ]
    },
]);

container.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)