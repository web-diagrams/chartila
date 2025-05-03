import { RouteProps } from 'react-router-dom';
import StartWindow from '@/components/StartWindow/ui/StartWindow/StartWindow';
import { LoginForm } from '@/components/AuthComponents/ui/LoginForm/LoginForm';
import { RegisterForm } from '@/components/AuthComponents/ui/RegisterForm/RegisterForm';
import { DocPage } from '@/pages/DocPage';
import { getDocPagePath, getDocsPagePath, getLoginPath, getRegisterPath, getStartPath } from './routePaths';
import { DocsPage } from '@/pages/DocsPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    START = 'start',
    LOGIN = 'login',
    REGISTER = 'register',
    DOCS = 'docs',
    DOC = 'doc',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.START]: '',
    [AppRoutes.LOGIN]: 'login',
    [AppRoutes.REGISTER]: 'register',
    [AppRoutes.DOCS]: 'docs',
    [AppRoutes.DOC]: 'doc',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
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
    [AppRoutes.DOCS]: {
        path: getDocsPagePath(),
        element: <DocsPage />,
    },
    [AppRoutes.DOC]: {
        path: getDocPagePath(':docId'),
        element: <DocPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <div>Not found</div>,
    },
};
