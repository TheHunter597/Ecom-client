import { useRef, useState } from "react";

export default function MakeSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  let mainDev = useRef<HTMLDivElement>(null);
  const [currentScrollState, setCurrentScrollState] = useState({
    isDragging: false,
    startMouseX: 0,
    endMouseX: 0,
    startScrollLeft: 0,
  });

  return (
    <div
      className={`w-12/12 mx-3 m-auto py-1 relative h-fit `}
      onMouseMove={(e) => {
        setCurrentScrollState({
          ...currentScrollState,
          endMouseX: e.clientX,
        });
        if (Math.abs(e.clientX - currentScrollState.startMouseX) < 5) {
          return;
        }
        if (currentScrollState.isDragging) {
          mainDev.current!.scrollLeft =
            currentScrollState.startScrollLeft -
            (e.clientX - currentScrollState.startMouseX);
        }
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        setCurrentScrollState({
          ...currentScrollState,
          isDragging: false,
        });
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        setCurrentScrollState({
          ...currentScrollState,
          isDragging: true,
          startMouseX: e.clientX,
          startScrollLeft: mainDev.current!.scrollLeft,
        });
      }}
    >
      <div
        className="relative w-full overflow-x-auto hideScrollBar"
        ref={mainDev}
      >
        <div className="grid grid-flow-col gap-6 w-fit h-fit overflow-x-hidden mx-2 overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
