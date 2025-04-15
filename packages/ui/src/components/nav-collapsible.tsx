"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@workspace/ui/components/collapsible";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";

export function NavCollapsible({
  items,
  pathname,
}: {
  items: {
    title: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      image?: string;
    }[];
  }[];
  pathname: string;
}) {
  return (
    <>
      {items.map((section) => (
        <Collapsible
          key={section.title}
          title={section.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div className="flex justify-between">
                {section.title}
                <CollapsibleTrigger>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </div>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <a href={item.url}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`hover:bg-[#2D323B] transition-colors gap-3 ${pathname === item.url ? "bg-[#2D323B] text-foreground" : ""}`}
                        >
                          {item.icon && <item.icon />}
                          {item.image && (
                            <Avatar className="w-4 h-4">
                              <AvatarImage src={item.image} alt={item.title} />
                              <AvatarFallback>{item.title[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </a>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
