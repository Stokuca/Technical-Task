import React from 'react';
import { render, screen, fireEvent, within, waitForElementToBeRemoved } from '@testing-library/react';
import ReportCard from '../components/ReportCard';
import { Report } from '../types/report';

const mockReport: Report = {
  id: '1',
  title: 'Test Report',
  content: 'This is test content that is long enough to be sliced for the card view. ' +
           'It should be shown partially in the card and fully in the modal if needed.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  activityLog: ['Created manually', 'Updated with summary'],
};

describe('ReportCard', () => {
  it('renders report title, content and buttons', () => {
    render(
      <ReportCard
        report={mockReport}
        onEdit={jest.fn()}
        onSummarize={jest.fn()}
      />
    );

    // Checks
    expect(screen.getByText('Test Report')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Summarize')).toBeInTheDocument();
    expect(screen.getByText('View Log')).toBeInTheDocument();
    expect(screen.getByText(/Updated with summary/i)).toBeInTheDocument();
  });



  it('opens and closes activity log modal', async () => {
    render(
      <ReportCard
        report={mockReport}
        onEdit={jest.fn()}
        onSummarize={jest.fn()}
      />
    );
  
    fireEvent.click(screen.getByText('View Log'));
  
    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText('Activity Log')).toBeInTheDocument();
    expect(within(modal).getByText(/Created manually/)).toBeInTheDocument();
    expect(within(modal).getByText(/Updated with summary/)).toBeInTheDocument();
  
    fireEvent.click(within(modal).getByText('Close'));
  
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });
  
  

  it('calls onEdit handler', () => {
    const handleEdit = jest.fn();

    render(
      <ReportCard
        report={mockReport}
        onEdit={handleEdit}
        onSummarize={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(mockReport);
  });

  it('calls onSummarize handler', () => {
    const handleSummarize = jest.fn();

    render(
      <ReportCard
        report={mockReport}
        onEdit={jest.fn()}
        onSummarize={handleSummarize}
      />
    );

    fireEvent.click(screen.getByText('Summarize'));
    expect(handleSummarize).toHaveBeenCalledTimes(1);
    expect(handleSummarize).toHaveBeenCalledWith(mockReport);
  });
});
