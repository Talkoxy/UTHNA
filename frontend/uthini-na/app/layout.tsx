import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import  Navbar from "./components/Navbar/navbar";
import CreateFeedbackModal from "./components/Modals/CreateFeedbackModal";
import CreateSettingModal from "./components/Modals/CreateSettingsModal";
import CreateConnectPostModal from "./components/Modals/CreateConnectPostModal";
import EditSettingsModal from "./components/Modals/EditSettingsModal";
import CreateAvatarModal from "./components/Modals/CreateAvatarModal";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uthini Na? ",
  description: "from: Uthini Na? Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


            <Navbar />
          <div className="">
            {children}
          </div>
          <CreateAvatarModal/>
          <CreateConnectPostModal/>
          <CreateFeedbackModal/>
          <CreateSettingModal/>
          <EditSettingsModal/>
      </body>
    </html>
  );
}
