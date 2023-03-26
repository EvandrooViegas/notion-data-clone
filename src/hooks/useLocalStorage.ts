import { useEffect, useState } from "react"

export type LocalStorageKeys = "views" | "functions"
export default function useLocalStorage<T>(key:LocalStorageKeys, initialValue: T)
:[ T, React.Dispatch<React.SetStateAction<T>> ] {
    
    const [state, setState] = useState<T>(() => {
        const json = localStorage.getItem(key)
        if(json == null) {
            if(typeof initialValue === "function") return (initialValue as () => T)()
        } else {
            return JSON.parse(json)
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
}