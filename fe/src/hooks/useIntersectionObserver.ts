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
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (target.current) observer.observe(target.current);
  }, [target.current, observer]);

  return target;
};

export default useIntersectionObserver;
