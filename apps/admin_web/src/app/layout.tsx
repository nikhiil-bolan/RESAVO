import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "RESAVO — Admin & Impact Console",
  description: "Public-benefit resource preservation network admin dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-canvas">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </body>
    </html>
  );
}
