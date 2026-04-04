import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShareME",
  description: "Easy and hurdle-free text and file sharing.",
  icons: {
    icon: "/Icon.ico",
    apple: "/Icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          {children}
        </main>
        <ToastContainer
          position="bottom-right"
          newestOnTop
          theme="colored"
          toastStyle={{
            borderRadius: "16px",
            minHeight: "44px",
            marginBottom: "12px",
            maxWidth: "280px",
            fontSize: "0.88rem",
            padding: "10px 12px",
            overflow: "hidden",
          }}
          progressStyle={{
            height: "4px",
          }}
        />
      </body>
    </html>
  );
}
