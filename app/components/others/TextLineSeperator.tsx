export default function TextLineSeperator({ text }: { text: string }) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="seperator w-full"></div>
      <h5 className="duration-300 text-dark desktop-3sb primary-color">
        {text}
      </h5>
      <div className="seperator w-full"></div>
    </div>
  );
}
