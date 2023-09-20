import { MutableRefObject, useEffect, useState } from 'react';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const useDimensions = (
  elementRef: MutableRefObject<HTMLElement | null>
): Rect => {
  const [dimensions, setDimensions] = useState<Rect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      setDimensions(rect);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return dimensions;
};
