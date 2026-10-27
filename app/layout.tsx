import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "HEPRA — Build. Launch. Grow.", template: "%s | HEPRA" },
  description: "Build a beautiful online store, manage orders and grow your business with HEPRA.",
  applicationName: "HEPRA"
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}