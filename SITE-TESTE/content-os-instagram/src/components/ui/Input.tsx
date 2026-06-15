type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
export default function Input({ label, className='', ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)]">{label}</label>}
      <input className={`bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-[7px] text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] transition-colors placeholder:text-[rgba(237,218,186,0.25)] ${className}`} {...props} />
    </div>
  )
}
