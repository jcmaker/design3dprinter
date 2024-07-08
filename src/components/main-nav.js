"use client";

import { cn } from "lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({ className, ...props }) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/room311`,
      label: "311호",
      active: pathname === `/room311`,
    },
    {
      href: `/room315`,
      label: "315호",
      active: pathname === `/room315`,
    },
  ];
  return (
    <nav
      className={cn("flex items-center ml-4 space-x-4 lg:space-x-6", className)}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
