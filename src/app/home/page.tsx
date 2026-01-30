"use client";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/auth";
import { announcements, activeProjects, activityEvents, dashboardStats } from "../../data/dashboard";
import { FolderPlus, UserPlus, FileText, Plus, Upload, Download, Trash2, Users, FolderOpen, CheckCircle2, DollarSign, Megaphone, Calendar, Clock } from "lucide-react";
import { AppLayout } from "../../components/AppLayout";
import { Card } from "../../components/Card";
import { ActivityFeed, QuickActions, QuickAction } from "../../components/DashboardComponents";
import { Card as BaseCard, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";


export default function HomePage() {
    const { isAuthenticated, hydrated, user } = useAuthStore();
    const router = useRouter();
    const [csvFile, setCsvFile] = useState<File | null>(null);

    // Auth redirect
    useEffect(() => {
        if (hydrated && !isAuthenticated) router.push("/");
    }, [hydrated, isAuthenticated, router]);

    const downloadUrl = useMemo(() => csvFile ? URL.createObjectURL(csvFile) : null, [csvFile]);

    const handleCsvSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name.endsWith(".csv")) {
            setCsvFile(file);
            toast.success("CSV uploaded");
        } else {
            toast.error("Only .csv files allowed");
        }
        e.target.value = "";
    };

    const dashboardActions: QuickAction[] = [
        { id: "1", label: "New Project", icon: FolderPlus, onClick: () => toast.success("New Project"), adminOnly: false },
        { id: "2", label: "Add User", icon: UserPlus, onClick: () => toast.success("Add User"), adminOnly: true },
        { id: "3", label: "New Report", icon: FileText, onClick: () => toast.success("New Report"), adminOnly: false },
        { id: "4", label: "Announcement", icon: Plus, onClick: () => toast.success("New Announcement"), adminOnly: true },
    ];

    if (!hydrated) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    if (!isAuthenticated) return null;

    return (

        <AppLayout>

            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Welcome back, {user?.name.split(" ")[0]}!</h1>
                <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your workspace today.</p>
            </div>

            {/* Quick Actions */}
            <QuickActions actions={dashboardActions} userRole={user?.role as "Admin" | "Employee"} />

            {/* CSV Upload (Frontend Only) */}
            <BaseCard>
                <CardHeader>
                    <div className="flex items-center gap-2"><Upload className="size-5 text-primary" /><CardTitle>CSV Upload</CardTitle></div>
                    <CardDescription>Frontend only demo. Only .csv files.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                    <label className="btn btn-outline cursor-pointer border px-4 py-2 rounded hover:bg-muted flex gap-2">
                        <Upload className="size-4" /> Upload CSV
                        <input type="file" accept=".csv" className="hidden" onChange={handleCsvSelect} />
                    </label>
                    {csvFile && (
                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-semibold">{csvFile.name}</span>
                            <button onClick={() => {
                                const a = document.createElement("a");
                                a.href = downloadUrl!;
                                a.download = csvFile.name;
                                a.click();
                            }} className="p-2 border rounded hover:bg-muted">
                                <Download className="size-4" /></button>
                            <button onClick={() => setCsvFile(null)} className="p-2 border rounded hover:bg-muted text-destructive">
                                <Trash2 className="size-4" /></button>
                        </div>
                    )}
                </CardContent>
            </BaseCard>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card variant="stat" icon={<Users className="size-5 text-primary" />} value={dashboardStats.totalUsers} label="Total Users" change={{ value: "+12%", type: "increase" }} />
                <Card variant="stat" icon={<FolderOpen className="size-5 text-primary" />} value={dashboardStats.activeProjects} label="Active Projects" change={{ value: "2 ending soon", type: "neutral" }} />
                <Card variant="stat" icon={<CheckCircle2 className="size-5 text-primary" />} value={dashboardStats.completedTasks} label="Completed Tasks" change={{ value: "+8%", type: "increase" }} />
                <Card variant="stat" icon={<DollarSign className="size-5 text-primary" />} value={dashboardStats.revenue} label="Total Revenue" change={{ value: "+15%", type: "increase" }} />
            </div>

            {/* Announcements & Projects */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Announcements */}
                <BaseCard className="lg:col-span-1">
                    <CardHeader><div className="flex gap-2"><Megaphone className="size-5 text-primary" /><CardTitle>Announcements</CardTitle></div></CardHeader>
                    <CardContent className="space-y-4">
                        {announcements.map(a => (
                            <Link key={a.id} href={`/announcements/${a.id}`}>
                                <div className="p-3 border rounded bg-muted/20 hover:bg-muted/40 transition cursor-pointer">
                                    <div className="flex justify-between mb-1"><span className="font-semibold text-sm">{a.title}</span><Badge variant={a.priority === 'high' ? 'destructive' : 'secondary'}>{a.priority}</Badge></div>
                                    <p className="text-xs text-muted-foreground mb-2">{a.content}</p>
                                    <div className="flex gap-3 text-[10px] text-muted-foreground"><span className="flex gap-1"><Calendar className="size-3" /> {new Date(a.date).toLocaleDateString()}</span><span>{a.author}</span></div>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </BaseCard>


                {/* Active Projects */}
                <BaseCard className="lg:col-span-2">
                    <CardHeader><div className="flex gap-2"><FolderOpen className="size-5 text-primary" /><CardTitle>Active Projects</CardTitle></div></CardHeader>
                    <CardContent className="space-y-4">
                        {activeProjects.map(p => (
                            <div key={p.id} className="p-4 border rounded bg-muted/10 hover:shadow-md transition">
                                <div className="flex justify-between mb-2">
                                    <div><h4 className="font-semibold">{p.name}</h4><p className="text-sm text-muted-foreground">{p.description}</p></div>
                                    <Badge variant="outline" className={p.status === 'active' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'}>{p.status}</Badge>
                                </div>
                                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mb-2"><div className="bg-primary h-full transition-all" style={{ width: `${p.progress}%` }} /></div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span className="flex gap-1"><Users className="size-3" /> {p.team.length} members</span>
                                    <span className="flex gap-1"><Clock className="size-3" /> Due {new Date(p.dueDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </BaseCard>
            </div>

            {/* Activity Feed */}
            <BaseCard>
                <CardHeader><CardTitle>Recent Activity</CardTitle><CardDescription>Latest updates across your workspace</CardDescription></CardHeader>
                <CardContent><ActivityFeed events={activityEvents} maxItems={6} /></CardContent>
            </BaseCard>

        </AppLayout>
    );
}
