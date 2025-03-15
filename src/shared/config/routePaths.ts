import { RoutePath } from "./routeConfig";

export const getStartPath = () => RoutePath.start;
export const getLoginPath = () => RoutePath.login;
export const getRegisterPath = () => RoutePath.register;
export const getDocPagePath = (id: string) => `${RoutePath.doc}/${id}`;