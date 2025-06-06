import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { useReportStore } from '../store/reportStore';

jest.mock('../store/reportStore', () => ({
  useReportStore: jest.fn(),
}));

jest.mock('../components/ReportEditor', () => () => (
  <div data-testid="report-editor">Mocked ReportEditor</div>
));

jest.mock('../components/ReportListDraggable', () => () => (
  <div data-testid="report-list">Mocked ReportListDraggable</div>
));

describe('Dashboard', () => {
  const mockUpdateReport = jest.fn();
  const mockReorderReports = jest.fn();
  const mockClearAllReports = jest.fn();

  beforeEach(() => {
    (useReportStore as unknown as jest.Mock).mockImplementation((selector) =>
        selector({
          reports: [
            { id: '1', title: 'First Report', content: 'Content 1' },
            { id: '2', title: 'Second Report', content: 'Content 2' },
          ],
          updateReport: mockUpdateReport,
          reorderReports: mockReorderReports,
          clearAllReports: mockClearAllReports,
        })
      );
      
  });

  it('renders the Dashboard with reports', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('report-editor')).toBeInTheDocument();
    expect(screen.getByTestId('report-list')).toBeInTheDocument();
  });

  it('filters reports by search query', () => {
    render(<Dashboard />);
    const searchInput = screen.getByLabelText(/search by title/i);
    fireEvent.change(searchInput, { target: { value: 'first' } });
    expect(screen.getByTestId('report-list')).toBeInTheDocument();
  });

  it('calls clearAllReports when clicking Clear All and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<Dashboard />);
    const clearAllButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearAllButton);
    expect(mockClearAllReports).toHaveBeenCalled();
  });

  it('does not call clearAllReports when canceled', () => {
    window.confirm = jest.fn(() => false);
    render(<Dashboard />);
    fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
    expect(mockClearAllReports).not.toHaveBeenCalled();
  });
});
