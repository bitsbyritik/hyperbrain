import { getBookmarklist } from "@/actions/bookmarks";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export const useAllLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const fetchLinks = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/links");
      setLinks(response.data.links);
    } catch (error) {
      console.error(error);
      setError("Error during fetching links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const memoizedLinks = useMemo(() => links, [links]);

  return { links: memoizedLinks, loading, error };
};

export const useMyLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
};
export const useBookmarkLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const fetchLinks = async () => {
    try {
      setLoading(true);

      const response = await getBookmarklist();
      console.log();
    } catch (err) {}
  };
};
export const useLikedLinks = () => {};
