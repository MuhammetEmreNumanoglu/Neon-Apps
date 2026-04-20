// Client-side rendering direktifi
'use client';

// Component imports
import { ProtectedRoute } from '../../components/ProtectedRoute'; // Route koruma
import { Header } from '../../components/Header'; // Üst header
import { Sidebar } from '../../components/Sidebar'; // Yan menü

// Lucide icon'ları - her ayar kategorisi için
import {
    Home,     // Ana sayfa
    Users,    // Staff
    Settings, // Ayarlar
    FileText, // Onboarding
    Bell,     // Bildirimler
    Shield,   // Güvenlik
    Palette,  // Görünüm
    Globe,    // Dil & Bölge
    Database,
    ChevronsLeftRightEllipsis// Data
} from 'lucide-react';

// Shadcn/ui component'leri
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch'; // Toggle switch
import { Label } from '../../components/ui/label'; // Form label
import { Button } from '../../components/ui/button'; // Buton
import { Separator } from '../../components/ui/separator'; // Ayırıcı çizgi

// Menü öğeleri konfigürasyonu
const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Onboarding', href: '/onboarding', icon: FileText },
    { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
    { label: 'Data', href: '/data-demo', icon: Database },
    { label: 'Statistics', href: '/statistics', permissions: [], icon: ChevronsLeftRightEllipsis },

    { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings }, // Permission gerekli
];

// Settings Sayfası Component'i
// Bu sayfa sadece 'settings' permission'ı olan kullanıcılara açıktır
// Uygulama ayarlarını yönetmek için kullanılır
export default function SettingsPage() {
    return (
        // ProtectedRoute wrapper - 'settings' permission kontrolü
        <ProtectedRoute requiredPermissions={["settings"]}>
            {/* Ana layout: Sidebar + Content */}
            <div className="flex h-screen">
                {/* Sol sidebar - navigasyon */}
                <Sidebar menuItems={menuItems} />

                {/* Sağ taraf: Header + Main */}
                <div className="flex-1 flex flex-col">
                    {/* Üst header */}
                    <Header />

                    {/* Ana içerik alanı */}
                    <main className="flex-1 p-6 overflow-auto bg-background">
                        {/* İçerik wrapper: Max genişlik 4xl (dar layout), dikey boşluklar */}
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Sayfa başlığı */}
                            <div>
                                <h1 className="text-4xl font-bold text-foreground mb-2">
                                    Settings
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Manage your application preferences and configurations
                                </p>
                            </div>

                            {/* Bildirimler Kartı */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        {/* Bell icon */}
                                        <Bell className="h-5 w-5 text-primary" />
                                        <CardTitle>Notifications</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Configure how you receive notifications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Email Notifications Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-notifications">Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive email updates about your account
                                            </p>
                                        </div>
                                        {/* Switch component - defaultChecked ile başlangıçta açık */}
                                        <Switch id="email-notifications" defaultChecked />
                                    </div>

                                    {/* Ayırıcı çizgi */}
                                    <Separator />

                                    {/* Push Notifications Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-notifications">Push Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications on your device
                                            </p>
                                        </div>
                                        {/* Switch - başlangıçta kapalı (defaultChecked yok) */}
                                        <Switch id="push-notifications" />
                                    </div>

                                    <Separator />

                                    {/* Marketing Emails Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="marketing">Marketing Emails</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about new features and updates
                                            </p>
                                        </div>
                                        <Switch id="marketing" defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Güvenlik Kartı */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        {/* Shield icon - güvenlik */}
                                        <Shield className="h-5 w-5 text-primary" />
                                        <CardTitle>Security</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Manage your security preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Two-Factor Authentication Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <Switch id="two-factor" />
                                    </div>

                                    <Separator />

                                    {/* Active Sessions - Button ile yönetim */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="session">Active Sessions</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Manage your active sessions across devices
                                            </p>
                                        </div>
                                        {/* Manage butonu - tıklanınca session yönetim sayfası açılır (şimdilik placeholder) */}
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Görünüm Kartı */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        {/* Palette icon - görünüm/tema */}
                                        <Palette className="h-5 w-5 text-primary" />
                                        <CardTitle>Appearance</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Customize how the application looks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Compact Mode Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="compact-mode">Compact Mode</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Use a more condensed layout
                                            </p>
                                        </div>
                                        <Switch id="compact-mode" />
                                    </div>

                                    <Separator />

                                    {/* Animations Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="animations">Animations</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Enable smooth transitions and effects
                                            </p>
                                        </div>
                                        {/* Animasyonlar varsayılan olarak açık */}
                                        <Switch id="animations" defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Dil & Bölge Kartı */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        {/* Globe icon - dil/bölge */}
                                        <Globe className="h-5 w-5 text-primary" />
                                        <CardTitle>Language & Region</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Set your language and regional preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Language Selection */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Language</Label>
                                            {/* Mevcut dil gösterimi */}
                                            <p className="text-sm text-muted-foreground">
                                                English (US)
                                            </p>
                                        </div>
                                        {/* Change butonu - dil değiştirme modal'ı açar (placeholder) */}
                                        <Button variant="outline" size="sm">Change</Button>
                                    </div>

                                    <Separator />

                                    {/* Timezone Selection */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Timezone</Label>
                                            {/* Mevcut timezone gösterimi */}
                                            <p className="text-sm text-muted-foreground">
                                                GMT+3 (Istanbul)
                                            </p>
                                        </div>
                                        {/* Change butonu - timezone değiştirme */}
                                        <Button variant="outline" size="sm">Change</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Danger Zone Kartı - Tehlikeli işlemler için */}
                            {/* Kırmızı border ile dikkat çekici */}
                            <Card className="border-destructive/50">
                                <CardHeader>
                                    {/* Kırmızı başlık - tehlike göstergesi */}
                                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                    <CardDescription>
                                        Irreversible and destructive actions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Account Deletion */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Delete Account</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Permanently delete your account and all data
                                            </p>
                                        </div>
                                        {/* Destructive button - kırmızı, tehlike */}
                                        {/* Gerçek uygulamada confirmation modal açılmalı */}
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}