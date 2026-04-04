"use client";
import Footer from "@/Component/Footer/Footer";
import ReceiveContent from "@/Component/ReceiveContent";
import ShareComponent from "@/Component/ShareComponent";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,_#dbe0d2_0%,_#d0d4c7_100%)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-3 py-3 md:px-4 md:py-4">
        <div className="grid flex-1 gap-3 md:grid-cols-2 md:gap-4">
          <ShareComponent />
          <ReceiveContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
