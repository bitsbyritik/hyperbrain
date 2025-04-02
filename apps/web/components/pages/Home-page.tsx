"use client";

import { useLinks } from "@/hooks/useLinks";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { Card, CardTitle } from "@workspace/ui/components/card";
import {
  Bookmark,
  Link as LinkIcon,
  EllipsisVertical,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import { handleBookmark } from "@/actions/bookmarks";
import { useEffect, useState } from "react";
import { handleLike } from "@/actions/likes";

export const HomeLandingPage = () => {
  const { links, loading } = useLinks();
  const [bookmarkedList, setBookmarkedList] = useState(new Set());
  const [likedList, setLikedList] = useState(new Set());

  useEffect(() => {
    if (links) {
      setBookmarkedList(
        new Set(
          links
            ?.filter((link) => link.bookmark?.length > 0)
            .map((link) => link.id),
        ),
      );

      setLikedList(
        new Set(
          links?.filter((link) => link.like?.length > 0).map((link) => link.id),
        ),
      );
    }
  }, [links]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleBookmark = async (linkId: string) => {
    try {
      await handleBookmark({ linkId });

      setBookmarkedList((prev) => {
        const newBookmarks = new Set(prev);
        if (newBookmarks.has(linkId)) {
          newBookmarks.delete(linkId);
        } else {
          newBookmarks.add(linkId);
        }

        return newBookmarks;
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update bookmark");
    }
  };

  const toggleLike = async (linkId: string) => {
    try {
      await handleLike({ linkId });

      setLikedList((prev) => {
        const newLike = new Set(prev);
        if (newLike.has(linkId)) {
          newLike.delete(linkId);
        } else {
          newLike.add(linkId);
        }

        return newLike;
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to like");
    }
  };

  console.log(links);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:grid-cols-5">
      {Array.isArray(links) && links.length > 0 ? (
        links.map((link) => (
          <Card key={link.id} className="p-4 group">
            <CardTitle className="flex flex-row gap-2 justify-between">
              <Avatar className="items-start">
                <AvatarImage
                  src={link.metadata?.favicon || "/favicon.ico"}
                  alt="Favicon"
                />
              </Avatar>
              <div className="flex flex-row gap-4 opacity-0 group-hover:opacity-100">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="fill-white" />
                </a>
                <EllipsisVertical />
              </div>
            </CardTitle>
            <div className="my-2 font-medium line-clamp-2 text-ellipsis overflow-hidden h-12">
              <span>
                {link.metadata?.open_graph?.title ||
                  link.title ||
                  "No title available"}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 text-ellipsis overflow-hidden h-14">
              {link.metadata?.description || "No description available."}
            </p>
            <div className="p-4 w-full relative h-44">
              <Image
                src={
                  link.metadata?.open_graph?.images?.[0]?.url.replace(
                    /['"]+/g,
                    "",
                  ) ||
                  link.metadata?.favicon ||
                  "/favicon.ico"
                }
                alt="Image"
                unoptimized
                fill
                loading="lazy"
                className="rounded-xl mt-4 object-cover"
              />
            </div>
            <div className="relative flex mt-4 px-2 pt-4 justify-between text-gray-600">
              <Heart
                className={`cursor-pointer ${likedList.has(link.id) ? "fill-red-700 text-red-700 hover:text-red-600 hover:fill-red-600" : "hover:text-foreground"}`}
                onClick={() => {
                  toggleLike(link.id);
                }}
              />
              <Bookmark
                className={`hover:text-foreground cursor-pointer ${bookmarkedList.has(link.id) ? "fill-current" : ""}`}
                onClick={() => {
                  toggleBookmark(link.id);
                }}
              />
              <Share2 className="hover:text-foreground" />
              <LinkIcon
                className="hover:text-foreground"
                onClick={() => {
                  copy(link.url);
                  toast.info("Copied to Clipboard!");
                }}
              />
            </div>
          </Card>
        ))
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
};
