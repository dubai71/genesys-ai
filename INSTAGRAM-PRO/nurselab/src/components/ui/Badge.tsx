type Props = { children: React.ReactNode; variant?: 'brand'|'green'|'blue'|'amber'|'muted'|'purple' }
const V = {
  brand: 'bg-[rgba(255,84,4,0.13)] text-[#FF5404]',
  green: 'bg-[rgba(34,197,94,0.12)] text-[#22c55e]',
  blue: 'bg-[rgba(59,130,246,0.12)] text-[#3b82f6]',
  amber: 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b]',
  muted: 'bg-[rgba(237,218,186,0.07)] text-[rgba(237,218,186,0.45)]',
  purple: 'bg-[rgba(168,85,247,0.12)] text-[#a855f7]',
}
export default function Badge({ children, variant='muted' }: Props) {
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${V[variant]}`}>{children}</span>
}
