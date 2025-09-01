type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className='min-h-[25px] min-w-[125px] rounded-[7px] text-center px-4 py-2 bg-[var(--primary-1)] transition-all duration-200 ease-in-out hover:bg-[var(--primary-2)] hover:cursor-pointer' {...props}>
      {children}
    </button>
  );
}