import { useRef, useState } from "react";

export default function SlideableElement({
  functionToRun,
  children,
}: {
  functionToRun: Function;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementPointerCurrentX, setElementPointerCurrentX] =
    useState<number>(0);
  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        setElementPointerCurrentX(e.clientX);
      }}
      onMouseUp={(e) => {
        if (Math.abs(elementPointerCurrentX - e.clientX) < 10) {
          functionToRun();
        }
      }}
    >
      {children}
    </div>
  );
}
