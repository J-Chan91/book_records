import { useEffect, useState } from "react";

/**
 * 연이어 호출되는 함수에서 딜레이를 줘 최근에 호출된 함수만 호출하도록 하는 기능
 * @param value 값
 * @param delay 딜레이, 기본값은 500ms
 */
export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
