'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HiOutlineUsers, HiOutlineChartBar, HiOutlineCreditCard, HiOutlineShieldCheck } from 'react-icons/hi2';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type AdminUser = {
  id: string;
  email: string;
  name?: string;
  plan?: string | null;
  status?: string | null;
  created_at?: string;
  last_sign_in?: string;
};

type StatCard = {
  title: string;
  value: string | number;
  helper?: string;
  icon: React.ReactNode;
};

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'premium'>('all');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const adminUrl = SUPABASE_URL as string;
        const serviceKey = SUPABASE_SERVICE_ROLE_KEY as string;

        if (!adminUrl || !serviceKey) {
          throw new Error('Admin do Supabase não configurado.');
        }

        const { createClient } = await import('@supabase/supabase-js');
        const admin = createClient(adminUrl, serviceKey);

        // Auth users (limitado a 200 por segurança)
        const { data: authData, error: authError } = await admin.auth.admin.listUsers({
          page: 1,
          perPage: 200,
        });

        if (authError) {
          throw authError;
        }

        const mapped: AdminUser[] = (authData?.users ?? []).map((u) => {
          const metadata = (u.user_metadata ?? {}) as Record<string, unknown>;
          const plan = typeof metadata.plan === 'string' ? metadata.plan : null;
          return {
            id: u.id,
            email: u.email ?? '',
            name: typeof metadata.full_name === 'string' ? metadata.full_name : undefined,
            plan,
            status: u.confirmed_at ? 'confirmed' : 'unconfirmed',
            created_at: u.created_at ?? undefined,
            last_sign_in: u.last_sign_in_at ?? undefined,
          };
        });

        // Enriquecer com profiles e assinatura quando existir
        const { data: profiles } = await admin
          .from('user_profiles')
          .select('user_id, notification_hours');

        const { data: subRows } = await admin
          .from('subscriptions')
          .select('user_id, status, current_period_end');

        const profileByUserId = new Map((profiles ?? []).map((row: { user_id: string }) => [row.user_id, row]));
        const subByUserId = new Map((subRows ?? []).map((row: { user_id: string; status: string }) => [row.user_id, row]));

        const usersWithDetails: AdminUser[] = mapped.map((user) => {
          const profile = profileByUserId.get(user.id);
          const subscription = subByUserId.get(user.id);
          return {
            ...user,
            plan: subscription ? subscription.status : user.plan,
          };
        });

        const confirmedCount = usersWithDetails.filter((u) => u.status === 'confirmed').length;
        const activeSubs = usersWithDetails.filter((u) => u.plan === 'active').length;
        const premiumUsers = usersWithDetails.filter((u) => u.plan === 'premium_monthly' || u.plan === 'premium_yearly').length;

        setUsers(usersWithDetails);
        setStats([
          {
            title: 'Usuários cadastrados',
            value: usersWithDetails.length,
            helper: `${confirmedCount} confirmados`,
            icon: <HiOutlineUsers className="h-5 w-5 text-amber-600" />,
          },
          {
            title: 'Assinaturas ativas',
            value: activeSubs,
            helper: premiumUsers > 0 ? `${premiumUsers} premium` : 'Sem assinaturas premium',
            icon: <HiOutlineCreditCard className="h-5 w-5 text-amber-600" />,
          },
          {
            title: 'Pendências',
            value: usersWithDetails.filter((u) => u.status !== 'confirmed').length,
            helper: 'Usuários sem confirmação',
            icon: <HiOutlineShieldCheck className="h-5 w-5 text-amber-600" />,
          },
        ]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Falha ao carregar admin.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const filteredUsers = useMemo(() => {
    if (planFilter === 'all') {
      return users;
    }

    return users.filter((user) => {
      if (planFilter === 'premium') {
        return user.plan === 'premium_monthly' || user.plan === 'premium_yearly' || user.plan === 'active';
      }
      return !user.plan || user.plan === 'free' || user.plan === 'canceled' || user.plan === 'past_due';
    });
  }, [users, planFilter]);

  const StatGrid = () => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-zinc-200 p-5 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {stat.title}
              </p>
              <p className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">{String(stat.value)}</p>
              {stat.helper ? (
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{stat.helper}</p>
              ) : null}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-950 dark:text-white">Painel administrativo</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Visão geral de usuários, health check e métricas operacionais.
            </p>
          </div>
          <Button
            variant="secondary"
            className="rounded-xl bg-neutral-800 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
            onClick={() => window.location.reload()}
          >
            Atualizar dados
          </Button>
        </header>

        {loading ? (
          <Card className="border-zinc-200 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            Carregando dados do admin...
          </Card>
        ) : error ? (
          <Card className="border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            <StatGrid />

            <Card className="border-zinc-200 p-0 dark:border-zinc-800">
              <div className="flex flex-col gap-4 border-b border-zinc-200 p-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Usuários</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Mostrando {filteredUsers.length} de {users.length} usuários.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(['all', 'free', 'premium'] as const).map((option) => (
                    <Button
                      key={option}
                      variant="secondary"
                      onClick={() => setPlanFilter(option)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                        planFilter === option
                          ? 'bg-amber-600 text-white hover:bg-amber-500'
                          : 'bg-neutral-800 text-white hover:bg-neutral-700'
                      }`}
                    >
                      {option === 'all' ? 'Todos' : option === 'premium' ? 'Premium' : 'Free'}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      <th className="px-5 py-3 font-semibold">Usuário</th>
                      <th className="px-5 py-3 font-semibold">Plano</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold">Cadastro</th>
                      <th className="px-5 py-3 font-semibold">Último login</th>
                      <th className="px-5 py-3 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                          Nenhum usuário encontrado para este filtro.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                          <td className="px-5 py-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-950 dark:text-white">{user.name || 'Sem nome'}</span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-zinc-700 dark:text-zinc-200">{user.plan ?? '—'}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                user.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                              }`}
                            >
                              {user.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-zinc-700 dark:text-zinc-200">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '—'}
                          </td>
                          <td className="px-5 py-3 text-zinc-700 dark:text-zinc-200">
                            {user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString('pt-BR') : '—'}
                          </td>
                          <td className="px-5 py-3 text-right text-zinc-700 dark:text-zinc-200">
                            <Button
                              variant="secondary"
                              className="rounded-xl bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700"
                              onClick={async () => {
                                const adminUrl = SUPABASE_URL as string;
                                const serviceKey = SUPABASE_SERVICE_ROLE_KEY as string;
                                if (!adminUrl || !serviceKey) return;

                                const { createClient } = await import('@supabase/supabase-js');
                                const admin = createClient(adminUrl, serviceKey);

                                const { error } = await admin.auth.admin.updateUserById(user.id, {
                                  email_confirm: true,
                                });

                                if (error) {
                                  alert(error.message);
                                  return;
                                }

                                window.location.reload();
                              }}
                            >
                              Confirmar email
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
