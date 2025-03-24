import { usePingQuery } from "@/app/api/pingApi";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface ServerInfo {
    isServerEnabled: boolean;
}

const ServerContext = createContext<ServerInfo>({
    isServerEnabled: false,
})

export const ServerProvide = ({ children }: PropsWithChildren) => {
    const [serverInfo, setServerInfo] = useState<ServerInfo>({ isServerEnabled: false });
    const { isError, isLoading } = usePingQuery();

    useEffect(() => {
        // Если сервер работает
        if (!isLoading && !isError) {
            setServerInfo((prev) => ({ ...prev, isServerEnabled: true }))
        }
    }, [isError]);

    if (isLoading) {
        return <p>Проверка работы сервера ...</p>
    }

    return (
        <ServerContext.Provider value={serverInfo}>
            {children}
        </ServerContext.Provider>
    );
}

export const useServer = () => useContext(ServerContext);