import { getMyLinks } from "@/actions/getLinks";
import { LinksCard } from "../links-card";

export const HomeLandingPage = async () => {
  const { links } = await getMyLinks();
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
