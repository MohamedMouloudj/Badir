"use client";
import React, { useState, useEffect } from "react";
import AppButton from "./AppButton";
import { authRoutes } from "@/data/routes";
import { useMediaQuery } from "react-responsive";

export default function SignUpButton() {
  const [isClient, setIsClient] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, default to desktop size to avoid hydration mismatch
  const buttonSize = isClient ? (isTablet ? "sm" : "lg") : "lg";

  return (
    <AppButton
      type="outline"
      url={authRoutes.signup.url}
      corner="rounded"
      size={buttonSize}
    >
      {authRoutes.signup.label}
    </AppButton>
  );
}
