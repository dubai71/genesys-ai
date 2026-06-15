type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'ghost'|'danger'; size?: 'sm'|'md' }
export default function Button({ children, variant='primary', size='md', className='', ...props }: Props) {
  const base = 'font-body font-semibold rounded-[6px] border-none cursor-pointer transition-all duration-150 hover:opacity-85 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  const V = { primary:'bg-[#FF5404] text-white', ghost:'bg-[rgba(237,218,186,0.07)] text-[#EDDABA] border border-white/[0.08]', danger:'bg-[rgba(239,68,68,0.13)] text-[#ef4444]' }
  const S = { sm:'text-[10px] px-2.5 py-1.5', md:'text-[11px] px-3.5 py-[7px]' }
  return <button className={`${base} ${V[variant]} ${S[size]} ${className}`} {...props}>{children}</button>
}
