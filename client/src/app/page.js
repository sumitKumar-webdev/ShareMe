"use client";
import Footer from "@/Component/Footer/Footer";
import ReceiveContent from "@/Component/ReceiveContent";
import ShareComponent from "@/Component/ShareComponent";

export default function Home() {
  return (
    <div className="flex min-h-screen md:h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#dbe0d2_0%,#d0d4c7_100%)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col min-h-0 md:h-full md:overflow-hidden px-3 py-2 md:px-4 md:py-3">
        <div className="grid flex-1 min-h-0 gap-3 md:grid-cols-2 md:gap-3 md:overflow-hidden">
          <ShareComponent />
          <ReceiveContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
