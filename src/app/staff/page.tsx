/**
 * Staff Page
 * 
 * Personel listesi ve arama sayfasi.
 */
'use client';

import { useMemo, useState } from 'react';
import { AppLayout } from '../../components/AppLayout';
import { Card } from '../../components/Card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { staffData } from '../../data/staff';
import { Search } from 'lucide-react';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function StaffPage() {
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');

    const departments = ['All', ...Array.from(new Set(staffData.members.map(m => m.dept)))];

    const filteredMembers = useMemo(() => {
        return staffData.members.filter(member => {
            const matchesSearch =
                member.name.toLowerCase().includes(search.toLowerCase()) ||
                member.email.toLowerCase().includes(search.toLowerCase());
            const matchesDept = deptFilter === 'All' || member.dept === deptFilter;
            return matchesSearch && matchesDept;
        });
    }, [search, deptFilter]);

    return (
        <ProtectedRoute requiredPermissions={['staff']}>
            <AppLayout>
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">Staff Management</h1>
                        <p className="text-muted-foreground">Manage and view all staff members</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search staff..."
                                className="pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Select value={deptFilter} onValueChange={setDeptFilter}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map(d => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {filteredMembers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredMembers.map(member => (
                                <Card
                                    key={member.id}
                                    variant="staff"
                                    name={member.name}
                                    department={member.dept}
                                    zodiac={member.zodiac}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border rounded-lg bg-muted/10">
                            <p className="text-muted-foreground">No staff members found.</p>
                        </div>
                    )}
                </div>
            </AppLayout>
        </ProtectedRoute>
    );
}
