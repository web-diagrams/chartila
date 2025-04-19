import { RoutePath } from "./routeConfig";
const BASE_URL = '/web-diagrams-front/';

export const getStartPath = () => BASE_URL + RoutePath.start;
export const getLoginPath = () => BASE_URL + RoutePath.login;
export const getRegisterPath = () => BASE_URL + RoutePath.register;
export const getDocsPagePath = () => BASE_URL + RoutePath.docs;
export const getDocPagePath = (id: string) => BASE_URL + `${RoutePath.doc}/${id}`;