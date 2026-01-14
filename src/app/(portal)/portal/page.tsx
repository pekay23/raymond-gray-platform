import { Calendar, MapPin, ChevronRight, AlertCircle } from "lucide-react";

export default function PortalDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Today's Tasks</h1>
          <p className="text-slate-400 text-sm">Wednesday, Jan 14</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      {/* Priority Alert (If any) */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-400 text-sm">Emergency Request</h3>
          <p className="text-red-200/80 text-xs mt-1">Leak reported at Ridge Hospital. Priority High.</p>
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-3">
        <JobCard 
          client="Ridge Hospital" 
          type="Plumbing Repair" 
          time="09:00 AM" 
          address="Castle Rd, Accra" 
          status="pending"
        />
        <JobCard 
          client="Sarah Mensah" 
          type="AC Maintenance" 
          time="11:30 AM" 
          address="East Legon, near Anc Mall" 
          status="completed"
        />
        <JobCard 
          client="Ecobank HQ" 
          type="Electrical Inspection" 
          time="02:00 PM" 
          address="Independence Ave, Accra" 
          status="pending"
        />
      </div>
    </div>
  );
}

function JobCard({ client, type, time, address, status }: any) {
  const isCompleted = status === "completed";
  
  return (
    <div className={`p-4 rounded-xl border transition active:scale-[0.98] ${
      isCompleted 
        ? "bg-slate-900 border-slate-800 opacity-60" 
        : "bg-slate-800 border-slate-700 hover:border-blue-500/50"
    }`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isCompleted ? "bg-slate-700 text-slate-400" : "bg-blue-500/20 text-blue-400"
            }`}>
              {type}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {time}
            </span>
          </div>
          <h3 className={`font-semibold ${isCompleted ? "text-slate-400 line-through" : "text-white"}`}>
            {client}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {address}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </div>
    </div>
  );
}
