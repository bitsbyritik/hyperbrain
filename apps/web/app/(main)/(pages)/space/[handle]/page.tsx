export default function HandlePage({ params }: { params: { handle: string } }) {
  const { handle } = params;

  return <div>@{handle}</div>;
}
