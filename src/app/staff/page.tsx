'use client';

// React
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Veri import'u - staff üyelerinin bilgileri
import { staffData } from '../../data/staff';

// Component imports
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

// Lucide icon'ları
import { Home, Users, Settings, FileText, Database, Search, ArrowUpDown, ChevronsLeftRightEllipsis } from 'lucide-react';

// Menü öğeleri
const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Onboarding', href: '/onboarding', icon: FileText },
    { label: 'Staff', href: '/staff', permissions: ['staff'], icon: Users },
    { label: 'Data', href: '/data-demo', icon: Database },
    { label: 'Statistics', href: '/statistics', permissions: [], icon: ChevronsLeftRightEllipsis },

    { label: 'Settings', href: '/settings', permissions: ['settings'], icon: Settings },
];

// ---- Types (opsiyonel ama güvenli) ----
type StaffMember = {
    id: string | number;
    name: string;
    email: string;
    dept: string;
};

type SortKey = 'name' | 'dept';
type SortDir = 'asc' | 'desc';

// ---- Debounce hook (300ms) ----
function useDebouncedValue<T>(value: T, delayMs: number) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(t)
    }, [value, delayMs]);

    return debounced;
}

// ---- Reusable sorting hook (single hook for name/dept) ----
function useSort<T>(
    items: T[],
    sortKey: SortKey,
    sortDir: SortDir,
    getValue: (item: T, key: SortKey) => string
) {
    const sortFn = useCallback(
        (a: T, b: T) => {
            const av = getValue(a, sortKey).toLowerCase();
            const bv = getValue(b, sortKey).toLowerCase();
            const res = av.localeCompare(bv, undefined, { sensitivity: 'base' });
            return sortDir === 'asc' ? res : -res;
        },
        [getValue, sortKey, sortDir]
    );

    const sorted = useMemo(() => {
        // mutasyondan kaçın
        return [...items].sort(sortFn);
    }, [items, sortFn]);

    return { sorted, sortFn };
}

// ---- Highlight helper ----
function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightText({
    text,
    query,
}: {
    text: string;
    query: string;
}) {
    const q = query.trim();
    if (!q) return <>{text}</>;

    const safe = escapeRegExp(q);
    const re = new RegExp(`(${safe})`, 'ig');
    const parts = text.split(re);

    return (
        <>
            {parts.map((part, i) => {
                const isMatch = part.toLowerCase() === q.toLowerCase();
                return isMatch ? (
                    <mark
                        key={i}
                        className="rounded px-1 bg-yellow-300/40 dark:bg-yellow-400/20 text-foreground"
                    >
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                );
            })}
        </>
    );
}

// ---- Empty State component ----
function EmptyState({
    title,
    description,
    onClear,
}: {
    title: string;
    description?: string;
    onClear?: () => void;
}) {
    return (
        <div className="border rounded-lg bg-card p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description ? (
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            ) : null}
            {onClear ? (
                <button
                    onClick={onClear}
                    className="mt-6 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                    Clear search
                </button>
            ) : null}
        </div>
    );
}

// ---- Small child component: SearchBar (so we can pass callbacks down) ----
function SearchBar({
    value,
    onChange,
    onClear,
}: {
    value: string;
    onChange: (v: string) => void;
    onClear: () => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search by name, email, or dept..."
                    className="w-full rounded-md border bg-background pl-9 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
                {value ? (
                    <button
                        onClick={onClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                ) : null}
            </div>
        </div>
    );
}

// ---- Small child component: SortControls (callbacks passed) ----
function SortControls({
    sortKey,
    sortDir,
    onToggleName,
    onToggleDept,
}: {
    sortKey: SortKey;
    sortDir: SortDir;
    onToggleName: () => void;
    onToggleDept: () => void;
}) {
    const pill = "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted transition-colors";

    const active = (key: SortKey) =>
        sortKey === key ? "bg-muted text-foreground" : "text-muted-foreground";

    const dirLabel = sortDir === 'asc' ? 'A→Z' : 'Z→A';

    return (
        <div className="flex flex-wrap gap-2 ">
            <button onClick={onToggleName} className={`${pill} ${active('name')}`}>
                <ArrowUpDown className="h-4 w-4" />
                <div className='text-black'>
                    Sort by Name {sortKey === 'name' ? `(${dirLabel})` : ''}
                </div>
            </button>

            <button onClick={onToggleDept} className={`${pill} ${active('dept')}`}>
                <ArrowUpDown className="h-4 w-4" />
                Sort by Dept {sortKey === 'dept' ? `(${dirLabel})` : ''}
            </button>
        </div>
    );
}

// ---- Child component: StaffList (so filter/sort fns are "passed down") ----
function StaffList({
    members,
    query,
}: {
    members: StaffMember[];
    query: string;
}) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {members.map((member) => (
                <div
                    key={member.id}
                    className="p-4 border rounded-lg bg-card text-card-foreground"
                >
                    <h3 className="font-semibold">
                        <HighlightText text={member.name} query={query} />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        <HighlightText text={member.email} query={query} />
                    </p>
                    <p className="text-sm text-muted-foreground">
                        <HighlightText text={member.dept} query={query} />
                    </p>
                </div>
            ))}
        </div>
    );
}

