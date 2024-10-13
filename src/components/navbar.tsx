"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { logout } from "../services/authServices";
import { useUser } from "../context/user.provider";

import { Logo } from "./icons";
import { ThemeSwitch } from "./theme-switch";

import { siteConfig } from "@/src/config/site";

export const Navbar = () => {
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const handleUserLogout = () => {
    logout();
    userLoading(true);
    router.push("/");
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Navbar content for large screens */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">RecipeNest</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Navbar content for large screens - Right side */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden md:flex">
            <Button
              className="text-sm font-normal text-default-600 bg-default-100"
              variant="flat"
              onClick={handleUserLogout}
            >
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden md:flex">
            <Link href="/login">
              <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                variant="flat"
              >
                Login
              </Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Navbar content for small screens */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Navbar Menu for small devices */}
      {/* Navbar Menu for small devices */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={"foreground"}
                // color={
                //   index === siteConfig.navMenuItems.length - 1
                //     ? "danger"
                //     : "foreground"
                // }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {user?.email ? (
            <NavbarMenuItem>
              <Button
                className="w-full text-left text-lg text-danger"
                variant="flat"
                onClick={handleUserLogout}
              >
                Logout
              </Button>
            </NavbarMenuItem>
          ) : (
            <Link color={"foreground"} href={"/login"} size="lg">
              Login
            </Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
