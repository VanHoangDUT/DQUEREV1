
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 text-white p-2 rounded-lg">
            <i className="fas fa-layer-group text-xl"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">DQUEUE</span>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-4">
          <button 
            onClick={() => onViewChange(View.KIOSK)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentView === View.KIOSK ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <i className="fas fa-desktop mr-2"></i> Kiosk
          </button>
          <button 
            onClick={() => onViewChange(View.STAFF)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentView === View.STAFF ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <i className="fas fa-user-tie mr-2"></i> Counter
          </button>
          <button 
            onClick={() => onViewChange(View.ADMIN)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentView === View.ADMIN ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <i className="fas fa-chart-line mr-2"></i> Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
