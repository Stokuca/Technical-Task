import React, { ComponentProps, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

import ReportEditor from '../components/ReportEditor';

export default {
  title: 'Components/ReportEditor',
  component: ReportEditor,
} as Meta<typeof ReportEditor>;

const Template: StoryFn<typeof ReportEditor> = (args: ComponentProps<typeof ReportEditor>) => {
  const [title, setTitle] = useState(args.title);
  const [content, setContent] = useState(args.content);

  return (
    <ReportEditor
      {...args}
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  editingId: null,
  title: 'Example Title',
  content: '<p>This is sample content.</p>',
  clearEditing: () => alert('Clear editing'),
};

export const EditingMode = Template.bind({});
EditingMode.args = {
  editingId: '123',
  title: 'Editing Existing Report',
  content: '<p>This report is being edited.</p>',
  clearEditing: () => alert('Clear editing'),
};
