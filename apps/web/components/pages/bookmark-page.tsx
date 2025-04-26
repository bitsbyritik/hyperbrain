import { getAllBookmarkLinks } from "@/actions/getLinks";
import { LinksCard } from "../links-card";

export const BookmarkPage = async () => {
  const { links } = await getAllBookmarkLinks();
  return (
    <div className="flex flex-col gap-4 ">
      <div className="text-2xl font-bold mb-4">Bookmarks</div>
      {Array.isArray(links) && links.length > 0 ? (
        <LinksCard links={links} />
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
};
