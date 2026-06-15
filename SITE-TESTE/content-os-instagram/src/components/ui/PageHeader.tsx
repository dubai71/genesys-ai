import Button from './Button'
type Action = { label: string; onClick: () => void; variant?: 'primary'|'ghost' }
type Props = { title: string; subtitle?: string; actions?: Action[] }
export default function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="flex items-start justify-between px-5 pt-4 pb-0 flex-shrink-0">
      <div>
        <h1 className="font-display text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-[rgba(237,218,186,0.45)] mt-0.5">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex gap-2">
          {actions.map(a => <Button key={a.label} variant={a.variant||'primary'} onClick={a.onClick}>{a.label}</Button>)}
        </div>
      )}
    </div>
  )
}
