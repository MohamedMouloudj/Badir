"use client";

import { logoutAction } from "@/actions/logout";
import { useSession } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";

export default function Logout({
  setIsPopoverOpen,
  onMenuAction,
  isMobile,
}: {
  setIsPopoverOpen?: Dispatch<SetStateAction<boolean>>;
  onMenuAction?: () => void;
  isMobile?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const { refetch } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        setIsPopoverOpen?.(false);
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
  if (isMobile) {
    return (
      <button
        onClick={handleLogout}
        disabled={isPending}
        className="text-state-error hover:bg-neutrals-200 flex w-full items-center gap-2 rounded-md px-3 py-2 text-right text-sm transition-colors disabled:opacity-50"
      >
        <LogOut className="h-4 w-4" />
        {isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
      </button>
    );
  }
  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="text-state-error hover:bg-neutrals-200 flex w-full items-center gap-3 rounded-md px-3 py-2 text-right text-sm transition-colors disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      {isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
    </button>
  );
}
