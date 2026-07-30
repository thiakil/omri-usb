import {useEffect, useState} from "react";

export function useLocalStorage<T>(defaultValue: T, storageKey: string) {
  const [storedValue, setStoredValue] = useState(()=>{
    let storedItem = localStorage.getItem(storageKey);
    if (typeof storedItem === "string") {
      try {
        return JSON.parse(storedItem) as T;
      } catch (ignored) {
      }
    }
    return defaultValue
  })
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(storedValue));
  }, [storedValue, storageKey]);

  return [storedValue, setStoredValue]
}