import { ActivityEvent } from "../components/DashboardComponents";

export interface Announcement {
    id: string;
    title: string;
    content: string;
    date: Date;
    author: string;
    priority: "low" | "medium" | "high";
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "on-hold" | "completed";
    progress: number;
    team: string[];
    dueDate: Date;
}

export interface DashboardStats {
    totalUsers: number;
    activeProjects: number;
    completedTasks: number;
    revenue: string;
}

export const announcements: Announcement[] = [
    {
        id: "1",
        title: "Welcome to Q1 2026!",
        content: "Happy New Year! Let's make this quarter amazing with new features and improvements.",
        date: new Date("2026-01-15"),
        author: "Sarah Johnson",
        priority: "high",
    },
    {
        id: "2",
        title: "New Design System Released",
        content: "Our new design system is now live. Check the documentation for updated guidelines.",
        date: new Date("2026-01-18"),
        author: "Mike Chen",
        priority: "medium",
    },
    {
        id: "3",
        title: "Office Hours Update",
        content: "Reminder: Flexible hours are available for all team members. Please update your schedules.",
        date: new Date("2026-01-20"),
        author: "HR Department",
        priority: "low",
    },
];

export const activeProjects: Project[] = [
    {
        id: "1",
        name: "Mobile App Redesign",
        description: "Complete overhaul of our mobile application with new UI/UX",
        status: "active",
        progress: 65,
        team: ["Alice Cooper", "Bob Smith", "Charlie Brown"],
        dueDate: new Date("2026-03-15"),
    },
    {
        id: "2",
        name: "API v3 Migration",
        description: "Migrate all endpoints to new API version with improved performance",
        status: "active",
        progress: 40,
        team: ["Diana Prince", "Evan Wright"],
        dueDate: new Date("2026-02-28"),
    },
    {
        id: "3",
        name: "Dashboard Analytics",
        description: "Build comprehensive analytics dashboard for business insights",
        status: "active",
        progress: 85,
        team: ["Frank Ocean", "Grace Lee", "Henry Ford"],
        dueDate: new Date("2026-01-30"),
    },
    {
        id: "4",
        name: "Security Audit",
        description: "Complete security review and implementation of fixes",
        status: "on-hold",
        progress: 30,
        team: ["Iris West", "Jack Ryan"],
        dueDate: new Date("2026-04-01"),
    },
];

export const activityEvents: ActivityEvent[] = [
    {
        id: "1",
        type: "user",
        title: "New team member joined",
        description: "Welcome Alex Martinez to the development team!",
        timestamp: new Date("2026-01-21T10:30:00"),
        user: "HR Department",
    },
    {
        id: "2",
        type: "project",
        title: "Dashboard Analytics milestone reached",
        description: "Project is now 85% complete, on track for deadline",
        timestamp: new Date("2026-01-21T09:15:00"),
        user: "Frank Ocean",
    },
    {
        id: "3",
        type: "announcement",
        title: "New announcement posted",
        description: "Office Hours Update has been published",
        timestamp: new Date("2026-01-20T14:00:00"),
        user: "HR Department",
    },
    {
        id: "4",
        type: "project",
        title: "Mobile App Redesign updated",
        description: "New UI mockups approved by stakeholders",
        timestamp: new Date("2026-01-20T11:45:00"),
        user: "Alice Cooper",
    },
    {
        id: "5",
        type: "system",
        title: "System maintenance completed",
        description: "Scheduled maintenance finished successfully with zero downtime",
        timestamp: new Date("2026-01-19T23:00:00"),
    },
    {
        id: "6",
        type: "user",
        title: "Profile updated",
        description: "Bob Smith updated their role and department information",
        timestamp: new Date("2026-01-19T16:20:00"),
        user: "Bob Smith",
    },
    {
        id: "7",
        type: "project",
        title: "API v3 Migration progress",
        description: "Successfully migrated 15 endpoints to new version",
        timestamp: new Date("2026-01-18T13:30:00"),
        user: "Diana Prince",
    },
    {
        id: "8",
        type: "announcement",
        title: "Design system announcement",
        description: "New Design System Released announcement posted",
        timestamp: new Date("2026-01-18T10:00:00"),
        user: "Mike Chen",
    },
];

export const dashboardStats: DashboardStats = {
    totalUsers: 2543,
    activeProjects: 12,
    completedTasks: 847,
    revenue: "$1.2M",
};
