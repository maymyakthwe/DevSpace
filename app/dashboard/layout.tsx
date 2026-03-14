import Sidebar from "@/components/Sidebar";


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
        <div className="flex h-screen">
          <Sidebar />
          <main className="w-[75%] bg-slate-950 overflow-scroll no-scrollbar">
            {children}
          </main>
        </div>
  );
}
