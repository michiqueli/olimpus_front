import { useDebugValue, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(initialState);
  useDebugValue(state);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse<T>(item));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

function parse<T>(obj: string): T {
  try {
    return JSON.parse(obj) as T;
  } catch {
    return {} as T;
  }
}
