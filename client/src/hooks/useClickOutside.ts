import { useEffect } from "react";

interface ValidRefTarget {
  contains(target: EventTarget | null): unknown;
}

export const useClickOutside = (
  ref: React.RefObject<ValidRefTarget>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
