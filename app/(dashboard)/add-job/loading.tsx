import { Skeleton } from "@/components/ui/skeleton";

function loading() {
   return (
      <div className="grid gap-y-10 gap-x-4 md:grid-cols-2 lg:grid-cols-3 items-start border rounded-lg mt-10 pt-20 pb-10 px-8">
         <Skeleton className="h-10" />
         <Skeleton className="h-10" />
         <Skeleton className="h-10" />
         <Skeleton className="h-10" />
         <Skeleton className="h-10" />
         <Skeleton className="h-10" />
      </div>
   );
}
export default loading;
