import type { Metadata } from "next";
import PortfolioDashboard from "@/components/PortfolioDashboard";

export const metadata: Metadata = {
  title: "Portfolio Dashboard | Muzaffar Ali",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <PortfolioDashboard />;
}
