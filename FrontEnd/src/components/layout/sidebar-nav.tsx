'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { LineChart, Database, Wrench, Sparkles, Github } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  const navItems = [
    { href: "/", label: "Prediction", icon: LineChart },
    { href: "/data-explorer", label: "Data Explorer", icon: Database },
    { href: "/feature-engineering", label: "Feature Engineering", icon: Wrench },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-8 text-primary" />
          <h1 className="text-xl font-semibold">HitPredictor</h1>
          {isMobile && <SidebarTrigger className="ml-auto" />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="flex items-center justify-center gap-2 p-2">
            <Sparkles className="size-5 text-primary" />
            <p className="text-sm font-medium">Powered by AI</p>
        </div>
      </SidebarFooter>
    </>
  );
}
