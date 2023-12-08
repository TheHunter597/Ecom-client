export default function SmallDots({
  number,
  currentActive,
  setCurrentActive,
}: {
  number: number;
  currentActive: number;
  setCurrentActive: Function;
}) {
  if (number === currentActive) {
    return (
      <div className="w-3 h-3 rounded-2xl bg-red-600 cursor-pointer"></div>
    );
  } else {
    return (
      <div
        className="w-3 h-3 rounded-2xl border-2 border-gray-600 cursor-pointer"
        onClick={() => {
          setCurrentActive(number);
        }}
      ></div>
    );
  }
}
