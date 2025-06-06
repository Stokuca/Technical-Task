import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { useReportStore } from '../store/reportStore';
import ReportEditor from '../components/ReportEditor';
import ReportListDraggable from '../components/ReportListDraggable';
import { Report } from '../types/report';

const Dashboard = () => {
  const reports = useReportStore((state) => state.reports);
  const updateReport = useReportStore((state) => state.updateReport);
  const reorderReports = useReportStore((state) => state.reorderReports);
  const clearAllReports = useReportStore((state) => state.clearAllReports);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (report: Report) => {
    setEditingId(report.id);
    setTitle(report.title);
    setContent(report.content);
  };

  const handleSummarize = async (report: Report) => {
    try {
      const summary = await summarizeContent(report.content);
      updateReport(report.id, { content: summary });
    } catch (err) {
      console.error('Failed to summarize:', err);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all reports?')) {
      clearAllReports();
    }
  };

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        sx={{ my: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ReportEditor
        editingId={editingId}
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        clearEditing={() => setEditingId(null)}
      />

      {/* Clear All dugme */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearAll}
          disabled={reports.length === 0}
        >
          Clear All
        </Button>
      </Stack>

      {filteredReports.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, ml: 1 }}>
          No reports found.
        </Typography>
      ) : (
        <ReportListDraggable
          reports={filteredReports}
          onEdit={handleEdit}
          onSummarize={handleSummarize}
          onReorder={reorderReports}
        />
      )}
    </Container>
  );
};

export default Dashboard;

async function summarizeContent(content: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`This is a summary of the content: "${content.slice(0, 50)}..."`);
    }, 1000);
  });
}
