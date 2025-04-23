import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export const useMyLinks = () => {
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/links");
      console.log(res);
      setLinks(res.data.links);
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

  const memoizedlinks = useMemo(() => links, [links]);

  return { links: memoizedlinks, loading, error };
};
