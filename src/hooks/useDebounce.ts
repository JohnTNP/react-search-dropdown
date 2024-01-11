import { useEffect, useRef, useState } from 'react';

function useDebounce(value: string | undefined, delay: number): string {
    const [debounceValue, setDebounceValue] = useState(value);
    const timerRef = useRef<number>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebounceValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debounceValue ? debounceValue : '';
}

export { useDebounce };
