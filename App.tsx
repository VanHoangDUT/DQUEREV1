
import React, { useState, useCallback } from 'react';
import { View, AppState, Ticket, TicketStatus } from './types';
import Navigation from './components/Navigation';
import KioskView from './components/KioskView';
import StaffView from './components/StaffView';
import AdminDashboard from './components/AdminDashboard';
import { GoogleGenAI, Modality } from "@google/genai";
import { decodeBase64, decodeAudioData } from './audioUtils';

const INITIAL_TICKET_NUMBER = 1001;
const COUNTER_ID = "03";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.KIOSK);
  const [state, setState] = useState<AppState>({
    waitingTickets: [],
    nextTicketNumber: INITIAL_TICKET_NUMBER,
    currentlyServing: null,
    history: []
  });

  const playVoiceAnnouncement = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Đọc to bằng giọng tiếng Việt truyền cảm: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore thường có chất giọng tốt cho tiếng Việt
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(
          decodeBase64(base64Audio),
          audioCtx,
          24000,
          1
        );
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.start();
      }
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

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

    // Phát âm thanh thông báo tiếng Việt
    playVoiceAnnouncement(`Xin mời số thứ tự ${processingTicket.number} đến quầy số ${COUNTER_ID}`);

    return processingTicket;
  }, [state.waitingTickets, state.currentlyServing, state.history]);

  const recallTicket = useCallback(() => {
    if (!state.currentlyServing) return;
    // Phát âm thanh nhắc lại
    playVoiceAnnouncement(`Xin nhắc lại, mời số thứ tự ${state.currentlyServing.number} đến quầy số ${COUNTER_ID}`);
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
