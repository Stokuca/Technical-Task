import React from 'react';
import ReportCard from '../components/ReportCard';
import { Report } from '../types/report';

export default {
  title: 'Components/ReportCard',
  component: ReportCard,
};

const exampleReport: Report = {
    id: '1',
    title: 'Example Report',
    content: 'This is a sample content for Storybook.',
    createdAt: '',
    updatedAt: '',
    activityLog: []
};

export const Default = () => (
  <ReportCard
    report={exampleReport}
    onEdit={() => alert('Edit')}
    onSummarize={() => alert('Summarize')}
  />
);
