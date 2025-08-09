"use client";
import React from "react";
import AppButton from "./AppButton";
import { authRoutes } from "@/data/routes";
import { useMediaQuery } from "react-responsive";

export default function SignUpButton() {
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 });

  return (
    <AppButton
      type="outline"
      url={authRoutes.signup.url}
      corner="rounded"
      size={isTablet ? "sm" : "lg"}
    >
      {authRoutes.signup.label}
    </AppButton>
  );
}
