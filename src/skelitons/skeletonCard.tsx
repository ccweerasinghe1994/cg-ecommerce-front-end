import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-24" /> {/* Category title */}
        <Skeleton className="h-4 w-40 mt-2" /> {/* Category description */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" /> {/* Input field */}
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-16" /> {/* Delete button */}
          <Skeleton className="h-9 w-16" /> {/* Update button */}
        </div>
      </CardFooter>
    </Card>
  );
}
