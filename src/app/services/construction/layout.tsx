import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Finishing & Interiors | Raymond Gray",
  description: "From structural shell to exceptional space. Premium interior design, fit-outs, and high-quality finishing services.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}