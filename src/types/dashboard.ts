/**
 * Dashboard Type Definitions
 */

export interface Announcement {
    id: number;
    title: string;
    content: string;
    priority: 'high' | 'medium' | 'low';
    author: string;
    date: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'planning';
    progress: number;
    team: string[];
    dueDate: string;
}

export interface DashboardStats {
    totalUsers: string;
    activeProjects: string;
    completedTasks: string;
    revenue: string;
}

export interface ActivityEvent {
    id: number;
    type: 'user' | 'project' | 'task' | 'file';
    user: string;
    action: string;
    target: string;
    timestamp: string;
}

export interface QuickAction {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    adminOnly: boolean;
}
