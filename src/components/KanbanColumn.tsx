import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Column, Task, ColumnId } from '@/lib/kanban-data';
import { AnimatePresence } from 'framer-motion';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onMoveTask: (taskId: string, columnId: ColumnId) => void;
  onDeleteTask: (taskId: string) => void;
}

export function KanbanColumn({ column, tasks, onMoveTask, onDeleteTask }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onMoveTask(taskId, column.id);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl transition-all duration-200 ${
        isDragOver
          ? 'bg-primary/5 ring-2 ring-primary/30 ring-dashed'
          : column.color
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`} />
          <h2 className="font-semibold text-sm text-foreground">{column.title}</h2>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-foreground/8 text-[11px] font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 px-3 pb-3 space-y-2.5 kanban-column overflow-y-auto min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className={`flex items-center justify-center h-32 rounded-lg border-2 border-dashed transition-colors ${
            isDragOver ? 'border-primary/40 bg-primary/5' : 'border-border/50'
          }`}>
            <p className="text-xs text-muted-foreground">
              {isDragOver ? 'Drop here' : 'No tasks yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
