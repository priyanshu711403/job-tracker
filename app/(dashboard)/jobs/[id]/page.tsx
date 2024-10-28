import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function JobDetailPage({ params }: { params: { id: string } }) {
   const queryClient = new QueryClient();

   try {
      await queryClient.prefetchQuery({
         queryKey: ["job", params.id],
         queryFn: () => getSingleJobAction(params.id),
      });
   } catch (error) {
      console.error("Failed to fetch job details:", error);
      // Handle the error (redirect to jobs page or show an error message)
      redirect("/jobs"); // Adjust as needed based on your application's logic
   }

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <EditJobForm jobId={params.id} />
      </HydrationBoundary>
   );
}
export default JobDetailPage;
