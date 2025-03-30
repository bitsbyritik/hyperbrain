import axios from "axios";
import { useEffect, useMemo, useState } from "react";

interface CollectionsProps {
  id: string;
  name: string;
  description: string;
  image?: string;
}

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
