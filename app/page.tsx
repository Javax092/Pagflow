import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cases } from "@/components/sections/Cases";
import { DiagnosticExpress } from "@/components/sections/DiagnosticExpress";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Methodology } from "@/components/sections/Methodology";
import { Services } from "@/components/sections/Services";
import { DiagnosticProvider } from "@/components/ui/DiagnosticContext";
import { PageTracker } from "@/components/ui/PageTracker";
import backgroundImage from "@/components/public/fundo.jpeg";

export default function Home() {
  return (
    <DiagnosticProvider>
      <PageTracker sourceContext="home" />
      <div className="ambient-background" aria-hidden="true">
        <Image src={backgroundImage} alt="" fill sizes="100vw" priority />
      </div>
      <Navbar />
      <main>
        <Hero />
        <DiagnosticExpress />
        <Cases />
        <Services />
        <Methodology />
        <FinalCta />
      </main>
      <Footer />
    </DiagnosticProvider>
  );
}
