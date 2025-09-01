type TextSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  level?: 2 | 3 | 4 | 5 | 6;
}

export function TextSubtitle({ children, className, level = 2, ...props }: TextSubtitleProps) {
  const finalClassName = `text-[var(--subtitle)] font-[600] ${className}`;
  switch (level) {
    case 3:
      return (<h3 className={`text-[24px]/[32px] ${finalClassName}`} {...props} >{children}</h3>)
    case 4:
      return (<h4 className={`text-[20px]/[28px] ${finalClassName}`} {...props} >{children}</h4>)
    case 5:
      return (<h5 className={`text-[18px]/[24px] ${finalClassName}`} {...props} >{children}</h5>)
    case 6:
      return (<h6 className={`text-[16px]/[22px] ${finalClassName}`} {...props} >{children}</h6>)
    default:
      return (<h2 className={`text-[32px]/[40px] ${finalClassName}`} {...props} >{children}</h2>)
  }
}