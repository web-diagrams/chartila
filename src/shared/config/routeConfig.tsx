import { RouteProps } from 'react-router-dom';
import StartWindow from '@/components/StartWindow/StartWindow';
import { LoginForm } from '@/components/AuthComponents/ui/LoginForm/LoginForm';
import { RegisterForm } from '@/components/AuthComponents/ui/RegisterForm/RegisterForm';
import { DocPage } from '@/pages/DocPage';
import { getDocPagePath, getLoginPath, getRegisterPath, getStartPath } from './routePaths';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    START = 'start',
    LOGIN = 'login',
    REGISTER = 'register',
    DOC = 'doc',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.START]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.DOC]: '/doc',
    // последний
    [AppRoutes.NOT_FOUND]: '/*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.START]: {
        path: getStartPath(),
        element: <StartWindow />,
    },
    [AppRoutes.LOGIN]: {
        path: getLoginPath(),
        element: <LoginForm />,
    },
    [AppRoutes.REGISTER]: {
        path: getRegisterPath(),
        element: <RegisterForm />,
    },
    [AppRoutes.DOC]: {
        path: getDocPagePath(':id'),
        element: <DocPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <div>Not found</div>,
    },
};
