"use client";
import React, { useState, useEffect } from "react";
import AppButton from "./AppButton";
import { authRoutes } from "@/data/routes";
import { useMediaQuery } from "react-responsive";
import { Dialog } from "./ui/dialog";
import AuthChoicesDialog from "./AuthChoicesDialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function SignUpButton() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, default to desktop size to avoid hydration mismatch
  const buttonSize = isClient ? (isTablet ? "sm" : "lg") : "lg";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AppButton type="outline" corner="rounded" size={buttonSize}>
          {authRoutes.signup.label}
        </AppButton>
      </DialogTrigger>
      <AuthChoicesDialog close={() => setIsOpen(false)} />
    </Dialog>
  );
}
