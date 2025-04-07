"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

export function NavMain({
  items,
  pathname,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <a href={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`hover:bg-[#2D323B] transition-colors gap-3 ${pathname === item.url ? "bg-[#2D323B] text-foreground" : ""}`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
