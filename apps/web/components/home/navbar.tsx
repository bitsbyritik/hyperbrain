import { cn } from "@workspace/ui/lib/utils";
import { BrainIcon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di";
import { FaDiscord } from "react-icons/fa6";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import { NAV_LINKS } from "@/utils";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const Navbar = () => {
  return (
    <header
      className={cn(
        "px-4 h-14 sticky top-0 inset-x-0 w-full bg-card backdrop-blur-md border rounded-2xl border-border z-30",
      )}
    >
      <div className={cn("flex items-center justify-between h-full mx-auto")}>
        <div className="flex gap-6 items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <BrainIcon />
            <span className="text-xl font-bold">HyperBrain</span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.title}>
                  {link.menu ? (
                    <>
                      <NavigationMenuTrigger>
                        {link.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul
                          className={cn(
                            "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                            link.title === "Features"
                              ? "lg:grid-cols-[.75fr_1fr]"
                              : "lg:grid-cols-2",
                          )}
                        >
                          {link.title === "Features" && (
                            <li className="row-span-4 pr-2 relative rounded-lg overflow-hidden">
                              <div className="absolute inset-0 !z-10 h-full w-[calc(100%-10px)] bg-[linear-gradient(to_right,rgb(38,38,38,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                              <NavigationMenuLink
                                asChild
                                className="z-20 relative"
                              >
                                <Link
                                  href="/"
                                  className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                >
                                  <h6 className="mb-2 mt-4 text-lg font-medium">
                                    All Features
                                  </h6>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Manage links, track performance, and more.
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          )}
                          {link.menu.map((menuItem) => (
                            <ListItem
                              key={menuItem.title}
                              title={menuItem.title}
                              href={menuItem.href}
                              icon={menuItem.icon}
                            >
                              {menuItem.tagline}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={link.href} passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1">
            <a
              href={"https://github.com/bitsbyritik/hyperbrain"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1"
            >
              <FaDiscord size={34} />
            </a>
            <a
              href={"https://github.com/bitsbyritik/hyperbrain"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiGithubBadge size={38} />
            </a>
          </div>
          <Link href={"/home"}>
            <FaArrowCircleRight size={34} className="fill-[#9158ed]" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center space-x-2 text-neutral-300">
            <Icon className="h-4 w-4" />
            <h6 className="text-sm font-medium !leading-none">{title}</h6>
          </div>
          <p
            title={children! as string}
            className="line-clamp-1 text-sm leading-snug text-muted-foreground"
          >
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
