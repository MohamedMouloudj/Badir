"use client";
import React from "react";
import AppButton from "@/components/AppButton";
import { authRoutes } from "@/data/routes";
import { useMediaQuery } from "react-responsive";

export default function SignInButton() {
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 });

  return (
    <AppButton
      type="primary"
      url={authRoutes.login.url}
      corner="rounded"
      size={isTablet ? "sm" : "lg"}
    >
      {authRoutes.login.label}
    </AppButton>
  );
}
