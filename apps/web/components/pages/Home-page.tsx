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

export const HomeLandingPage = () => {
  const { links, loading } = useLinks();

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <Heart className="hover:text-foreground " />
              <Bookmark className="hover:text-foreground" />
              <Share2 className="hover:text-foreground" />
              <LinkIcon className="hover:text-foreground" />
            </div>
          </Card>
        ))
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
};
