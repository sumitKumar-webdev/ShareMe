"use client";
import Footer from "@/Component/Footer/Footer";
import ReceiveContent from "@/Component/ReceiveContent";
import ShareComponent from "@/Component/ShareComponent";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden h-screen">
      <div className="flex flex-col md:flex-row min-h-screen md:h-auto w-full">
        <ShareComponent />
        <ReceiveContent />
      </div>
      <Footer />
    </div>
  );
}