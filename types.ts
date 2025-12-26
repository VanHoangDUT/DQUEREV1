
export enum View {
  KIOSK = 'kiosk',
  STAFF = 'staff',
  ADMIN = 'admin'
}

export enum TicketStatus {
  WAITING = 'Waiting',
  PROCESSING = 'Processing',
  COMPLETED = 'Completed'
}

export interface Ticket {
  id: string;
  number: string;
  timestamp: number;
  status: TicketStatus;
  serviceType: string;
}

export interface StaffPerformance {
  name: string;
  counterId: string;
  ticketsProcessed: number;
  loginTime: string;
}

export interface AppState {
  waitingTickets: Ticket[];
  nextTicketNumber: number;
  currentlyServing: Ticket | null;
  history: Ticket[];
}
