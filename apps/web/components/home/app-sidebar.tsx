"use client";

import * as React from "react";
import {
  CirclePlusIcon,
  FolderIcon,
  HelpCircleIcon,
  HomeIcon,
  Link,
  Sparkles,
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
import { redirect } from "next/navigation";

const navData = {
  navMain: [
    {
      title: "Feed",
      url: "/home",
      icon: HomeIcon,
    },
    {
      title: "Links",
      url: "/mylinks",
      icon: Link,
    },
    {
      title: "Collections",
      url: "/mycollections",
      icon: FolderIcon,
    },
  ],
  navSecondary: [
    {
      title: "Chat with AI Brain",
      url: "#",
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
  const { data: session } = useSession();

  const userData = {
    name: session?.user?.name || "User Name",
    email: session?.user?.email || "user@email.com",
    avatar: session?.user?.image || "U",
  };

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
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