// ---- Page ----
export default function StaffPage() {
    // Search state (immediate) + debounced value (300ms)
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, 300);

    // Sort state
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    const allMembers = staffData.members as StaffMember[];

    //  Filter function (useCallback because we pass it conceptually + stable deps)
    const filterFn = useCallback(
        (member: StaffMember, q: string) => {
            const query = q.trim().toLowerCase();
            if (!query) return true;
            return (
                member.name.toLowerCase().includes(query) ||
                member.email.toLowerCase().includes(query) ||
                member.dept.toLowerCase().includes(query)
            );
        },
        []
    );

    // Debounced filtering result (derived, not state)
    const filteredMembers = useMemo(() => {
        return allMembers.filter((m) => filterFn(m, debouncedSearch));
    }, [allMembers, filterFn, debouncedSearch]);

    //  Reusable sorting hook (single hook handles name/dept)
    const getSortValue = useCallback((m: StaffMember, key: SortKey) => {
        return key === 'name' ? m.name : m.dept;
    }, []);

    const { sorted: visibleMembers } = useSort<StaffMember>(
        filteredMembers,
        sortKey,
        sortDir,
        getSortValue
    );

    // Callbacks passed down to child components
    const handleSearchChange = useCallback((v: string) => setSearch(v), []);
    const handleClearSearch = useCallback(() => setSearch(''), []);

    const toggleSort = useCallback((key: SortKey) => {
        setSortKey((prevKey) => {
            // aynı key'e tekrar basınca direction değiştir
            if (prevKey === key) {
                setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                return prevKey;
            }
            // key değişince default asc
            setSortDir('asc');
            return key;
        });
    }, []);

    const onToggleName = useCallback(() => toggleSort('name'), [toggleSort]);
    const onToggleDept = useCallback(() => toggleSort('dept'), [toggleSort]);

    const hasResults = visibleMembers.length > 0;

    return (
        <ProtectedRoute requiredPermissions={['staff']}>
            <div className="flex h-screen">
                <Sidebar menuItems={menuItems} />

                <div className="flex-1 flex flex-col">
                    <Header />

                    <main className="flex-1 p-6 overflow-auto bg-background">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col gap-2 mb-6">
                                <h1 className="text-4xl font-bold text-foreground">
                                    Staff Management
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Manage staff members
                                </p>
                            </div>

                            {/* Search + Sort Row */}
                            <div className="flex flex-col gap-4 mb-6">
                                <SearchBar
                                    value={search}
                                    onChange={handleSearchChange}
                                    onClear={handleClearSearch}
                                />

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <SortControls
                                        sortKey={sortKey}
                                        sortDir={sortDir}
                                        onToggleName={onToggleName}
                                        onToggleDept={onToggleDept}
                                    />

                                    <div className="text-sm text-muted-foreground">
                                        Showing <span className="font-semibold text-foreground">{visibleMembers.length}</span> of{' '}
                                        <span className="font-semibold text-foreground">{allMembers.length}</span>
                                        {debouncedSearch.trim()
                                            ? (
                                                <>
                                                    {' '}for "<span className="font-semibold text-foreground">{debouncedSearch.trim()}</span>"
                                                </>
                                            )
                                            : null}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            {!hasResults ? (
                                <EmptyState
                                    title="No staff found"
                                    description={
                                        debouncedSearch.trim()
                                            ? 'Try a different search term or clear the search.'
                                            : 'There are no staff members to show.'
                                    }
                                    onClear={debouncedSearch.trim() ? handleClearSearch : undefined}
                                />
                            ) : (
                                <StaffList members={visibleMembers} query={debouncedSearch} />
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
