import "./globals.css";
import Navbar from "@/components/Navbar";
import { RoleProvider } from "@/components/RoleContext";

export const metadata = {
  title: "RESAVO — User Portal (Seller & Buyer)",
  description: "Every Resource. A Better Next Use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas font-sans antialiased text-navy-900 flex flex-col">
        <RoleProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
        </RoleProvider>
      </body>
    </html>
  );
}
