"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { StatCard } from "../components/StatCard";
import { QuickActions, QuickAction } from "../components/QuickActions";
import { ActivityFeed } from "../components/ActivityFeed";
import { Breadcrumb } from "../components/Breadcrumb";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import {
    Home,
    Users,
    Settings,
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
    Clock,
    Database,
    ChevronsLeftRightEllipsis,
    Upload,
    Download,
    Trash2,
} from "lucide-react";

import { useAuthStore } from "../stores/auth";

import {
    announcements,
    activeProjects,
    activityEvents,
    dashboardStats,
} from "../data/dashboard";

const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Onboarding", href: "/onboarding", icon: FileText },
    { label: "Staff", href: "/staff", permissions: ["staff"], icon: Users },
    { label: "Data", href: "/data-demo", icon: Database },
    { label: "Statistics", href: "/statistics", permissions: [], icon: ChevronsLeftRightEllipsis },
    { label: "Settings", href: "/settings", permissions: ["settings"], icon: Settings },
];

export default function HomePage() {
    const { isAuthenticated, hydrated, user } = useAuthStore();
    const router = useRouter();

    // -----------------------------
    // ✅ CSV Upload State (frontend-only)
    // -----------------------------
    const [csvFile, setCsvFile] = useState<File | null>(null);

    // Download URL (Blob URL) - file değişince yenilenir
    const downloadUrl = useMemo(() => {
        if (!csvFile) return null;
        return URL.createObjectURL(csvFile);
    }, [csvFile]);

    // Blob URL cleanup
    useEffect(() => {
        return () => {
            if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        };
    }, [downloadUrl]);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        const mb = kb / 1024;
        return `${mb.toFixed(1)} MB`;
    };

    const isCsvFile = (file: File) => {
        const nameOk = file.name.toLowerCase().endsWith(".csv");
        // mime bazen boş gelebilir, o yüzden name kontrolü şart
        const typeOk = file.type === "text/csv" || file.type === "application/vnd.ms-excel" || file.type === "";
        return nameOk && typeOk;
    };

    const handleCsvSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isCsvFile(file)) {
            toast.error("Only .csv files are allowed.");
            e.target.value = ""; // aynı dosyayı tekrar seçebilmek için reset
            return;
        }

        setCsvFile(file);
        toast.success("CSV uploaded (frontend-only).");
        e.target.value = "";
    };

    const handleRemoveCsv = () => {
        setCsvFile(null);
        toast.success("File removed.");
    };

    const handleDownloadCsv = () => {
        if (!csvFile || !downloadUrl) return;
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = csvFile.name; // aynı isimle indirir
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    // -----------------------------
    // Auth redirect
    // -----------------------------
    useEffect(() => {
        if (hydrated && !isAuthenticated) {
            router.push("/login");
        }
    }, [hydrated, isAuthenticated, router]);

    if (!hydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const userRole = user?.role || "Employee";

    const quickActions: QuickAction[] = [
        {
            id: "1",
            label: "New Project",
            icon: FolderPlus,
            onClick: () => toast.success("Create new project clicked"),
            adminOnly: false,
        },
        {
            id: "2",
            label: "Add User",
            icon: UserPlus,
            onClick: () => toast.success("Add user clicked"),
            adminOnly: true,
        },
        {
            id: "3",
            label: "New Report",
            icon: FileText,
            onClick: () => toast.success("Create report clicked"),
            adminOnly: false,
        },
        {
            id: "4",
            label: "Announcement",
            icon: Plus,
            onClick: () => toast.success("Create announcement clicked"),
            adminOnly: true,
        },
    ];

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    const getPriorityVariant = (priority: string) => {
        switch (priority) {
            case "high":
                return "destructive";
            case "medium":
                return "default";
            default:
                return "secondary";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "on-hold":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "completed":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar menuItems={menuItems} />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6 overflow-auto bg-background">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <Breadcrumb />

                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-foreground">
                                Welcome back, {user?.name?.split(" ")[0] || "User"}!
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Here's what's happening with your workspace today.
                            </p>
                        </div>

                        <QuickActions actions={quickActions} userRole={userRole} />

                        {/* ✅ CSV Upload Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Upload className="size-5 text-primary" />
                                    <CardTitle>CSV Upload (Frontend-only)</CardTitle>
                                </div>
                                <CardDescription>
                                    Only .csv is accepted. Stored in frontend state only (no backend).
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Upload input */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <label className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors cursor-pointer w-fit">
                                        <Upload className="h-4 w-4" />
                                        Upload CSV
                                        <input
                                            type="file"
                                            accept=".csv,text/csv"
                                            className="hidden"
                                            onChange={handleCsvSelect}
                                        />
                                    </label>

                                    {csvFile ? (
                                        <div className="text-sm text-muted-foreground">
                                            Selected:{" "}
                                            <span className="font-semibold text-foreground">{csvFile.name}</span>{" "}
                                            ({formatBytes(csvFile.size)})
                                        </div>
                                    ) : (
                                        <div className="text-sm text-muted-foreground">
                                            No file selected.
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                {csvFile ? (
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={handleDownloadCsv}
                                            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download file
                                        </button>

                                        <button
                                            onClick={handleRemoveCsv}
                                            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Remove file
                                        </button>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>

                        {/* Stat cards */}
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

                        {/* Announcements + Active Projects */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                                            <Badge className={getStatusColor(project.status)} variant="secondary">
                                                                {project.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {project.description}
                                                        </p>
                                                    </div>
                                                </div>

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

                        {/* Activity */}
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
