import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PriorityBadge } from './PriorityBadge';
import { Task } from '@/lib/kanban-data';
import { GripVertical, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const initials = task.assignee.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`group cursor-grab active:cursor-grabbing border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 ${
          isDragging ? 'opacity-50 rotate-1 scale-105 shadow-lg' : ''
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <div className="mt-1 opacity-0 group-hover:opacity-40 transition-opacity">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm text-foreground leading-snug">
                  {task.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                {task.description}
              </p>
              <div className="flex items-center justify-between">
                <PriorityBadge priority={task.priority} />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground hidden sm:inline">
                    {task.assignee.name.split(' ')[0]}
                  </span>
                  <Avatar className="w-6 h-6 ring-2 ring-white">
                    <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} loading="lazy" />
                    <AvatarFallback className="text-[10px] font-medium bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
