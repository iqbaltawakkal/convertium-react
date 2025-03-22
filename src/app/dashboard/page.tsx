"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Particles } from "@/components/magicui/particles";

export default function Dashboard() {
  const [user, setUser] = useState<{
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  interface Item {
    title: string;
    href: string;
  }
  const sidebarNavItems: Item[] = [
    {
      title: "Basic details",
      href: "/dashboard",
    },
    {
      title: "Additional details",
      href: "/examples/forms/account",
    },
    {
      title: "Spouse details",
      href: "/examples/forms/appearance",
    },
    {
      title: "Personal preference",
      href: "/examples/forms/notifications",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <>
      <div className="space-y-6 p-4 sm:p-10 pb-16 md:block relative bg-white z-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="block sm:hidden w-auto px-2">
                  <MenuIcon className="ml-auto h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  {sidebarNavItems.map((item) => (
                    <DropdownMenuItem
                      key={item.title}
                      className={cn(
                        pathname === item.href && "bg-muted hover:bg-muted"
                      )}
                    >
                      {item.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <img
              className="hidden sm:block"
              src="/image/logo.png"
              width="200"
            />
            <img
              className="block sm:hidden"
              src="/image/logo-mobile.png"
              width="36"
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="sm:w-[200px] justify-between w-auto"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage src="/images/avatar.png" alt="avatar" />
                    <AvatarFallback>
                      {user?.firstName.charAt(0).toUpperCase()}
                      {user?.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="hidden sm:block">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal flex">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="flex flex-col space-y-0 sm:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="hidden sm:block lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={cn(
                    "text-left justify-start",
                    pathname === item.href && "bg-muted hover:bg-muted"
                  )}
                >
                  {item.title}
                </Button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  This is how others will see you on the site.
                </p>
              </div>
              <Separator />

              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-sm font-medium leading-none">Salutation</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.salutation}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">First name</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Last name</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Particles
        className="absolute inset-0 z-10"
        quantity={100}
        ease={100}
        color="#000000"
        refresh
        staticity={10}
      />
    </>
  );
}
