import React, { useState, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

interface DashboardStatsProps {
  refreshInterval?: number;
}

export default function DashboardStats({
  refreshInterval = 30000,
}: DashboardStatsProps): React.ReactElement {
  const { user } = useAuth();
  const [stats, setStats] = useState<{ total: number; active: number } | null>(null);

  useEffect(() => {
    // ❌ VIOLAÇÃO: console.log em produção
    console.log('DashboardStats mounted, user:', user);
    console.log('Refresh interval:', refreshInterval);

    const fetchStats = async (): Promise<void> => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();

        // ❌ VIOLAÇÃO: console.log para debug
        console.log('Stats fetched successfully:', data);
        console.log('Response status:', response.status);

        setStats(data);
      } catch (error) {
        // ❌ VIOLAÇÃO: console.error em vez de logger
        console.error('Failed to fetch stats:', error);
        // ❌ VIOLAÇÃO: console.warn desnecessário
        console.warn('Retrying in', refreshInterval, 'ms');
      }
    };

    fetchStats();

    const interval = setInterval(() => {
      // ❌ VIOLAÇÃO: console.log dentro de interval
      console.log('Refreshing stats...');
      fetchStats();
    }, refreshInterval);

    return () => {
      // ❌ VIOLAÇÃO: console.log no cleanup
      console.log('DashboardStats unmounted, clearing interval');
      clearInterval(interval);
    };
  }, [user, refreshInterval]);

  if (!stats) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="dashboard-stats">
      <div className="stat">
        <span>Total</span>
        <strong>{stats.total}</strong>
      </div>
      <div className="stat">
        <span>Ativos</span>
        <strong>{stats.active}</strong>
      </div>
    </div>
  );
}
