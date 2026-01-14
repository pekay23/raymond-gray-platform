import Link from "next/link";
import { ClipboardList, Map, User, Wrench } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 font-sans">
      
      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 border-r border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center gap-2 font-bold text-xl mb-8 px-2">
          <Wrench className="w-6 h-6 text-blue-500" />
          <span>RG Tech</span>
        </div>
        
        <nav className="space-y-2">
          <NavLink href="/portal" icon={<ClipboardList />} label="My Jobs" />
          <NavLink href="/portal/map" icon={<Map />} label="Map View" />
          <NavLink href="/portal/profile" icon={<User />} label="Profile" />
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">JD</div>
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-slate-400 text-xs">Technician</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        {children}
      </main>

      {/* MOBILE BOTTOM BAR (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 grid grid-cols-3 z-50 safe-area-pb">
        <MobileLink href="/portal" icon={<ClipboardList />} label="Jobs" />
        <MobileLink href="/portal/map" icon={<Map />} label="Map" />
        <MobileLink href="/portal/profile" icon={<User />} label="Profile" />
      </nav>
    </div>
  );
}

// Helper Components for clean code
function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition">
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-blue-500 transition">
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
