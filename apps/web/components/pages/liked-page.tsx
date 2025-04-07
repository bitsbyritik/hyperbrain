import { getAllLikedLinks } from "@/actions/getLinks";
import { LinksCard } from "../links-card";

export const LikedPage = async () => {
  const { links } = await getAllLikedLinks();
  return (
    <div>
      {Array.isArray(links) && links.length > 0 ? (
        <LinksCard links={links} />
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
};
