import { useState, useEffect, useRef } from 'react';

const useOutsideClick = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return [isOpen, setIsOpen, ref] as const;
};

export default useOutsideClick;
