import Sidebar from "@/components/Sidebar";
import "./globals.css";


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="w-[75%] bg-slate-950 overflow-scroll no-scrollbar">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
