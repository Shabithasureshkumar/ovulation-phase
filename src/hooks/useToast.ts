import { useCallback, useEffect, useRef, useState } from 'react';

const TOAST_DURATION_MS = 3500;

/** A single transient status message; a new message replaces the current one. */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const showToast = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setMessage(text);
    timer.current = window.setTimeout(() => setMessage(null), TOAST_DURATION_MS);
  }, []);

  return { toastMessage: message, showToast };
}
