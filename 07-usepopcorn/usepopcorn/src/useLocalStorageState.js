import { useEffect, useState } from "react";


export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    const items = JSON.parse(storedValue);
    return items ? items : initialState;
  });



  useEffect(function () {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
