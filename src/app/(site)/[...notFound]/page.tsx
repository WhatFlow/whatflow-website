import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist on WhatFlow.",
};

/** Unknown site URLs render the (site) not-found page with a real 404 status. */
export default function CatchAllNotFound() {
  notFound();
}
