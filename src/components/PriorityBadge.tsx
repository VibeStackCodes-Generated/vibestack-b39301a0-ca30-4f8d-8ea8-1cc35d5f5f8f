import { Badge } from '@/components/ui/badge';
import { Priority } from '@/lib/kanban-data';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

const priorityConfig: Record<Priority, { label: string; className: string; icon: React.ReactNode }> = {
  high: {
    label: 'High',
    className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    icon: <ArrowUp className="w-3 h-3" />,
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    icon: <ArrowRight className="w-3 h-3" />,
  },
  low: {
    label: 'Low',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    icon: <ArrowDown className="w-3 h-3" />,
  },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority];
  return (
    <Badge variant="outline" className={`${config.className} text-xs font-medium gap-1 px-2 py-0.5`}>
      {config.icon}
      {config.label}
    </Badge>
  );
}
