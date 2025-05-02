"use client";

import * as React from "react";
import {
  CirclePlusIcon,
  FolderIcon,
  HelpCircleIcon,
  HomeIcon,
  Link,
  Sparkles,
  Heart,
  Bookmark,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { NavMain } from "@workspace/ui/components/nav-main";
import { NavSecondary } from "@workspace/ui/components/nav-secondary";
import { NavUser } from "@workspace/ui/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { useSession } from "@/lib/auth-client";
import { redirect, usePathname } from "next/navigation";
import { NavCollapsible } from "@workspace/ui/components/nav-collapsible";
import axios from "axios";

const navData = {
  navMain: [
    {
      title: "Feed",
      url: "/home",
      icon: HomeIcon,
    },
    {
      title: "My Links",
      url: "/mylinks",
      icon: Link,
    },
    {
      title: "My Collections",
      url: "/mycollections",
      icon: FolderIcon,
    },
  ],
  navSaves: [
    {
      title: "Bookmarks",
      items: [
        {
          title: "Quick Saves",
          url: "/bookmarks",
          icon: Bookmark,
        },
        {
          title: "My Picks",
          url: "/liked",
          icon: Heart,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Chat with AI Brain",
      url: "/chat-with-brain",
      icon: Sparkles,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [spacesData, setSpacesData] = React.useState({
    mySpaces: [
      {
        title: "My Spaces",
        items: [
          {
            title: "Create Space",
            url: "/create?type=space",
            icon: PlusIcon,
          },
        ],
      },
    ],
    JoinedSpaces: [
      {
        title: "Joined Spaces",
        items: [
          {
            title: "Find Space",
            url: "/bookmarks",
            icon: SearchIcon,
          },
        ],
      },
    ],
  });

  const { data: session } = useSession();

  const userData = {
    name: session?.user?.name || "User Name",
    email: session?.user?.email || "user@email.com",
    avatar: session?.user?.image || "U",
  };

  React.useEffect(() => {
    if (!session?.user?.id) return;

    const fetchSpaces = async () => {
      try {
        const res = await axios.get("/api/spaces");
        const data = await res.data;

        setSpacesData((prev) => ({
          mySpaces: [
            {
              title: "My Spaces",
              items: [
                ...prev.mySpaces[0]?.items,
                ...data.mySpaces?.map((space: any) => ({
                  title: space.name,
                  url: `/space/${space.handle}`,
                  image: space.image,
                })),
              ],
            },
          ],
          JoinedSpaces: [
            {
              title: "Joined Spaces",
              items: [
                ...prev.JoinedSpaces[0]?.items,
                ...data.joinedSpaces?.map((space: any) => ({
                  title: space.name,
                  url: `/space/${space.handle}`,
                  image: space.image,
                })),
              ],
            },
          ],
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpaces();
  }, [session?.user?.id]);

  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-col justify-center gap-2">
          <SidebarTrigger />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Quick create"
                className="w-full rounded-lg bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                onClick={() => {
                  redirect("/create");
                }}
              >
                <CirclePlusIcon className="shrink-0" />
                <span>Quick Create</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} pathname={pathname} />
        <NavCollapsible items={spacesData.mySpaces} pathname={pathname} />
        <NavCollapsible items={spacesData.JoinedSpaces} pathname={pathname} />
        <NavCollapsible items={navData.navSaves} pathname={pathname} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
