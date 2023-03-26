import { LocalStorageKeys } from "../hooks/useLocalStorage";

export function getStorage<T>(key:LocalStorageKeys) {
    const value = localStorage.getItem(key)
    if(value) return JSON.parse(value) as T 
    else return null 
}