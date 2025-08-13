import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [
  (node: HTMLElement | null) => void,
  IntersectionObserverEntry | undefined
] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const frozen = useRef(false);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    if (frozen.current && freezeOnceVisible) return;
    setEntry(entry);
    if (entry.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }
  };

  useEffect(() => {
    if (!node || frozen.current) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [node, threshold, root, rootMargin, freezeOnceVisible]);

  return [setNode, entry];
}

// Hook for animating elements when they come into view
export function useScrollAnimation(
  options: UseIntersectionObserverOptions = {}
) {
  const [ref, entry] = useIntersectionObserver({
    ...options,
    freezeOnceVisible: true,
  });

  const isVisible = entry?.isIntersecting ?? false;

  return { ref, isVisible };
}