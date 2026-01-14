import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface CardProductProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export default function CardProduct({
  children,
  icon: Icon,
  title,
}: CardProductProps) {
  return (
    <Card className="rounded-md flex flex-col gap-4 px-4 py-6 max-w-125 w-full md:max-w-150">
      <CardHeader className="flex items-center gap-2 px-0">
        <Icon className="text-btn-blue size-4" />
        <CardTitle className="text-sm capitalize font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
}
