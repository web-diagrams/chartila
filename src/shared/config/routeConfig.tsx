import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import StartWindow from '@/components/StartWindow/StartWindow';
import { LoginForm } from '@/components/AuthComponents/LoginForm/LoginForm';
import { RegisterForm } from '@/components/AuthComponents/RegisterForm/RegisterForm';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    START = 'start',
    LOGIN = 'login',
    REGISTER = 'register',
    MAIN = 'main',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.START]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.MAIN]: '/main',
    // последний
    [AppRoutes.NOT_FOUND]: '/*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.START]: {
        path: RoutePath.start,
        element: <StartWindow />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginForm />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterForm />,
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <div>Not found</div>,
    },
};
