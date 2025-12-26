
import React from 'react';
import { AppState, StaffPerformance } from '../types';

interface AdminDashboardProps {
  state: AppState;
}

const DUMMY_STAFF: StaffPerformance[] = [
  { name: 'Nguyen Van A', counterId: '03', ticketsProcessed: 42, loginTime: '08:00 AM' },
  { name: 'Le Thi B', counterId: '01', ticketsProcessed: 38, loginTime: '08:15 AM' },
  { name: 'Tran Van C', counterId: '04', ticketsProcessed: 45, loginTime: '08:00 AM' },
  { name: 'Pham Minh D', counterId: '02', ticketsProcessed: 12, loginTime: '10:00 AM' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state }) => {
  const totalTickets = state.history.length + (state.currentlyServing ? 1 : 0) + state.waitingTickets.length;
  const avgWaitTime = totalTickets > 0 ? Math.floor(Math.random() * 15) + 5 : 0; // Simulated data

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Management Dashboard</h1>
          <p className="text-gray-500">Real-time overview of branch performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
            <i className="fas fa-calendar-alt mr-2 text-gray-400"></i> Today
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md transition-all flex items-center">
            <i className="fas fa-file-excel mr-2"></i> Export Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon="fa-ticket" 
          label="Total Tickets Today" 
          value={totalTickets.toString()} 
          change="+12.5%" 
          positive={true} 
          color="bg-blue-500"
        />
        <StatCard 
          icon="fa-hourglass-half" 
          label="Avg. Wait Time" 
          value={`${avgWaitTime}m`} 
          change="-2.1%" 
          positive={true} 
          color="bg-red-500"
        />
        <StatCard 
          icon="fa-users" 
          label="Active Counters" 
          value="4 / 6" 
          change="Normal" 
          positive={true} 
          color="bg-emerald-500"
        />
        <StatCard 
          icon="fa-check-double" 
          label="Completed" 
          value={state.history.length.toString()} 
          change={`+${state.history.length}`} 
          positive={true} 
          color="bg-purple-500"
        />
      </div>

      {/* Staff Performance Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Staff Performance</h3>
          <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">REAL-TIME DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-widest">
                <th className="px-8 py-4">Staff Member</th>
                <th className="px-8 py-4">Counter</th>
                <th className="px-8 py-4">Processed</th>
                <th className="px-8 py-4">Performance</th>
                <th className="px-8 py-4 text-right">Login Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DUMMY_STAFF.map((staff, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img src={`https://picsum.photos/50/50?random=${idx + 10}`} alt={staff.name} />
                      </div>
                      <span className="font-bold text-gray-800">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-bold">Counter {staff.counterId}</span>
                  </td>
                  <td className="px-8 py-4 font-black text-gray-900">{staff.ticketsProcessed}</td>
                  <td className="px-8 py-4">
                    <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${Math.min(100, (staff.ticketsProcessed / 50) * 100)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right font-medium text-gray-500">{staff.loginTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-gray-50 text-center border-t border-gray-100">
          <button className="text-gray-500 hover:text-gray-900 text-sm font-bold transition-colors">
            View Full Report <i className="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, positive, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`${color} text-white p-3 rounded-2xl`}>
        <i className={`fas ${icon} text-xl w-6 text-center`}></i>
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-lg ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {change}
      </div>
    </div>
    <div>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
