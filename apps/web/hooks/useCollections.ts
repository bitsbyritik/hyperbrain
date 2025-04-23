import { useEffect, useMemo, useState } from "react";
import { useMyLinks } from "./useLinks";
import { slugify } from "@/lib/slugify";
import axios from "axios";

interface CollectionsProps {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export const useCollectionLinks = ({ curr }: { curr: string }) => {
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const myLinks = useMyLinks();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (curr === "All") {
          console.log(myLinks.links);
          setLinks(myLinks.links);
        } else {
          const slug = slugify(curr);
          const res = await axios.get("/api/collections", {
            params: {
              slug: slug,
            },
          });

          setLinks(res.data.links[0] ?? {});

          console.log("res", res.data.links);
        }
      } catch (err) {
        setError(err?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [curr, myLinks.links]);

  const memoizedlinks = useMemo(() => links, [links]);

  return { links: memoizedlinks, loading, error };
};

export const useCollections = () => {
  const [collections, setCollections] = useState<CollectionsProps[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/collections");

      const filteredCollections = response.data.collections.map(
        ({ id, name, description, image }: CollectionsProps) => ({
          id,
          name,
          description,
          image,
        }),
      );

      setCollections(filteredCollections);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch Collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const memoizdCollection = useMemo(() => collections, [collections]);

  return { collections: memoizdCollection, loading, error };
};
