type TextBodyProps = {
  children: React.ReactNode;
  className?: string;
}

export default function TextBody({ children, className, ...props }: TextBodyProps) {
  return (<span className={`text-[var(--text-70)] text-[16px]/[27.2px] font-[400] ${className}`} {...props} >{children}</span>)
}