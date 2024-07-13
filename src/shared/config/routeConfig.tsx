import { RouteProps } from 'react-router-dom';
import { AuthPage } from '@/pages/AuthPage';
import { MainPage } from '@/pages/MainPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    AUTH = 'auth',
    MAIN = 'main',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/',
    [AppRoutes.MAIN]: '/main',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
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
