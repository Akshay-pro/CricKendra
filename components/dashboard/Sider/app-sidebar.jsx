"use client"

import * as React from "react"
import {
  Calculator,
  LayoutDashboard,
  SquareParking,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/Navbar/nav-main"
import { NavUser } from "@/components/dashboard/Navbar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Teams",
      url: "/dashboard/teams",
      icon: Users,
      isActive: true,
    },
    {
      title: "Players",
      url: "/dashboard/players",
      icon: SquareParking,
    },
    {
      title: "Matches",
      url: "/dashboard/matches",
      icon: Calculator,
      items: [
        {
          title: "Tour",
          url: "/dashboard/matches/tour",
        },
        {
          title: "Tournament",
          url: "/dashboard/matches/tournament",
        },
        {
          title: "Series",
          url: "/dashboard/matches/series",
        },
        {
          title: "Season",
          url: "/dashboard/matches/season",
        },
      ],
    },
    {
      title: "Venues",
      url: "#",
      icon: Calculator,
      items: [
        {
          title: "Continent",
          url: "/dashboard/venue/continent",
        },
        {
          title: "Host Nation",
          url: "/dashboard/venue/host-nation",
        },
        {
          title: "Ground",
          url: "/dashboard/venue/ground",
        },
        {
          title: "City",
          url: "/dashboard/venue/city",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function   AppSidebar({
  ...props
}) {
  return (
    (<Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Command className="size-4" />
                  <Image src="/assets/crickendra-logo.png" className="rounded-full" width={100} height={100} alt="logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Crickendra</span>
                  <span className="truncate text-xs">Center of Cricket</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
