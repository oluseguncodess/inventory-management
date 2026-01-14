import { AlertCircle } from "lucide-react";

interface ErrorsListProps {
  errors: (string | undefined)[];
}

export default function ErrorsList({ errors }: ErrorsListProps) {
  return (
    <div className="p-4 max-sm:w-full w-150 bg-red-300 rounded-md">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-red-800 font-semibold mb-2">
            Error: Please fill in the following fields
          </h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700 text-sm list-disc">{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
