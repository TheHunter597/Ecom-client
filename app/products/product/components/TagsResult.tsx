import TagElement from "./TagElement";

export default function TagsResult({
  tags,
  title,
}: {
  tags: string[];
  title: string;
}) {
  let TagsResults = [];
  for (let index = 0; index < Math.min(3, tags.length); index++) {
    TagsResults.push(
      <TagElement name={tags[index]} key={`tags-${title}-${index}`} />
    );
  }

  if (tags.length > 4) {
    TagsResults.push(<TagElement name="And more" key={`tags-${title}-more`} />);
  }
  return <div className="flex flex-wrap gap-1">{TagsResults}</div>;
}
