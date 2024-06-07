import ColorElement from "./ColorElement";

interface ColorElementProps {
  colors: { name: string; hex: string }[];
  setChosenColor: Function;
  chosenColor: { name: string; hex: string };
}

export default function ColorsSection({
  colors,
  setChosenColor,
  chosenColor,
}: ColorElementProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <h4 className="primary-color text-1sb ">
        Current chosen color:{" "}
        <span
          className="font-bold header-6sb"
          style={{ color: chosenColor.hex }}
        >
          ({chosenColor.name})
        </span>
      </h4>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-4">
          {colors.map((color) => (
            <ColorElement
              key={`${color.name}-${color.hex}`}
              color={color}
              setChosenColor={setChosenColor}
              chosenColor={chosenColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
