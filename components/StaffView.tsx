
import React, { useState } from 'react';
import { Ticket, TicketStatus } from '../types';

interface StaffViewProps {
  currentlyServing: Ticket | null;
  waitingCount: number;
  onCallNext: () => Ticket | null;
  onRecall: () => void;
}

const StaffView: React.FC<StaffViewProps> = ({ currentlyServing, waitingCount, onCallNext, onRecall }) => {
  const [isCalling, setIsCalling] = useState(false);

  const handleCallNext = () => {
    setIsCalling(true);
    onCallNext();
    setTimeout(() => setIsCalling(false), 800);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom duration-500">
      {/* Staff Header */}
      <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/100/100?random=1" alt="Staff Avatar" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Logged In Staff</p>
            <p className="font-bold text-gray-800">Nguyen Van A</p>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-600">
          Counter: #03
        </div>
      </div>

      {/* Main Display Area */}
      <div className={`bg-white rounded-3xl shadow-xl p-12 text-center border-t-8 ${currentlyServing ? 'border-emerald-500' : 'border-gray-300'} transition-all duration-500`}>
        <div className="mb-6">
          <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest ${currentlyServing ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
            {currentlyServing ? 'Now Serving' : 'Ready to Serve'}
          </span>
        </div>
        
        <div className={`text-9xl font-black mb-8 tabular-nums ${currentlyServing ? 'text-gray-900' : 'text-gray-200'} ${isCalling ? 'ticket-flash' : ''}`}>
          {currentlyServing ? `#${currentlyServing.number}` : '---'}
        </div>

        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-orange-100">
            <i className="fas fa-clock"></i>
            <span className="font-bold">{waitingCount} People Waiting</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleCallNext}
            disabled={waitingCount === 0 || isCalling}
            className="flex items-center justify-center space-x-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-white py-6 rounded-2xl shadow-lg disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
          >
            <i className={`fas fa-microphone-alt text-2xl transition-transform ${isCalling ? 'animate-pulse' : 'group-hover:scale-110'}`}></i>
            <span className="text-xl font-black uppercase tracking-wider">Call Next Number</span>
          </button>

          <button 
            onClick={onRecall}
            disabled={!currentlyServing}
            className="flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 border-2 border-gray-200 active:scale-95 transition-all text-gray-700 py-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-redo-alt text-xl"></i>
            <span className="text-xl font-bold">Recall / Repeat</span>
          </button>
        </div>
      </div>

      {waitingCount === 0 && !currentlyServing && (
        <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-300 rounded-3xl text-gray-400">
          <i className="fas fa-smile-beam text-4xl mb-3 block"></i>
          <p className="font-bold">The queue is currently empty.</p>
          <p className="text-sm">New tickets will appear automatically when customers check-in.</p>
        </div>
      )}
    </div>
  );
};

export default StaffView;
