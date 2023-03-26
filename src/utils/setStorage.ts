import { LocalStorageKeys } from "../hooks/useLocalStorage";
import { getStorage } from "./getStorage";

export function setStorage<T>(
    key:LocalStorageKeys, 
    value:T | ((currStorage: T) => T)
) {
    let newValue = value
    const currStorage = getStorage<T>(key)
    if(typeof value === "function") {
        newValue = (value as (currStorage: T | null) => T)(currStorage) 
    } 
    localStorage.setItem(key, JSON.stringify(newValue))
}