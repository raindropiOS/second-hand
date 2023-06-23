import { useEffect, useRef } from 'react';

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = defaultOptions
) => {
  const target = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (target.current) {
      observer.current = new IntersectionObserver(callback, options);
      observer.current.observe(target.current);
    }
  }, [target.current, callback, options]);

  return target;
};

export default useIntersectionObserver;
