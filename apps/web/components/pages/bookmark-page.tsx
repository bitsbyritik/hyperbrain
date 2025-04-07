import { getAllBookmarkLinks } from "@/actions/getLinks";
import { LinksCard } from "../links-card";

export const BookmarkPage = async () => {
  const { links } = await getAllBookmarkLinks();
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
