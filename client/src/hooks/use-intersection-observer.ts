import { useState, useEffect, useRef, RefObject } from "react";

type UseIntersectionObserverOptions = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
};

type UseIntersectionObserverReturn = {
  ref: RefObject<HTMLElement>;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
};

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0px",
  once = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setEntry(entry);

        if (entry.isIntersecting && once) {
          observer.unobserve(node);
        }
      },
      { 
        threshold, 
        root, 
        rootMargin 
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  return { ref, inView, entry };
}
