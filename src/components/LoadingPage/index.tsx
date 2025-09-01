import { LoaderCircle } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-1 justify-center items-center h-full w-full">
      <LoaderCircle className="animate-spin w-[50px] h-[50px] text-(--page-bg-em)" />
    </div>
  );
}