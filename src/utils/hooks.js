import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

// --- REF --- https://gist.github.com/Haraldson/8bdee011b10fdaf746787585a79e91ce
const useDebounceDefaultOptions = { leading: false, trailing: true };

export const useDebounce = (
  defaultValue,
  delay = 500,
  options = useDebounceDefaultOptions
) => {
  const [value, setValueImmediately] = useState(defaultValue);
  const [debouncing, setDebouncing] = useState(false);
  const [signal, setSignal] = useState(Date.now());

  const triggerUpdate = useCallback(
    debounce(
      () => {
        setDebouncing(false);
        setSignal(Date.now());
      },
      delay,
      options
    ),
    []
  );

  const setValue = useCallback((_value) => {
    setValueImmediately(_value);
    setDebouncing(true);
    triggerUpdate();
  }, []);

  return [
    value,
    setValue,
    {
      signal,
      debouncing,
    },
  ];
};
