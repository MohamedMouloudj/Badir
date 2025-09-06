"use client";

import { useSession } from "@/lib/auth-client";
import React, { useState, useTransition, useEffect } from "react";
import { logoutAction } from "@/actions/logout";
import { LogOut, User, Settings, Star } from "lucide-react";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserType } from "@prisma/client";
import { getOrganizationLogo, getUserImage } from "@/actions/profile";
import { getPublicStorageUrl } from "@/actions/supabaseHelpers";

export function AuthProfileButtons({
  isMobile,
  onMenuAction,
}: {
  isMobile: boolean;
  onMenuAction?: () => void;
}) {
  const { data: session, isPending: isSessionPending, refetch } = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    refetch?.();
  }, [refetch]);

  // useEffect(() => {
  //   refetch?.();
  // }, [pathname, refetch]);

  // Refresh session when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      refetch?.();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetch]);

  const handleLogout = () => {
    startTransition(async () => {
      try {
        setIsPopoverOpen(false);
        onMenuAction?.();

        await logoutAction();
        refetch?.();

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 100);
      } catch (error) {
        console.error("Logout failed:", error);
        refetch?.();
        router.push("/");
        router.refresh();
      }
    });
  };

  useEffect(() => {
    if (!session?.user) return;

    async function fetchOrganizationLogo() {
      const logoPath = await getOrganizationLogo();
      if (!logoPath) {
        setImage(null);
        return;
      }
      const logo = await getPublicStorageUrl("avatars", logoPath);

      setImage(logo);
    }

    async function fetchUserImage() {
      const imagePath = await getUserImage();
      const image = await getPublicStorageUrl("avatars", imagePath || "");
      if (!image) {
        setImage(null);
        return;
      }

      setImage(image);
    }

    if (session.user.userType !== UserType.organization) {
      fetchUserImage();
    } else {
      fetchOrganizationLogo();
    }
  }, [session, session?.user]);

  const handleProfileClick = () => {
    setIsPopoverOpen(false);
    onMenuAction?.();
  };

  if (isSessionPending || isPending) {
    return (
      <div className="flex items-center justify-center">
        <div className="h-10 w-10 md:h-12 md:w-12 bg-neutrals-200 rounded-full animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <>
        {isMobile ? (
          <div className="flex items-center justify-center">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
                  disabled={isPending}
                >
                  <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary-400 ring-offset-1 transition-all">
                    <AvatarImage
                      src={image || ""}
                      alt={session.user.name || "المستخدم"}
                    />
                    <AvatarFallback className="border-2 border-primary-500 text-primary-500 font-semibold">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-48 p-2 bg-neutrals-100 border border-neutrals-300 shadow-lg"
                align="end"
                dir="rtl"
              >
                <div className="flex flex-col space-y-1">
                  {/* User Info */}
                  <div className="px-3 py-2 border-b border-neutrals-300">
                    <p className="text-sm font-semibold text-neutrals-700 truncate">
                      {session.user.name || "المستخدم"}
                    </p>
                    <p className="text-xs text-neutrals-500 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutrals-600 hover:bg-neutrals-200 rounded-md transition-colors"
                    onClick={handleProfileClick}
                  >
                    <Settings className="h-4 w-4" />
                    الملف الشخصي
                  </Link>
                  <Link
                    href="/feedback"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutrals-600 hover:bg-neutrals-200 rounded-md transition-colors"
                    onClick={handleProfileClick}
                  >
                    <Star className="h-4 w-4" />
                    التقييم
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    disabled={isPending}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-state-error hover:bg-neutrals-200 rounded-md transition-colors w-full text-right disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-secondary-600 rounded-full"
                  disabled={isPending}
                >
                  <Avatar className="h-10 w-10 md:h-12 md:w-12 cursor-pointer hover:ring-2 hover:ring-primary-400 ring-offset-1 transition-all">
                    <AvatarImage
                      src={image || ""}
                      alt={session.user.name || "المستخدم"}
                    />
                    <AvatarFallback className="border-2 border-primary-500 text-primary-500 font-semibold">
                      <User className="h-5 w-5 md:h-6 md:w-6" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-2 bg-neutrals-100 border border-neutrals-300 shadow-lg"
                align="end"
                dir="rtl"
              >
                <div className="flex flex-col space-y-1">
                  {/* User Info */}
                  <div className="px-3 py-3 border-b border-neutrals-300">
                    <p className="text-sm font-semibold text-neutrals-700 truncate">
                      {session.user.name || "المستخدم"}
                    </p>
                    <p className="text-xs text-neutrals-500 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-neutrals-600 hover:bg-neutrals-200 rounded-md transition-colors"
                    onClick={handleProfileClick}
                  >
                    <Settings className="h-4 w-4" />
                    الملف الشخصي
                  </Link>
                  <Link
                    href="/feedback"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutrals-600 hover:bg-neutrals-200 rounded-md transition-colors"
                    onClick={handleProfileClick}
                  >
                    <Star className="h-4 w-4" />
                    التقييم
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    disabled={isPending}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-state-error hover:bg-neutrals-200 rounded-md transition-colors w-full text-right disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col flex-1/3 gap-3">
          <SignUpButton />
          <SignInButton />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <SignUpButton />
          <SignInButton />
        </div>
      )}
    </>
  );
}
