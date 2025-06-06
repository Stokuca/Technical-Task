import { create } from 'zustand';
import { Report } from '../types/report';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'report-data';

interface ReportState {
  reports: Report[];
  addReport: (title: string, content: string) => void;
  updateReport: (id: string, updated: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  reorderReports: (newOrder: Report[]) => void;
  clearAllReports: () => void; 
}

export const useReportStore = create<ReportState>((set) => {

  const stored = localStorage.getItem(STORAGE_KEY);
  const initialReports: Report[] = stored ? JSON.parse(stored) : [];

  const saveToStorage = (reports: Report[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  };

  return {
    reports: initialReports,

    addReport: (title, content) =>
      set((state) => {
        const now = new Date().toISOString();
        const newReports = [
          ...state.reports,
          {
            id: uuidv4(),
            title,
            content,
            createdAt: now,
            updatedAt: now,
            activityLog: ['Created manually'], // 🆕
          },
        ];
        saveToStorage(newReports);
        return { reports: newReports };
      }),
    

      updateReport: (id, updated) =>
        set((state) => {
          const now = new Date().toISOString();
          const newReports = state.reports.map((r) => {
            if (r.id === id) {
              const message = updated.content?.includes('🧠 This is a summary')
                ? 'Summarized by AI'
                : 'Edited manually';
              return {
                ...r,
                ...updated,
                updatedAt: now,
                activityLog: [...(r.activityLog || []), `${message} at ${now}`],
              };
            }
            return r;
          });
          saveToStorage(newReports);
          return { reports: newReports };
        }),
      

    deleteReport: (id) =>
      set((state) => {
        const newReports = state.reports.filter((r) => r.id !== id);
        saveToStorage(newReports);
        return { reports: newReports };
      }),

    reorderReports: (newOrder) => {
      saveToStorage(newOrder);
      set(() => ({ reports: newOrder }));
    },
    clearAllReports: () => {
      localStorage.removeItem(STORAGE_KEY);
      set(() => ({ reports: [] }));
    },
    
    
  };
});
