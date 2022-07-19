import { useState, useEffect, RefObject } from "react";

export default function useIntersectionObserver(
  ref: RefObject<HTMLDivElement>
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    if (!ref.current) return;

    const IO = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    );
    IO.observe(ref.current);
    return () => {
      IO.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
