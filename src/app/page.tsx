"use client";

import { StatCard } from '../components/StatCard';
import { QuickActions, QuickAction } from '../components/QuickActions';
import { ActivityFeed } from '../components/ActivityFeed';
import { Breadcrumb } from '../components/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import {
  Home,
  Users,
  Settings,
  Building2,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Plus,
  UserPlus,
  FolderPlus,
  FileText,
  Megaphone,
  FolderOpen,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  announcements,
  activeProjects,
  activityEvents,
  dashboardStats
} from '../data/dashboard';
import { toast } from 'sonner';

const menuItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Onboarding', href: '/onboarding', icon: FileText },
  { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
  { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings },
];

export default function HomePage() {
  const { isAuthenticated, hydrated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const userRole = user?.role || 'Employee';

  // Quick actions configuration
  const quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'New Project',
      icon: FolderPlus,
      onClick: () => toast.success('Create new project clicked'),
      adminOnly: false,
    },
    {
      id: '2',
      label: 'Add User',
      icon: UserPlus,
      onClick: () => toast.success('Add user clicked'),
      adminOnly: true,
    },
    {
      id: '3',
      label: 'New Report',
      icon: FileText,
      onClick: () => toast.success('Create report clicked'),
      adminOnly: false,
    },
    {
      id: '4',
      label: 'Announcement',
      icon: Plus,
      onClick: () => toast.success('Create announcement clicked'),
      adminOnly: true,
    },
  ];

  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Get priority badge variant
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto bg-background">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's what's happening with your workspace today.
              </p>
            </div>

            {/* Quick Actions */}
            <QuickActions actions={quickActions} userRole={userRole} />

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard>
                <StatCard.Icon>
                  <Users className="size-5 text-primary" />
                </StatCard.Icon>
                <StatCard.Value>{dashboardStats.totalUsers.toLocaleString()}</StatCard.Value>
                <StatCard.Label>Total Users</StatCard.Label>
                <StatCard.Change type="increase">+12% from last month</StatCard.Change>
              </StatCard>

              <StatCard>
                <StatCard.Icon>
                  <FolderOpen className="size-5 text-primary" />
                </StatCard.Icon>
                <StatCard.Value>{dashboardStats.activeProjects}</StatCard.Value>
                <StatCard.Label>Active Projects</StatCard.Label>
                <StatCard.Change type="neutral">2 ending this week</StatCard.Change>
              </StatCard>

              <StatCard>
                <StatCard.Icon>
                  <CheckCircle2 className="size-5 text-primary" />
                </StatCard.Icon>
                <StatCard.Value>{dashboardStats.completedTasks}</StatCard.Value>
                <StatCard.Label>Completed Tasks</StatCard.Label>
                <StatCard.Change type="increase">+8% from last week</StatCard.Change>
              </StatCard>

              <StatCard>
                <StatCard.Icon>
                  <DollarSign className="size-5 text-primary" />
                </StatCard.Icon>
                <StatCard.Value>{dashboardStats.revenue}</StatCard.Value>
                <StatCard.Label>Total Revenue</StatCard.Label>
                <StatCard.Change type="increase">+15% from last quarter</StatCard.Change>
              </StatCard>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Announcements Section */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Megaphone className="size-5 text-primary" />
                      <CardTitle>Announcements</CardTitle>
                    </div>
                    <CardDescription>Latest updates and news</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="p-4 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-accent/40 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.01] dark:bg-card dark:backdrop-blur-none"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-sm">{announcement.title}</h4>
                          <Badge variant={getPriorityVariant(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {announcement.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {formatDate(announcement.date)}
                          </span>
                          <span>{announcement.author}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Active Projects Section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="size-5 text-primary" />
                      <CardTitle>Active Projects</CardTitle>
                    </div>
                    <CardDescription>Track your ongoing work</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-accent/40 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.01] dark:bg-card dark:backdrop-blur-none"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{project.name}</h4>
                              <Badge
                                className={getStatusColor(project.status)}
                                variant="secondary"
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">Progress</span>
                            <span className="text-xs text-muted-foreground">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="size-3" />
                            <span>{project.team.length} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            <span>Due {formatDate(project.dueDate)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Activity Feed Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-primary" />
                  <CardTitle>Recent Activity</CardTitle>
                </div>
                <CardDescription>Latest updates across your workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed events={activityEvents} maxItems={8} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
