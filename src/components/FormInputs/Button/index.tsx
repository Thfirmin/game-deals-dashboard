import './style.css'

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="w-[50%] button">
      {children}
    </button>
  );
}
