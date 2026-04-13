import { useState, useCallback } from 'react';
import { Task, ColumnId, initialTasks, generateId, Priority, teamMembers } from '@/lib/kanban-data';

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getTasksByColumn = useCallback(
    (columnId: ColumnId) => tasks.filter((t) => t.columnId === columnId),
    [tasks]
  );

  const moveTask = useCallback((taskId: string, targetColumnId: ColumnId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task
      )
    );
  }, []);

  const addTask = useCallback(
    (data: { title: string; description: string; priority: Priority; assigneeId: string }) => {
      const assignee = teamMembers.find((m) => m.id === data.assigneeId) || teamMembers[0];
      const newTask: Task = {
        id: generateId(),
        title: data.title,
        description: data.description,
        priority: data.priority,
        assignee,
        columnId: 'todo',
        createdAt: new Date(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    []
  );

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  return { tasks, getTasksByColumn, moveTask, addTask, deleteTask };
}
