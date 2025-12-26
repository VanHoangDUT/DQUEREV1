
import React, { useState } from 'react';
import { Ticket } from '../types';

interface KioskViewProps {
  nextNumber: number;
  onIssue: (serviceType: string) => Ticket;
}

const KioskView: React.FC<KioskViewProps> = ({ nextNumber, onIssue }) => {
  const [lastIssued, setLastIssued] = useState<Ticket | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = (type: string) => {
    setIsPrinting(true);
    const ticket = onIssue(type);
    setLastIssued(ticket);
    
    // Simulate printing delay
    setTimeout(() => {
      setIsPrinting(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Ticket Number Section */}
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center border-t-8 border-red-600">
        <h2 className="text-gray-500 uppercase tracking-widest font-bold mb-4">Next Ticket to be Issued</h2>
        <div className="text-9xl font-black text-gray-900 mb-6 tabular-nums">
          #{nextNumber}
        </div>
        <p className="text-gray-400 font-medium">Please select a service below to get your ticket</p>
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Scan Side */}
        <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center justify-center space-y-6">
          <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden group cursor-pointer" onClick={() => handlePrint('Mobile')}>
            <i className="fas fa-qrcode text-8xl text-gray-800 opacity-80"></i>
            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors flex items-center justify-center">
              <div className="hidden group-hover:block bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">SCAN ME</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-xl text-gray-800">Scan to track</h3>
            <p className="text-gray-500 text-sm">Scan with your mobile to track wait time</p>
          </div>
        </div>

        {/* Print Button Side */}
        <button 
          onClick={() => handlePrint('Walk-in')}
          disabled={isPrinting}
          className={`group bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-3xl shadow-lg p-10 flex flex-col items-center justify-center space-y-6 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className={`w-48 h-48 flex items-center justify-center transition-transform ${isPrinting ? 'animate-bounce' : 'group-hover:scale-110'}`}>
            <i className="fas fa-print text-8xl"></i>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-3xl">PRINT TICKET</h3>
            <p className="text-red-100 opacity-80">Touch here for physical ticket</p>
          </div>
        </button>
      </div>

      {/* Success Animation Overlay */}
      {lastIssued && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 transition-opacity duration-300 ${isPrinting ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-emerald-500 text-white rounded-3xl p-12 text-center shadow-2xl scale-110 transform transition-transform">
            <i className="fas fa-check-circle text-8xl mb-6"></i>
            <h4 className="text-4xl font-black mb-2">TICKET ISSUED!</h4>
            <p className="text-2xl font-bold mb-4">#{lastIssued.number}</p>
            <p className="text-emerald-100">Please take your ticket from the dispenser.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KioskView;
