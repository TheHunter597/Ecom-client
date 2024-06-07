import SizeElement from "./SizeElement";

interface SizesSectionProps {
  sizes: { abbreviation: string; name: string }[];
  setChosenSize: Function;
  chosenSize: { abbreviation: string; name: string };
  productId: string;
}

export default function SizesSection({
  sizes,
  setChosenSize,
  chosenSize,
  productId,
}: SizesSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="primary-color text-1sb ">
        Current chosen size:{" "}
        <span className="font-bold text-2sb  secondary-color ">
          ({chosenSize?.name})
        </span>
      </h4>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-4">
          {sizes.map((size) => (
            <SizeElement
              size={size}
              setChosenSize={setChosenSize}
              chosenSize={chosenSize}
              key={`size-${size.abbreviation}-${productId}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
