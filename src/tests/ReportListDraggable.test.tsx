import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportListDraggable from '../components/ReportListDraggable';
import { Report } from '../types/report';

const mockReports: Report[] = [
  { id: '1', title: 'Report 1', content: 'Content 1', createdAt: '', updatedAt: '', activityLog: [] },
  { id: '2', title: 'Report 2', content: 'Content 2', createdAt: '', updatedAt: '', activityLog: [] },
];

describe('ReportListDraggable', () => {
  const onReorder = jest.fn();
  const onEdit = jest.fn();
  const onSummarize = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all reports', () => {
    render(
      <ReportListDraggable
        reports={mockReports}
        onReorder={onReorder}
        onEdit={onEdit}
        onSummarize={onSummarize}
      />
    );

    expect(screen.getByText('Report 1')).toBeInTheDocument();
    expect(screen.getByText('Report 2')).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    render(
      <ReportListDraggable
        reports={mockReports}
        onReorder={onReorder}
        onEdit={onEdit}
        onSummarize={onSummarize}
      />
    );

    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(onEdit).toHaveBeenCalledWith(mockReports[0]);
  });

  it('calls onSummarize when Summarize button is clicked', () => {
    render(
      <ReportListDraggable
        reports={mockReports}
        onReorder={onReorder}
        onEdit={onEdit}
        onSummarize={onSummarize}
      />
    );

    fireEvent.click(screen.getAllByText('Summarize')[0]);
    expect(onSummarize).toHaveBeenCalledWith(mockReports[0]);
  });

});
