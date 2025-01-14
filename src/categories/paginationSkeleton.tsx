import { Skeleton } from "@/components/ui/skeleton";

export default function PaginationSkeleton() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Skeleton className="h-9 w-24" />

        {/* Page numbers */}
        <Skeleton className="h-9 w-10" />
        <Skeleton className="h-9 w-10" />

        {/* Ellipsis */}
        <Skeleton className="h-9 w-10" />

        {/* Last page number */}
        <Skeleton className="h-9 w-10" />

        {/* Next button */}
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}
