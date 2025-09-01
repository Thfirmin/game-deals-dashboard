type TextMarkProps = {
  children: React.ReactNode;
  className?: string;
}

export default function TextMark({ children, className, ...props }: TextMarkProps) {
  return (<mark className={`bg-[var(--primary-1)] text-[var(--primary-2-em)] px-[4px] border-[1px] border-[var(--primary-2-em)] rounded-[4px] ${className}`} {...props} >{children}</mark>)
}