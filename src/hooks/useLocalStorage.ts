import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        // The item should be parsed as JSON. If item is not null, it should be a valid JSON string.
        return item ? JSON.parse(JSON.stringify(item)) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Make sure to stringify the value when setting it in localStorage.
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
