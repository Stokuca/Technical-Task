import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Report } from '../types/report';

//Pristup kodu je svakako mogao biti jos modularniji u nekom realnom projektu mozda bi smo i UI komponente postavili na npm paket

interface Props {
  report: Report;
  onEdit: (report: Report) => void;
  onSummarize: (report: Report) => void;
}

const ReportCard: React.FC<Props> = ({ report, onEdit, onSummarize }) => {
  const [open, setOpen] = useState(false);

  const shouldShowLogButton =
    report.activityLog?.length > 1 || (report.activityLog?.[0]?.length ?? 0) > 20;

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {report.title}
          </Typography>

          <div
            dangerouslySetInnerHTML={{
              __html:
                report.content.slice(0, 500) +
                (report.content.length > 500 ? '...' : ''),
            }}
            style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}
          />

          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button variant="outlined" size="small" onClick={() => onEdit(report)}>
              Edit
            </Button>
            <Button variant="contained" size="small" onClick={() => onSummarize(report)}>
              Summarize
            </Button>
          </Stack>

          {report.activityLog?.length > 0 && (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
              Last activity: {report.activityLog[report.activityLog.length - 1]}
            </Typography>
          )}

          {shouldShowLogButton && (
            <Button
              size="small"
              variant="text"
              sx={{ mt: 1 }}
              onClick={() => setOpen(true)}
            >
              View Log
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Activity Log</DialogTitle>
        <DialogContent dividers>
          {report.activityLog?.map((entry, idx) => (
            <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
              • {entry}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportCard;
