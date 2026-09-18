import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AttributionProvider } from "@/components/ui/AttributionProvider";

export const metadata: Metadata = {
  title: "FlowtechAM | Tecnologia aplicada à operação das empresas",
  description:
    "Sistemas, automações, CRM e sites para organizar operações e empresas em Manaus.",
  openGraph: {
    title: "FlowtechAM | Tecnologia aplicada à operação das empresas",
    description:
      "Sistemas, automações, CRM e sites construídos a partir da realidade da sua empresa.",
    siteName: "FlowtechAM",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body><AttributionProvider>{children}</AttributionProvider></body>
    </html>
  );
}
