import { Box, Button, TextField, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useReportStore } from '../store/reportStore';
import { generateContentFromTitle } from '../api/openai';

interface Props {
  editingId: string | null;
  title: string;
  content: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  clearEditing: () => void;
}

const ReportEditor: React.FC<Props> = ({
  editingId,
  title,
  content,
  setTitle,
  setContent,
  clearEditing,
}) => {
  const { addReport, updateReport } = useReportStore();
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    if (!title || !content) return;

    if (editingId) {
      updateReport(editingId, { title, content });

      clearEditing();
    } else {
      addReport(title, content);
    }

    setTitle('');
    setContent('');
  };

  const handleGenerate = async () => {
    if (!title || loading) return;
    setLoading(true);
    try {
      const generated = await generateContentFromTitle(title);
      setContent(generated);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {editingId ? 'Edit Report' : 'Create New Report'}
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        onClick={handleGenerate}
        variant="outlined"
        sx={{ mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate with AI'}
      </Button>

      <Editor
        apiKey="e234vixbab3tyn6yqvmu1amatnfkmrpqlb73a1tc7f3q7bu0"
        init={{
          height: 250,
          menubar: false,
          plugins: ['lists', 'link', 'autoresize'],
          toolbar: 'undo redo | bold italic underline | bullist numlist | link',
          branding: false,
        }}
        value={content}
        onEditorChange={(c) => setContent(c)}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={handleSave}>
          {editingId ? 'Update Report' : 'Save Report'}
        </Button>
        {editingId && (
          <Button variant="outlined" color="secondary" onClick={clearEditing}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ReportEditor;
