"use client";
import Footer from "@/Component/Footer/Footer";
import ReceiveContent from "@/Component/ReceiveContent";
import ShareComponent from "@/Component/ShareComponent";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden min-h-screen">
      <div className="flex flex-col md:flex-row md:h-auto w-full">
        <main>
          <ShareComponent />
          <ReceiveContent />
        </main>
      </div>
      <Footer />
    </div>
  );
}