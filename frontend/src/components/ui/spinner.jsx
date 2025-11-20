import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <Loader2Icon
      strokeWidth={4}
      role="status"
      aria-label="Loading"
      className={cn("size-6 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
