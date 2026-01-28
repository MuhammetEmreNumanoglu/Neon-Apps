/**
 * Statistics Page
 *
 * Zodiac Analytics:
 * - Burç / departman dagilimlari
 * - Tamamen useMemo ile hesaplanan, yeniden render'larda sifir gecikme
 */
"use client";

import { useMemo } from "react";
import { AppLayout } from "../../components/AppLayout";
import { Card } from "../../components/Card";
import { dashboardStats } from "../../data/dashboard";
import { useUsers } from "@/hooks/useDataQueries";
import { Users, FolderOpen, CheckCircle2, DollarSign } from "lucide-react";

interface ZodiacDistributionItem {
  zodiac: string;
  count: number;
  percentage: number;
}

interface DeptZodiacDistributionItem extends ZodiacDistributionItem {
  department: string;
}

export default function StatisticsPage() {
  const { data: users } = useUsers();

  // Tüm kullanıcılar için global zodiac dağılımı
  const zodiacDistribution = useMemo(() => {
    if (!users || users.length === 0) return [] as ZodiacDistributionItem[];
    const total = users.length;
    const map = new Map<string, number>();

    for (const u of users) {
      if (!u.zodiacSign) continue;
      map.set(u.zodiacSign, (map.get(u.zodiacSign) ?? 0) + 1);
    }

    return Array.from(map.entries())
      .map(([zodiac, count]) => ({
        zodiac,
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }, [users]);

  // Departman bazlı zodiac dağılımı
  const deptZodiacDistribution = useMemo(() => {
    if (!users || users.length === 0) return [] as DeptZodiacDistributionItem[];

    const result: DeptZodiacDistributionItem[] = [];
    const deptMap = new Map<string, { total: number; zodiacCount: Map<string, number> }>();

    for (const u of users) {
      const dept = u.department ?? "Unknown";
      const zodiac = u.zodiacSign ?? "Unknown";

      if (!deptMap.has(dept)) {
        deptMap.set(dept, { total: 0, zodiacCount: new Map() });
      }
      const entry = deptMap.get(dept)!;
      entry.total += 1;
      entry.zodiacCount.set(zodiac, (entry.zodiacCount.get(zodiac) ?? 0) + 1);
    }

    for (const [department, { total, zodiacCount }] of deptMap.entries()) {
      for (const [zodiac, count] of zodiacCount.entries()) {
        result.push({
          department,
          zodiac,
          count,
          percentage: (count / total) * 100,
        });
      }
    }

    // Örnek: Mobile departmanında Scorpios yüzdesi gibi dağılımları üstte göster
    return result.sort((a, b) => b.percentage - a.percentage);
  }, [users]);

  // Örnek: Sadece "Mobile" departmanı ve popüler burçlar
  const mobileDeptZodiac = useMemo(
    () =>
      deptZodiacDistribution.filter((item) => item.department === "Mobile").slice(0, 5),
    [deptZodiacDistribution]
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Zodiac Analytics</h1>
          <p className="text-muted-foreground">
            JsonPlaceholder kullanıcıları üzerinde rastgele atanan burçlar ile departman bazlı dağılım.
          </p>
        </div>

        {/* Genel istatistikler */}
      

        {/* Global Zodiac dağılımı */}
        <Card>
          <h2 className="text-xl font-semibold mb-1">Global Zodiac Distribution</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Tüm kullanıcılar arasında burç dağılımı. Yüzdeler tamamen useMemo ile hesaplanır.
          </p>

          {(!users || users.length === 0) && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Loading users from jsonplaceholder...
            </div>
          )}

          {users && users.length > 0 && zodiacDistribution.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {zodiacDistribution.map((item) => (
                <div
                  key={item.zodiac}
                  className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.zodiac}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.count} users
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.percentage.toFixed(1)}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs text-muted-foreground">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Departman bazlı zodiac dağılımı */}
        <Card>
          <h2 className="text-xl font-semibold mb-1">Department &amp; Zodiac Breakdown</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Örnek: Mobile departmanındaki Scorpios yüzdesi gibi kombinasyonlar. Tüm
            hesaplamalar useMemo ile tutulur.
          </p>

          {deptZodiacDistribution.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Waiting for user data...
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mobile departmanına odaklanan mini tablo */}
              {mobileDeptZodiac.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Mobile Department Focus</h3>
                  <div className="overflow-x-auto rounded-lg border border-border/60">
                    <table className="min-w-full text-xs">
                      <thead className="bg-muted/60">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">Zodiac</th>
                          <th className="px-3 py-2 text-left font-medium">Count</th>
                          <th className="px-3 py-2 text-left font-medium">% in Dept</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mobileDeptZodiac.map((row) => (
                          <tr key={`${row.department}-${row.zodiac}`} className="border-t border-border/40">
                            <td className="px-3 py-2">{row.zodiac}</td>
                            <td className="px-3 py-2">{row.count}</td>
                            <td className="px-3 py-2">{row.percentage.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Genel tablo */}
              <div>
                <h3 className="text-sm font-semibold mb-2">All Departments</h3>
                <div className="max-h-80 overflow-y-auto rounded-lg border border-border/60">
                  <table className="min-w-full text-xs">
                    <thead className="bg-muted/60">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Department</th>
                        <th className="px-3 py-2 text-left font-medium">Zodiac</th>
                        <th className="px-3 py-2 text-left font-medium">Count</th>
                        <th className="px-3 py-2 text-left font-medium">% in Dept</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptZodiacDistribution.map((row) => (
                        <tr
                          key={`${row.department}-${row.zodiac}`}
                          className="border-t border-border/40"
                        >
                          <td className="px-3 py-2">{row.department}</td>
                          <td className="px-3 py-2">{row.zodiac}</td>
                          <td className="px-3 py-2">{row.count}</td>
                          <td className="px-3 py-2">{row.percentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
