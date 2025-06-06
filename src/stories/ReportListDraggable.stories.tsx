import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-webpack5';
import ReportListDraggable from '../components/ReportListDraggable';
import { Report } from '../types/report';

export default {
  title: 'Components/ReportListDraggable',
  component: ReportListDraggable,
} as Meta<typeof ReportListDraggable>;

const mockReports: Report[] = [
  { id: '1', title: 'Report One', content: 'Content One', createdAt: '', updatedAt: '', activityLog: [] },
  { id: '2', title: 'Report Two', content: 'Content Two', createdAt: '', updatedAt: '', activityLog: [] },
];

const Template: StoryFn<typeof ReportListDraggable> = (args) => <ReportListDraggable {...args} />;

export const Default = Template.bind({});
Default.args = {
  reports: mockReports,
  onReorder: (newOrder: Report[]) => console.log('Reordered:', newOrder),
  onEdit: (report: Report) => alert(`Edit: ${report.title}`),
  onSummarize: (report: Report) => alert(`Summarize: ${report.title}`),
};
