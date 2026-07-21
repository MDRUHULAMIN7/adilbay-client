import { useState, useCallback } from 'react';

export function useToggle(defaultValue = false): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}
