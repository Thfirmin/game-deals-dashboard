type TextTitleProps = {
  children: React.ReactNode;
  className?: string;
}

export function TextTitle({ children, className, ...props }: TextTitleProps) {
  return (<h1 className={`text-[var(--title)] text-[60px]/[48px] tracking-[-1px] font-[700] ${className}`} {...props} >{children}</h1>)
}