import { createRoot } from "react-dom/client";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";
import { store } from "./app/store";
import './app/styles/index.scss'

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

container.render(
    <Provider store={store}>
        <Main />
    </Provider>
)