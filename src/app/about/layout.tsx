import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Raymond Gray",
  description: "Our mission is to redefine facility management in Africa with uncompromising quality, innovation, and sustainability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
