/**
 * Data Demo Page
 *
 * Axios + React Query ile jsonplaceholder'dan veri cekimi,
 * client-side pagination, skeleton loading, offline alert,
 * manual refetch ve batch delete ornekleri.
 */
"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { AppLayout } from "../../components/AppLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/ui/button";
import { useUsers, usePosts } from "@/hooks/useDataQueries";
import { User, Post } from "@/lib/api";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

// --- Sabitler ---
const PAGE_SIZE = 100;

// --- Skeleton Loader (User Card yapısına uygun) ---
function UserSkeletonCard() {
  return (
    <div className="bg-card text-card-foreground rounded-xl border border-border/50 p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-6 bg-muted rounded w-24" />
      </div>
    </div>
  );
}

// --- Offline Alert ---
function OfflineAlert() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // İlk durum
    setIsOnline(typeof window !== "undefined" ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-800 dark:text-yellow-300">
      <AlertTriangle className="size-4 shrink-0" />
      <div>
        <p className="font-medium">You are offline</p>
        <p className="text-xs opacity-80">
          Showing cached data. New requests will be queued until you are back online.
        </p>
      </div>
    </div>
  );
}

// --- DataDemoPage ---
export default function DataDemoPage() {
  const {
    data: users,
    isLoading: usersLoading,
    isFetching: usersFetching,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers();

  const {
    data: posts,
    isLoading: postsLoading,
    isFetching: postsFetching,
    error: postsError,
    refetch: refetchPosts,
  } = usePosts();

  // Lokal UI state'leri
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // AbortController ile search debounce / cancel
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    // Eski istekleri iptal et
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Simüle edilmiş async filter (gerçekte API çağrısı yapılabilir)
    setSearchTerm(value);
  }, []);

  const handleToggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Tab değişince sayfa numaralarını resetle
  const handleTabChange = (tab: "users" | "posts") => {
    setActiveTab(tab);
    if (tab === "users") {
      setCurrentUserPage(1);
    } else {
      setCurrentPostPage(1);
    }
  };

  // Users verisini local state'e yansıt (batch delete için)
  const [localUsers, setLocalUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (users) {
      setLocalUsers((prev) => {
        // İlk yükleme veya refetch sonrası tamamen güncelle
        if (!prev || prev.length === 0) return users;
        // Aksi durumda, dışarıdan gelen listeyi doğrudan kullanmak en temiz çözüm
        return users;
      });
    }
  }, [users]);

  const handleConfirmedBatchDelete = useCallback(() => {
    if (!localUsers || selectedIds.size === 0) return;
    setLocalUsers(localUsers.filter((u) => !selectedIds.has(u.id)));
    setSelectedIds(new Set());
  }, [localUsers, selectedIds]);

  // Filtrelenmiş ve pagine edilmiş kullanıcı listesi
  const filteredUsers = useMemo(() => {
    const source = localUsers ?? users ?? [];
    const term = searchTerm.toLowerCase().trim();
    const bySearch =
      term.length === 0
        ? source
        : source.filter(
          (u) =>
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term) ||
            (u.company?.name ?? "").toLowerCase().includes(term)
        );
    const start = (currentUserPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return bySearch.slice(start, end);
  }, [users, localUsers, searchTerm, currentUserPage]);

  const totalUserItems = useMemo(
    () => (localUsers ?? users ?? []).length,
    [users, localUsers]
  );
  const totalUserPages = Math.max(1, Math.ceil(totalUserItems / PAGE_SIZE));

  const handleUserPageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalUserPages) return;
      setCurrentUserPage(page);
    },
    [totalUserPages]
  );

  // Posts için pagination
  const paginatedPosts = useMemo(() => {
    const source = posts ?? [];
    const start = (currentPostPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return source.slice(start, end);
  }, [posts, currentPostPage]);

  const totalPostItems = useMemo(() => (posts ?? []).length, [posts]);
  const totalPostPages = Math.max(1, Math.ceil(totalPostItems / PAGE_SIZE));

  const handlePostPageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPostPages) return;
      setCurrentPostPage(page);
    },
    [totalPostPages]
  );

  const isUsersTab = activeTab === "users";
  const isLoading = isUsersTab ? usersLoading : postsLoading;
  const isRefetching = usersFetching || postsFetching;

  const manualRefetch = async () => {
    await Promise.all([refetchUsers(), refetchPosts()]);
  };

  return (

    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Data Management</h1>
            <p className="text-muted-foreground text-sm">
              JsonPlaceholder + React Query ile gelişmiş veri yönetimi, pagination ve offline deneyimi.
            </p>
          </div>
          <ScrollToTopButton />
          <Button
            variant="outline"
            size="sm"
            onClick={manualRefetch}
            disabled={isRefetching}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className={`size-4 ${isRefetching ? "animate-spin" : ""}`} />
            {isRefetching ? "Refreshing..." : "Manual Refetch"}
          </Button>
        </div>

        <OfflineAlert />


        {/* Hata durumları */}
        {(usersError || postsError) && (
          <Card className="border-destructive/50 bg-destructive/5">
            <h3 className="font-semibold mb-2">Error while fetching data</h3>
            <p className="text-sm text-muted-foreground">
              {String(usersError ?? postsError)}
            </p>
          </Card>
        )}

        {/* Tablar: Users / Posts */}
        <div className="flex gap-2 border-b border-border pb-2">
          <Button
            variant={isUsersTab ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("users")}
          >
            Users
          </Button>
          <Button
            variant={!isUsersTab ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("posts")}
          >
            Posts
          </Button>
        </div>

        {isUsersTab ? (
          <>
            {/* Arama + Batch Delete (sadece Users için) */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search users by name, email or company..."
                className="w-full md:max-w-md rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => handleSearchChange(e.target.value)}
              />

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  Selected: {selectedIds.size}
                </span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={selectedIds.size === 0}
                  onClick={handleConfirmedBatchDelete}
                >
                  Batch Delete
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <div className="text-xs text-muted-foreground">
                Page {currentUserPage} of {totalUserPages} &middot; {totalUserItems} users
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUserPageChange(currentUserPage - 1)}
                  disabled={currentUserPage === 1}
                >
                  Prev
                </Button>

                {Array.from({ length: totalUserPages }).map((_, idx) => {
                  const page = idx + 1;
                  const isActive = page === currentUserPage;
                  return (
                    <Button
                      key={page}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUserPageChange(page)}
                      className="w-8 px-0"
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUserPageChange(currentUserPage + 1)}
                  disabled={currentUserPage === totalUserPages}
                >
                  Next
                </Button>
              </div>
            </div>
            {/* Kullanıcı listesi */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? Array.from({ length: 12 }).map((_, idx) => (
                  <UserSkeletonCard key={idx} />
                ))
                : filteredUsers.map((user) => (
                  <MemoizedUserCard
                    key={user.id}
                    user={user}
                    selected={selectedIds.has(user.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
            </div>

            {/* Users Pagination */}

          </>
        ) : (
          <>
            {/* Posts listesi */}
            <Card>
              <h3 className="text-lg font-semibold mb-1">Posts</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Showing posts from <code>/posts</code> endpoint (paginated, 100 per page).
              </p>

              {postsLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading posts...
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedPosts.map((post: Post) => (
                    <div
                      key={post.id}
                      className="rounded-lg border border-border/60 bg-background px-3 py-2"
                    >
                      <h4 className="text-sm font-semibold truncate">{post.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {post.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Posts Pagination */}
            <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <div className="text-xs text-muted-foreground">
                Page {currentPostPage} of {totalPostPages} &middot; {totalPostItems} posts
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePostPageChange(currentPostPage - 1)}
                  disabled={currentPostPage === 1}
                >
                  Prev
                </Button>

                {Array.from({ length: totalPostPages }).map((_, idx) => {
                  const page = idx + 1;
                  const isActive = page === currentPostPage;
                  return (
                    <Button
                      key={page}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePostPageChange(page)}
                      className="w-8 px-0"
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePostPageChange(currentPostPage + 1)}
                  disabled={currentPostPage === totalPostPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

// --- User Card + React.memo (StaffCard benzeri) ---
interface UserCardProps {
  user: User;
  selected: boolean;
  onToggleSelect: (id: number) => void;
}

const UserCard = ({ user, selected, onToggleSelect }: UserCardProps) => {
  return (
    <div
      className={`bg-card text-card-foreground rounded-xl border border-border/50 p-6 shadow-sm transition-all duration-200 ${selected ? "ring-2 ring-primary" : "hover:shadow-md"
        }`}
    >
      <div className="flex items-center gap-4">
        {/* Lazy loaded avatar */}
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            user.name
          )}`}
          alt={user.name}
          loading="lazy"
          className="size-12 rounded-full border border-border/40 bg-muted object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold">{user.name}</h3>
            <button
              type="button"
              onClick={() => onToggleSelect(user.id)}
              className={`h-6 w-6 rounded-full border text-xs flex items-center justify-center ${selected
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-background"
                }`}
            >
              {selected ? "✓" : "+"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user.company?.name}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        {user.zodiacSign && (
          <span className="rounded-full bg-purple-500/10 px-2 py-1 text-purple-500">
            {user.zodiacSign}
          </span>
        )}
        {user.department && (
          <span className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-500">
            {user.department}
          </span>
        )}
      </div>

    </div>
  );
};

// React.memo ile gereksiz render'ları engelle
const MemoizedUserCard = React.memo(UserCard);
