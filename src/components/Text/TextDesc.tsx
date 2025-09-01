type TextDescProps = {
  children: React.ReactNode;
  className?: string;
}

export default function TextDesc({ children, className, ...props }: TextDescProps) {
  return (<span className={`text-[var(--description)] text-[19.2px]/[32.64px] font-[100] ${className}`} {...props} >{children}</span>)
}
