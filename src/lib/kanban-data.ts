export type Priority = 'high' | 'medium' | 'low';
export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: Assignee;
  columnId: ColumnId;
  createdAt: Date;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
  dotColor: string;
}

export const columns: Column[] = [
  { id: 'todo', title: 'To Do', color: 'bg-[var(--color-column-todo)]', dotColor: 'bg-slate-400' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-[var(--color-column-progress)]', dotColor: 'bg-primary' },
  { id: 'done', title: 'Done', color: 'bg-[var(--color-column-done)]', dotColor: 'bg-emerald-500' },
];

export const teamMembers: Assignee[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'https://img.vibestack.site/s/woman%20professional%20headshot%20studio/200/200' },
  { id: '2', name: 'Marcus Johnson', avatar: 'https://img.vibestack.site/s/man%20professional%20headshot%20studio/200/200' },
  { id: '3', name: 'Emily Rodriguez', avatar: 'https://img.vibestack.site/s/woman%20smiling%20headshot%20professional/200/200' },
  { id: '4', name: 'David Kim', avatar: 'https://img.vibestack.site/s/man%20smiling%20headshot%20professional/200/200' },
  { id: '5', name: 'Aisha Patel', avatar: 'https://img.vibestack.site/s/woman%20confident%20headshot%20studio/200/200' },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design new landing page',
    description: 'Create wireframes and high-fidelity mockups for the Q3 marketing campaign landing page.',
    priority: 'high',
    assignee: teamMembers[0],
    columnId: 'todo',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'task-2',
    title: 'Update API documentation',
    description: 'Review and update the REST API docs to reflect the v2.4 endpoint changes.',
    priority: 'medium',
    assignee: teamMembers[1],
    columnId: 'todo',
    createdAt: new Date('2024-03-11'),
  },
  {
    id: 'task-3',
    title: 'Fix mobile nav overflow',
    description: 'Navigation menu items overflow on screens smaller than 375px. Needs responsive fix.',
    priority: 'high',
    assignee: teamMembers[2],
    columnId: 'todo',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 'task-4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment to staging.',
    priority: 'low',
    assignee: teamMembers[3],
    columnId: 'todo',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 'task-5',
    title: 'Implement user auth flow',
    description: 'Build login, registration, and password reset screens with JWT token handling.',
    priority: 'high',
    assignee: teamMembers[3],
    columnId: 'in-progress',
    createdAt: new Date('2024-03-08'),
  },
  {
    id: 'task-6',
    title: 'Database migration script',
    description: 'Write migration to add user preferences table and seed default values.',
    priority: 'medium',
    assignee: teamMembers[1],
    columnId: 'in-progress',
    createdAt: new Date('2024-03-09'),
  },
  {
    id: 'task-7',
    title: 'Performance audit',
    description: 'Run Lighthouse audit and optimize Core Web Vitals scores for the dashboard.',
    priority: 'low',
    assignee: teamMembers[4],
    columnId: 'in-progress',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'task-8',
    title: 'Setup error monitoring',
    description: 'Integrate Sentry for real-time error tracking and alerting in production.',
    priority: 'medium',
    assignee: teamMembers[0],
    columnId: 'done',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 'task-9',
    title: 'Design system tokens',
    description: 'Define color, typography, and spacing tokens for the component library.',
    priority: 'high',
    assignee: teamMembers[2],
    columnId: 'done',
    createdAt: new Date('2024-03-04'),
  },
  {
    id: 'task-10',
    title: 'Onboarding flow prototype',
    description: 'Create interactive prototype for the new user onboarding experience.',
    priority: 'low',
    assignee: teamMembers[4],
    columnId: 'done',
    createdAt: new Date('2024-03-06'),
  },
];

export function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
