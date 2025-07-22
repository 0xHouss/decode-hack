import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
  error?: string;
  description?: string;
}

export function FormError({ error, description }: FormErrorProps) {
  if (!error) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlertIcon className="w-4 h-4" />
      <div>
        <p>{error}</p>
        {description && <p className="text-xs text-destructive/80">{description}</p>}
      </div>
    </div>
  );
}
