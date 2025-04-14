import { getAllLikedLinks } from "@/actions/getLinks";
import { LinksCard } from "../links-card";

export const LikedPage = async () => {
  const { links } = await getAllLikedLinks();
  return (
    <div className="flex flex-col gap-4 ">
      <div className="text-2xl font-bold mb-4">My Picks</div>
      {Array.isArray(links) && links.length > 0 ? (
        <LinksCard links={links} />
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
};
