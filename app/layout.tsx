import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "Imaginate AI",
  description: "Powered by DALL·E 2, ChatGPT and Microsoft Azure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          <PromptInput />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
