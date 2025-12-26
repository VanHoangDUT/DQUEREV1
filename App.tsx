
import React, { useState, useCallback, useEffect } from 'react';
import { View, AppState, Ticket, TicketStatus } from './types';
import Navigation from './components/Navigation';
import KioskView from './components/KioskView';
import StaffView from './components/StaffView';
import AdminDashboard from './components/AdminDashboard';

const INITIAL_TICKET_NUMBER = 1001;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.KIOSK);
  const [state, setState] = useState<AppState>({
    waitingTickets: [],
    nextTicketNumber: INITIAL_TICKET_NUMBER,
    currentlyServing: null,
    history: []
  });

  const issueTicket = useCallback((serviceType: string) => {
    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      number: state.nextTicketNumber.toString(),
      timestamp: Date.now(),
      status: TicketStatus.WAITING,
      serviceType
    };

    setState(prev => ({
      ...prev,
      waitingTickets: [...prev.waitingTickets, newTicket],
      nextTicketNumber: prev.nextTicketNumber + 1
    }));

    return newTicket;
  }, [state.nextTicketNumber]);

  const callNext = useCallback(() => {
    if (state.waitingTickets.length === 0) return null;

    const [next, ...remaining] = state.waitingTickets;
    const processingTicket = { ...next, status: TicketStatus.PROCESSING };

    // Move current serving to history if it exists
    const newHistory = [...state.history];
    if (state.currentlyServing) {
      newHistory.push({ ...state.currentlyServing, status: TicketStatus.COMPLETED });
    }

    setState(prev => ({
      ...prev,
      waitingTickets: remaining,
      currentlyServing: processingTicket,
      history: newHistory
    }));

    return processingTicket;
  }, [state.waitingTickets, state.currentlyServing, state.history]);

  const recallTicket = useCallback(() => {
    // Logic for repeating a call (could trigger audio or visual cue)
    if (!state.currentlyServing) return;
    console.log(`Recalling Ticket: ${state.currentlyServing.number}`);
  }, [state.currentlyServing]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentView === View.KIOSK && (
          <KioskView 
            nextNumber={state.nextTicketNumber} 
            onIssue={issueTicket} 
          />
        )}
        
        {currentView === View.STAFF && (
          <StaffView 
            currentlyServing={state.currentlyServing}
            waitingCount={state.waitingTickets.length}
            onCallNext={callNext}
            onRecall={recallTicket}
          />
        )}
        
        {currentView === View.ADMIN && (
          <AdminDashboard 
            state={state}
          />
        )}
      </main>

      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DQUEUE Systems. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
