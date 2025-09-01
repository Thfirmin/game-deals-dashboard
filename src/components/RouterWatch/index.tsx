import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouterWatch({ onChange }: { onChange: (path: string) => void }) {
  const location = useLocation();

  useEffect(() => {
    onChange(location.pathname);
  }, [location.pathname, onChange]);

  return null;
}