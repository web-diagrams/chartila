import { DocDto } from "../types/doc";
import { isDraft, original } from "@reduxjs/toolkit";

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
  store.put({ id, ...fileData });
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

// Обновление файла в IndexedDB
export const updateFileInDB = async (fileData: DocDto, id: string) => {
  try {
    if (!fileData || typeof fileData !== "object") {
      console.error("Invalid fileData:", fileData);
      return;
    }
    if (!id) {
      console.error("Invalid id:", id);
      return;
    }

    // Убираем Proxy от Immer
    let cleanFileData = fileData;
    if (isDraft(fileData)) {
      cleanFileData = original(fileData) || fileData;
    }

    // Дополнительная проверка на сериализуемость
    cleanFileData = JSON.parse(JSON.stringify(cleanFileData));

    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put({ id, ...cleanFileData });

    console.log(`File with id ${id} updated in IndexedDB`);
  } catch (error) {
    console.error("Error updating file in IndexedDB:", error);
  }
};

// Удаление файла из IndexedDB
export const deleteFileFromDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete('lastOpenedFile');
};