type Props = { label: string; value: string|number; sub?: string; accent?: string }
export default function StatCard({ label, value, sub, accent='#FF5404' }: Props) {
  return (
    <div className="relative bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-3 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{background:accent}} />
      <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-1">{label}</div>
      <div className="font-display text-2xl font-bold text-white leading-none">{value}</div>
      {sub && <div className="text-[9px] text-[rgba(237,218,186,0.45)] mt-1">{sub}</div>}
    </div>
  )
}
