import { KanbanColumn } from '@/components/KanbanColumn';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { useKanban } from '@/hooks/useKanban';
import { columns } from '@/lib/kanban-data';
import { LayoutDashboard, Search, Bell, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

export default function Index() {
  const { getTasksByColumn, moveTask, addTask, deleteTask } = useKanban();
  const [searchQuery, setSearchQuery] = useState('');

  const filterTasks = (columnId: string) => {
    const tasks = getTasksByColumn(columnId as any);
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.assignee.name.toLowerCase().includes(q)
    );
  };

  const totalTasks = columns.reduce((acc, col) => acc + getTasksByColumn(col.id).length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground leading-none">TaskFlow</h1>
                <p className="text-[11px] text-muted-foreground">Sprint 14 — Week 3</p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center relative max-w-xs flex-1 mx-8">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              {/* Team Avatars */}
              <div className="hidden sm:flex items-center -space-x-2">
                <Avatar className="w-8 h-8 ring-2 ring-white">
                  <AvatarImage src="https://img.vibestack.site/s/woman%20professional%20headshot%20studio/200/200" alt="Sarah" loading="lazy" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 ring-2 ring-white">
                  <AvatarImage src="https://img.vibestack.site/s/man%20professional%20headshot%20studio/200/200" alt="Marcus" loading="lazy" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 ring-2 ring-white">
                  <AvatarImage src="https://img.vibestack.site/s/woman%20smiling%20headshot%20professional/200/200" alt="Emily" loading="lazy" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted ring-2 ring-white text-[11px] font-medium text-muted-foreground">
                  +2
                </div>
              </div>

              <AddTaskDialog onAddTask={addTask} />
            </div>
          </div>
        </div>
      </header>

      {/* Board Stats */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Project Board</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalTasks} tasks across {columns.length} columns
            </p>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-0"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5" />
              Filter by assignee
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filterTasks(column.id)}
              onMoveTask={moveTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
