import { useEffect, useState } from "react";

/**
 * Debounce hooks
 * @param value - 입력받는 문자열
 * @param delay - 딜레이가 걸리는 시간(ms)
 * @returns 디바운싱되어 입력받은 문자열결과
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
