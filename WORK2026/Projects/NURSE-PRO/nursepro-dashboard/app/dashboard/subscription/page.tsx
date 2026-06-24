export default function SubscriptionPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-zinc-950 dark:text-white mb-4">Assinaturas</h1>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-8 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">Módulo de gestão de assinaturas em desenvolvimento.</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">Integração Stripe ativa — configure STRIPE_SECRET_KEY para habilitar.</p>
      </div>
    </div>
  );
}
