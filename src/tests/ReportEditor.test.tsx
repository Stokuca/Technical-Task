import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReportEditor from '../components/ReportEditor';
import { useReportStore } from '../store/reportStore';
import { generateContentFromTitle } from '../api/openai';

jest.mock('../store/reportStore', () => ({
  useReportStore: jest.fn(),
}));

jest.mock('../api/openai', () => ({
  generateContentFromTitle: jest.fn(() => Promise.resolve('Generated content')),
}));

const mockAddReport = jest.fn();
const mockUpdateReport = jest.fn();

describe('ReportEditor', () => {
  const setTitle = jest.fn();
  const setContent = jest.fn();
  const clearEditing = jest.fn();

  const defaultProps = {
    editingId: null,
    title: 'Test Title',
    content: '<p>Test Content</p>',
    setTitle,
    setContent,
    clearEditing,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useReportStore as unknown as jest.Mock).mockReturnValue({
      addReport: mockAddReport,
      updateReport: mockUpdateReport,
    });
  });

  it('renders input fields and buttons', () => {
    render(<ReportEditor {...defaultProps} />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByText('Generate with AI')).toBeInTheDocument();
    expect(screen.getByText('Save Report')).toBeInTheDocument();
  });

  it('calls addReport on save when not editing', () => {
    render(<ReportEditor {...defaultProps} />);
    fireEvent.click(screen.getByText('Save Report'));
    expect(mockAddReport).toHaveBeenCalledWith('Test Title', '<p>Test Content</p>');
  });

  it('calls updateReport and clearEditing on save when editing', () => {
    render(<ReportEditor {...defaultProps} editingId="123" />);
    fireEvent.click(screen.getByText('Update Report'));
    expect(mockUpdateReport).toHaveBeenCalledWith('123', {
      title: 'Test Title',
      content: '<p>Test Content</p>',
    });
    expect(clearEditing).toHaveBeenCalled();
  });

  it('calls setContent with generated content on generate click', async () => {
    render(<ReportEditor {...defaultProps} />);
  
    fireEvent.click(screen.getByText('Generate with AI'));
  
    await waitFor(() => {
      expect(setContent).toHaveBeenCalled();
    });
  });
  

  it('disables Generate button when loading', async () => {
    (generateContentFromTitle as jest.Mock).mockImplementation(
      () => new Promise((res) => setTimeout(() => res('slow content'), 500))
    );

    render(<ReportEditor {...defaultProps} />);
    fireEvent.click(screen.getByText('Generate with AI'));

    expect(screen.getByText('Generating...')).toBeDisabled();
  });
});
