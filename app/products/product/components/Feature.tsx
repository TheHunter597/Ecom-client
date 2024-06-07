export default function Feature({
  feature: { name, description },
  index,
  length,
}: {
  feature: {
    name: string;
    description: string;
  };
  index: number;
  length: number;
}) {
  return (
    <div className="hover:bg-gray-200 px-1 pt-1">
      <h6>
        <span className="text-3sb secondary-color">{name}</span>:{" "}
        <span className="text-dark text-4r">{description}</span>
      </h6>
      {length - 1 != index && (
        <div className="FeaturesLine light-gray-background-color"></div>
      )}
    </div>
  );
}
