"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export function AnalyticsCharts({ timelineData, serviceData }: { timelineData: any[], serviceData: any[] }) {
  // Guard clause: Don't render if data is empty to prevent crashes
  if (!timelineData || timelineData.length === 0) {
    return <div className="p-4 text-center text-slate-500">No analytics data available yet.</div>;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-8">

      {/* 1. VOLUME TREND */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Inquiry Volume (Last 7 Days)</h3>
        {/* Fixed height container */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. SERVICE DISTRIBUTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Service Type Distribution</h3>
        {/* Fixed height container */}
        <div className="flex-1 w-full" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="40%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#64748b'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
