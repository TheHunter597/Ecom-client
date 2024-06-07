export default function SizeElement({
  size,
  setChosenSize,
  chosenSize,
}: {
  size: {
    name: string;
    abbreviation: string;
  };
  setChosenSize?: Function;
  chosenSize?: {
    name: string;
    abbreviation: string;
  };
}) {
  return (
    <span
      key={`${size.name}-${size.abbreviation}`}
      className={`py-1 px-3 rounded-md flex flex-col items-center justify-center 
             cursor-pointer hover:scale-105 duration-150 border-2 border-gray-300
             ${
               chosenSize?.name == size.name
                 ? "bg-gray-900 text-white primary-border-color "
                 : " primary-color"
             }`}
      onClick={() => {
        if (setChosenSize) setChosenSize(size);
      }}
    >
      {size.abbreviation}
    </span>
  );
}
