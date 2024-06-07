import { randomBytes } from "crypto";

export default function FilterByDate({
  changeFilterByDate,
  filterDate,
}: {
  changeFilterByDate: Function;
  filterDate: { name: string; value: number };
}) {
  let neededDates = [
    {
      name: "Today",
      value: 0,
    },
    {
      name: "Last 7 days",
      value: 7,
    },
    {
      name: "Last 30 days",
      value: 30,
    },
    {
      name: "Last 90 days",
      value: 90,
    },
    {
      name: "Last 365 days",
      value: 365,
    },
    {
      name: "Any time",
      value: 500,
    },
  ];
  let result = neededDates.map((date) => {
    return (
      <div
        key={`FilterWithRevies-${randomBytes(6).toString("hex")} w-full`}
        onClick={() => changeFilterByDate(date)}
        className={`flex flex-row gap-2 shadow-lg text-4sb filtersPadding pr-5 pl-2 w-full rounded-md border-2 border-gray-200
        cursor-pointer hover:bg-gray-800 hover:text-white duration-200 ${
          filterDate.name == date.name ? "bg-gray-800 text-white" : ""
        }`}
      >
        <p>{date.name} </p>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-1 w-full">
      <h4 className="secondary-color header-6sb">Date</h4>
      <div className="flex flex-col gap-1 sm:gap-2 w-full">{result}</div>
    </div>
  );
}
