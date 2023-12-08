export default function TagElement({
  name,
  size = "text-tinysb",
}: {
  name: string;
  size?: string;
}) {
  return (
    <div className={`rounded-3xl bg-red-3 py-1 px-2 text-white ${size}`}>
      {name[0].toUpperCase() + name.slice(1)}
    </div>
  );
}
