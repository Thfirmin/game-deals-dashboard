type TextAnchorProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function TextAnchor({ children, className, href = '#', ...props }: TextAnchorProps) {
  return (
    <a href={href} className={`text-[var(--link)] cursor-pointer hover:text-[var(--link-em)] hover:decoration-[var(--link-em)] hover:underline hover:decoration-solid hover:decoration-auto ${className}`} {...props}>
      {children}
    </a>
  )
}
