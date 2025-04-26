import { SpacePage } from "@/components/pages/space-page";

export default function HandlePage({ params }: { params: { handle: string } }) {
  const { handle } = params;

  return (
    <div className="p-4">
      <SpacePage spaceHandle={handle} />
    </div>
  );
}
