import { DocDto } from "../types/doc";

const DB_NAME = 'diagramAppDB';
const STORE_NAME = 'files';

const openDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
  
      request.onsuccess = () => resolve((request as IDBOpenDBRequest).result);
      request.onerror = () => reject(request.error);
    });
};
  
  // Сохранение файла в IndexedDB
  export const saveFileToDB = async (fileData: DocDto, id: string) => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put({id, ...fileData});
  };
  
  // Получение файла из IndexedDB
  export const getFileFromDB = async (id: string) => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
  
    return new Promise<DocDto | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  // Удаление файла из IndexedDB
  export const deleteFileFromDB = async () => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete('lastOpenedFile');
  };