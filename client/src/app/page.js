"use client";
import Footer from "@/Component/Footer/Footer";
import ReceiveContent from "@/Component/ReceiveContent";
import ShareComponent from "@/Component/ShareComponent";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Head>
        <title>My Awesome Next.js Page</title>
        <meta name="description" content="This is my Next.js website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen md:h-auto">
        <ShareComponent />
        <ReceiveContent />
      </div>

      <Footer />
    </div>
  );
}