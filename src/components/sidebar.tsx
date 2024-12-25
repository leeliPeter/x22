import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  FileText,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const menuItems = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: FileText, label: "Report", href: "/report" },
    { icon: UserIcon, label: "Profile", href: "/profile" },
    { icon: SettingsIcon, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 h-full bg-background border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-[200px]",
        className
      )}
    >
      <div className="flex justify-between items-center">
        {!isCollapsed && <h2 className="text-lg font-semibold">Menu</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 hover:bg-primary hover:text-primary-foreground"
        >
          {isCollapsed ? <MenuIcon size={18} /> : <XIcon size={18} />}
        </Button>
      </div>

      <Separator />

      <nav className="space-y-2 flex flex-col">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start hover:bg-primary hover:text-primary-foreground",
                isCollapsed ? "px-2" : "px-4"
              )}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
