import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Raymond Gray",
  description: "Get in touch for tailored facility management solutions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
