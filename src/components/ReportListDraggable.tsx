import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Grid, Tooltip } from '@mui/material';
import { Report } from '../types/report';
import ReportCard from './ReportCard';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props {
  reports: Report[];
  onReorder: (newOrder: Report[]) => void;
  onEdit: (report: Report) => void;
  onSummarize: (report: Report) => void;
}

interface SortableItemProps {
    report: Report;
    children: React.ReactNode;
  }
  
const SortableItem: React.FC<SortableItemProps> = ({ report, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: report.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: transform ? 99 : 'auto',
      boxShadow: transform ? '0 5px 15px rgba(0,0,0,0.15)' : undefined,
      position: 'relative',
      backgroundColor: '#fff',
    };
  
    return (
      <Grid 
      component="div"
      ref={setNodeRef}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: transform ? 99 : 'auto',
        boxShadow: transform ? '0 5px 15px rgba(0,0,0,0.15)' : undefined,
        position: 'relative',
        backgroundColor: '#fff',
      }}>

        <Tooltip title="Drag to reorder" arrow>
          <Box
            {...listeners}
            {...attributes}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'grab',
              color: '#888',
              '&:hover': { color: '#333' },
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </Box>
        </Tooltip>
  
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      </Grid>
    );
  };
  

const ReportListDraggable: React.FC<Props> = ({
  reports,
  onReorder,
  onEdit,
  onSummarize,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = reports.findIndex((r) => r.id === active.id);
      const newIndex = reports.findIndex((r) => r.id === over?.id);
      const newOrder = arrayMove(reports, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={reports.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <Grid container spacing={2}>
          {reports.map((report) => (
            <SortableItem key={report.id} report={report}>
              <ReportCard
                report={report}
                onEdit={onEdit}
                onSummarize={onSummarize}
              />
            </SortableItem>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export default ReportListDraggable;
